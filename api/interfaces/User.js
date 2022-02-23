/**
 * @module user
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import bcrypt from "bcrypt";
import * as jose from "jose";
import keys from "../joseLoader.js";
import sequelize from "../sequelizeLoader.js";
import { APIResp, APIError } from "../../global/global.js";
import { API, Passwords } from "../../config/config.js";

const { models } = sequelize;

/**
 * @typedef {Object} UserAddress
 *
 * @property {string} street
 * @property {string} city
 * @property {string} postalCode
 */

/**
 * @typedef {Object} User
 *
 * @property {number} user_id
 * @property {string} uuid
 * @property {string} first_name
 * @property {string} last_name
 * @property {Date|string} birth_date
 * @property {string} email
 * @property {string} password
 * @property {UserAddress} address
 * @property {string} gender
 * @property {string} region
 * @property {string} status
 * @property {string} campus
 */

/**
 * @typedef {Object} NewUser
 *
 * @property {string} first_name
 * @property {string} last_name
 * @property {Date|string} birth_date
 * @property {string} email
 * @property {string} password1
 * @property {string} password2
 * @property {UserAddress} address
 * @property {string} gender
 * @property {string} region
 * @property {string} status
 * @property {string} campus
 */

/**
 * @typedef {Object} LoggingUser
 *
 * @property {string} email
 * @property {string} password
 */

/*****************************************************
 * Functions
 *****************************************************/

/**
 * Checks if the password is identical to the password confirmation
 * @function
 *
 * @param {string} password1 - Password
 * @param {string} password2 - Password confirmation
 * @return {boolean}
 */
const arePasswordsSame = (password1, password2) => password1 === password2;

/**
 * Checks if the password is safe
 * @function
 *
 * @param {string} password
 * @return {boolean}
 */
const isPasswordSafe = (password) => {
	const regex = (
		(Passwords.mustContain.lowerCase ? "(?=.*[a-z])" : "") +
		(Passwords.mustContain.upperCase ? "(?=.*[A-Z])" : "") +
		(Passwords.mustContain.number ? "(?=.*[0-9])" : "") +
		(Passwords.mustContain.special ? "(?=[^a-zA-Z0-9])" : "") +
		(`(.{${Passwords.minLength},}$)`)
	);

	const isStrong = new RegExp(regex);
	return isStrong.test(password);
};

/**
 * Hash a password
 * @function
 * @async
 *
 * @param {string} password
 * @throws {Error}
 * @return {Promise<string>}
 */
const hashPassword = async (password) => {
	return await bcrypt.hash(password, Passwords.saltRound);
};

/**
 * Generate a JWT token
 * @function
 * @async
 *
 * @param {User} user
 * @return {Promise<string>}
 */
export const generateJWT = async (user) => {
	const JWTuser = {
		uuid: user.uuid,
		given_name: user.first_name,
		family_name: user.last_name,
		picture: null,
		email: user.email,
		gender: user.gender,
		birthdate: user.birth_date,
		groups: null,
	};

	return new jose.SignJWT(JWTuser)
		.setProtectedHeader({ alg: API.jwt.algorithm })
		.setIssuer("cpem") // TODO: Change to the site name
		.setIssuedAt()
		.setExpirationTime("15m")
		.setSubject(`${user.user_id}`)
		.setExpirationTime("2h")
		.sign(keys.privateKey);
};

/**
 * Compares a plaintext password to a hash
 * @function
 * @async
 *
 * @param {string} password - Plaintext password
 * @param {string} hash - Hashed password
 * @throws {Error}
 * @return {Promise<boolean>}
 */
const passwordMatchHash = async (password, hash) => {
	return await bcrypt.compare(password, hash);
};

/*****************************************************
 * CRUD Methods
 *****************************************************/

