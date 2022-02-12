/**
 * @module User
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import bcrypt from "bcrypt";
import sequelize from "../sequelizeLoader.js";
import { APIResp, APIError } from "../../global/global.js";
import { Passwords } from "../../config/config.js";

const { models } = sequelize;

/**
 * @typedef {Object} NewUser
 *
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} birthDate
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
 * @typedef {Object} UserAddress
 *
 * @property {string} street
 * @property {string} city
 * @property {string} postalCode
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
 * Compares a plaintext password to a hash
 * @function
 * @async
 *
 * @param {string} password - Plaintext password
 * @param {string} hash - Hashed password
 * @throws {Error}
 * @return {Promise<boolean>}
 * /
const passwordMatchHash = async (password, hash) => {
	return await bcrypt.compare(password, hash);
};*/

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
	console.log(processedUser);
	const model = models.User.build(processedUser);

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
	const user = await models.User.create(processedUser);

	return new APIResp(200).setData({ userID: user.user_id });
};

/* ---- READ ------------------------------------ */
/**
 * Get all users
 * @function
 * @async
 *
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const getAll = async () => {
	const users = await models.User.findAll({
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
	const user = await models.User.findOne({
		attributes: { exclude: ["password"] },
		where: { user_id: userID },
	});

	if (!user) {
		throw new APIError(404, `Cet utilisateur (${userID}) n'existe pas.`);
	}

	return new APIResp(200).setData({ user });
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
	const user = await models.User.findOne({
		attributes: { exclude: ["password"] },
		where: { uuid },
	});

	if (!user) {
		throw new APIError(404, `Cet utilisateur (${uuid}) n'existe pas.`);
	}

	return new APIResp(200).setData({ user });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const User = {
	add,												// CREATE
	getAll, getByID, getByUUID, // READ
};
export default User;
