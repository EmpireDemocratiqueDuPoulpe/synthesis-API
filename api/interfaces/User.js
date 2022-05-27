/**
 * @module User
 * @category API
 * @subcategory Interfaces
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import bcrypt from "bcrypt";
import * as jose from "jose";
import { Op } from "sequelize";
import keys from "../joseLoader.js";
import sequelize from "../sequelizeLoader.js";
import { APIResp, APIError } from "../../global/global.js";
import { API, Passwords } from "../../config/config.js";

/**
 * Sequelize models
 * @const
 * @name models
 * @type {Object<Sequelize.models>}
 */
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
 * @property {string} campus
 * @property {Study} study
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
 * @property {string} campus
 */

/**
 * @typedef {Object} LoggingUser
 *
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} StudentFilters
 *
 * @property {string} [campus]
 * @property {"true"|"false"|string} [onlyHired]
 * @property {array<"campus"|"module"|"ects"|"job">} [expand]
 */

/**
 * @typedef {Object} SeqStudentFilters
 *
 * @property {Object} where - Where clause
 * @property {Array<{model: Object, where: Object, required: boolean}>} include - Include clause
 */

/**
 * @typedef {Object} SCTsFilters
 *
 * @property {string} [campus]
 * @property {array<"campus"|"module">} [expand]
 */

/**
 * @typedef {Object} SeqSCTsFilters
 *
 * @property {Object} where - Where clause
 * @property {Array<{model: Object, where: Object, required: boolean}>} include - Include clause
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
		study: user.study,
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

/**
 * Flatten the permission array to keep only names
 * @function
 *
 * @param {Model} user
 * @return {Object}
 */
const buildPermissions = (user) => {
	const userJSON = user.toJSON();
	userJSON.position.permissions.forEach((p, i, arr) => (arr[i] = p.name));

	return userJSON;
};

/**
 * Transform URI query params to sequelize `where` and `include` clauses.
 * @function
 *
 * @param {StudentFilters} filters
 * @param {Array<string>} disabledExpands - List of expand to not include in the clauses
 * @return {SeqStudentFilters}
 */
const processStudentFilters = (filters, disabledExpands = []) => {
	const validExpands = ["campus", "module", "ects", "job"];

	const where = {};
	const include = {
		position: { model: models.position, required: true, where: { name: "Étudiant" } },
		study: { model: models.study, required: true },
	};

	if (filters) {
		// Campus name
		if (filters.campus) {
			where["$campus.name$"] = filters.campus;
		}

		// Expand
		if (filters.expand) {
			filters.expand
				.filter(e => validExpands.some(ve => e.includes(ve)))
				.sort((a, b) => validExpands.indexOf(a) - validExpands.indexOf(b))
				.map(expand => {
					if (expand.includes("campus")) {
						include.campus = { model: models.campus, required: true };
					} else if (expand.includes("module")) {
						include.module = { model: models.module, required: false };
					} else if (expand.includes("ects") && include.hasOwnProperty("module")) {
						include.module.include = [{
							model: models.note,
							required: false,
							where: {
								user_id: {[Op.col]: "user.user_id" },
							},
						}];
					} else if (expand.includes("job")) {
						const how = expand.split("<").pop().split(">")[0];
						const model = { model: models.job, required: (filters.onlyHired === "true") };

						if (how === "current") {
							const today = new Date().setHours(0, 0, 0, 0);

							model.where = {
								start_date: { [Op.lte]: today },
								end_date: { [Op.or]: {[Op.eq]: null, [Op.gte]: today} },
							};
						}

						include.job = model;
					}
				});
		}
	}

	return { where, include: Object.values(include) };
};

/**
 * Transform URI query params to sequelize `where` and `include` clauses.
 * @function
 *
 * @param {SCTsFilters} filters
 * @return {SeqSCTsFilters}
 */
const processSCTFilters = filters => {
	const where = {};
	const include = [
		{ model: models.position, required: true, where: { name: "Intervenant" } },
	];

	if (filters) {
		if (filters.campus) {
			where["$campus.name$"] = filters.campus;
		}

		if (filters.expand) {
			if (filters.expand.includes("campus")) {
				include.push({ model: models.campus, required: true });
			}

			if (filters.expand.includes("module")) {
				include.push({ model: models.module, required: false });
			}
		}
	}

	return { where, include };
};