/* ---- CREATE ---------------------------------- */
/**
 * Add a new user
 * @function
 * @async
 *
 * @param {NewUser} newUser
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const add = async (newUser) => {
	const processedUser = newUser;

	// Check if the new user match the model
	const model = models.user.build(processedUser);

	try {
		await model.validate({ skip: ["user_id", "uuid", "password", "street_address"] });
	} catch (err) {
		// TODO: Adapt the system
		throw new APIError(400, "error", Object.values(err));
	}

	// Check and hash the password
	if (!arePasswordsSame(processedUser.password1, processedUser.password2)) {
		throw new APIError(400, "Les mots de passes sont différents.", ["password1", "password2"]);
	}

	if (!isPasswordSafe(processedUser.password1)) {
		// TODO: Translate
		const mustContain = Object.entries(Passwords.mustContain).map(([rule, value]) => value ? `one ${rule}` : null).join(", ");
		const plural = Passwords.minLength > 1 ? "s" : "";

		throw new APIError(
			400,
			`Le mot de passe doit avoir ${Passwords.minLength} caractère${plural} minimum et comporter: ${mustContain}`,
			["password1", "password2"],
		);
	}

	processedUser.password = await hashPassword(processedUser.password1);
	processedUser.password1 = undefined;
	processedUser.password2 = undefined;

	// Add to the database
	const user = await models.user.create(processedUser);

	return new APIResp(200).setData({ userID: user.user_id });
};

/* ---- READ ------------------------------------ */
/**
 * Login a user
 * @function
 * @async
 *
 * @param {LoggingUser} user
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const login = async (user) => {
	// Get user data
	let storedUser;

	try {
		storedUser = await models.user.findOne({ where: {email: user.email} });
		if (!storedUser) throw new Error();
	} catch (err) {
		throw new APIError(400, "L'adresse email et/ou le mot de passe sont erronés.", ["email", "password"]);
	}

	// Check the password
	if (!(await passwordMatchHash(user.password, storedUser.password))) {
		throw new APIError(400, "L'adresse email et/ou le mot de passe sont erronés.", ["email", "password"]);
	}

	// Generate a JWT token
	const token = await generateJWT(storedUser);

	return new APIResp(200).setData({ token });
};

/**
 * Get all users
 * @function
 * @async
 *
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const getAll = async () => {
	const users = await models.user.findAll({
		attributes: { exclude: ["password"] },
	});

	return new APIResp(200).setData({ users });
};

/**
 * Get one user by its id
 * @function
 * @async
 *
 * @param {number} userID
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const getByID = async (userID) => {
	const user = await models.user.findOne({
		attributes: { exclude: ["password"] },
		include: [{
			model: models.position,
			required: true,
			include: [{
				model: models.permission,
				through: {attributes: []},
			}],
		}],
		where: { user_id: userID },
	});

	if (!user) {
		throw new APIError(404, `Cet utilisateur (${userID}) n'existe pas.`);
	}

	const userJSON = user.toJSON();
	userJSON.position.permissions.forEach((p, i, arr) => (arr[i] = p.name));

	return new APIResp(200).setData({ user: userJSON });
};

/**
 * Get one user by its uuid
 * @function
 * @async
 *
 * @param {string} uuid
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const getByUUID = async (uuid) => {
	const user = await models.user.findOne({
		attributes: { exclude: ["password"] },
		include: [{
			model: models.position,
			required: true,
			include: [{
				model: models.permission,
				through: {attributes: []},
			}],
		}],
		where: { uuid },
	});

	if (!user) {
		throw new APIError(404, `Cet utilisateur (${uuid}) n'existe pas.`);
	}

	const userJSON = user.toJSON();
	userJSON.position.permissions.forEach((p, i, arr) => (arr[i] = p.name));

	return new APIResp(200).setData({ user: userJSON });
};

/**
 * Get all student from a campus
 * @function
 * @async
 *
 * @param {string} campusName
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const getAllStudentsFromCampus = async (campusName) => {
	const students = await models.user.findAll({
		where: {
			campus: campusName},
		include: [{
			model: models.position,
			required: true,
			where: {name: "Étudiant"},
		}],
	});
	return new APIResp(200).setData({ students });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const User = {
	add,																												// CREATE
	login, getAll, getByID, getByUUID, getAllStudentsFromCampus, // READ
};
export default User;