/*****************************************************
 * CRUD Methods - Users
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
		storedUser = await models.user.findOne({
			include: [
				{
					model: models.position,
					required: true,
					include: [{
						model: models.permission,
						through: {attributes: []},
					}],
				},
				{ model: models.campus, required: false },
				{ model: models.study, required: false },
			],
			where: {email: user.email},
		});

		if (!storedUser) throw new Error();
	} catch (err) {
		// TODO: Better handling
		console.error(err);
		throw new APIError(400, "L'adresse email et/ou le mot de passe sont erronés.", ["email", "password"]);
	}

	// Check the password
	if (!(await passwordMatchHash(user.password, storedUser.password))) {
		throw new APIError(400, "L'adresse email et/ou le mot de passe sont erronés.", ["email", "password"]);
	}

	// Generate a JWT token
	const token = await generateJWT(storedUser);

	delete storedUser.password;
	const flattenUser = buildPermissions(storedUser);
	return new APIResp(200).setData({ token, user: flattenUser });
};

/**
 * Get all users
 * @function
 * @async
 *
 * @return {Promise<APIResp>}
 */
const getAll = async () => {
	const users = await models.user.findAll({
		attributes: { exclude: ["password"] },
		include: [{
			model: models.campus,
			required: false,
		}],
	});

	return new APIResp(200).setData({ users });
};

/**
 * Get one user by its id
 * @function
 * @async
 *
 * @param {number} userID
 * @param {object} filters
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const getByID = async (userID, filters) => {
	const includeClause = [
		{
			model: models.position,
			required: true,
			include: [{
				model: models.permission,
				through: {attributes: []},
			}],
		},
		{ model: models.campus, required: false },
	];

	if (filters && filters.expand) {
		if (filters.expand.includes("study")) {
			includeClause.push({ model: models.study, required: false });
		}
	}

	const user = await models.user.findOne({
		attributes: { exclude: ["password"] },
		include: includeClause,
		where: { user_id: userID },
	});

	if (!user) {
		throw new APIError(404, `Cet utilisateur (${userID}) n'existe pas.`);
	}

	const flattenUser = buildPermissions(user);
	return new APIResp(200).setData({ user: flattenUser });
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
		include: [
			{
				model: models.position,
				required: true,
				include: [{
					model: models.permission,
					through: {attributes: []},
				}],
			},
			{ model: models.campus, required: false },
		],
		where: { uuid },
	});

	if (!user) {
		throw new APIError(404, `Cet utilisateur (${uuid}) n'existe pas.`);
	}

	const userJSON = user.toJSON();
	userJSON.position.permissions.forEach((p, i, arr) => (arr[i] = p.name));

	return new APIResp(200).setData({ user: userJSON });
};

/*****************************************************
 * CRUD Methods - Students
 *****************************************************/

/* ---- CREATE ---------------------------------- */
/* ---- READ ------------------------------------ */
/**
 * Get all student
 * @function
 * @async
 *
 * @param {StudentFilters} filters
 * @return {Promise<APIResp>}
 */
const getAllStudents = async filters => {
	const clauses = processStudentFilters(filters);

	const students = await models.user.findAll({
		attributes: { exclude: ["password"] },
		include: clauses.include,
		where: clauses.where,
	});

	return new APIResp(200).setData({ students });
};

/**
 * Get a student by its UUID
 * @function
 * @async
 *
 * @param {string} uuid
 * @param {StudentFilters} filters
 * @return {Promise<APIResp>}
 */
const getStudentByUUID = async (uuid, filters) => {
	const clauses = processStudentFilters(filters);

	const student = await models.user.findOne({
		attributes: { exclude: ["password"] },
		include: clauses.include,
		where: {
			...clauses.where,
			uuid: uuid,
		},
	});

	if (!student) {
		throw new APIError(404, `Cet étudiant (${uuid}) n'existe pas.`);
	}

	return new APIResp(200).setData({ student });
};

/**
 * Get all students at resit
 * @function
 * @async
 *
 * @param {StudentFilters} filters
 * @return {Promise<APIResp>}
 */
const getStudentsAtResit = async (filters) => {
	const clauses = processStudentFilters(filters, ["module", "ects", "job"]);

	const students = await models.user.findAll({
		attributes: { exclude: ["password"] },
		include: [
			...clauses.include,
			{
				model: models.module,
				required: true,
				include: [
					{
						model: models.note,
						required: true,
						where: {
							"user_id": { [Op.col]: "user.user_id" },
							"note": { [Op.lt]: 10 },
						},
					},
				],
			},
		],
		where: clauses.where,
	});

	return new APIResp(200).setData({ students });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * CRUD Methods - SCTs
 *****************************************************/

/* ---- CREATE ---------------------------------- */
/* ---- READ ------------------------------------ */
/**
 * Get all SCTs
 * @function
 * @async
 *
 * @param {SCTsFilters} filters
 * @return {Promise<APIResp>}
 */
const getAllSCTs = async filters => {
	const clauses = processSCTFilters(filters);

	const scts = await models.user.findAll({
		attributes: { exclude: ["password"] },
		include: clauses.include,
		where: clauses.where,
	});

	return new APIResp(200).setData({ scts });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const User = {
	/* CREATE */ add,
	/* READ */ login, getAll, getByID, getByUUID, getAllStudents, getStudentByUUID, getStudentsAtResit, getAllSCTs,
};
export default User;
