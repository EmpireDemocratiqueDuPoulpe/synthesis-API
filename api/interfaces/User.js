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
import { APIResp, APIError, Expand } from "../../global/global.js";
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
 * @typedef {Object} NewStudent
 *
 * @property {string} first_name
 * @property {string} last_name
 * @property {Date|string} birth_date
 * @property {string} email
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
 * @property {"true"|"false"|string} [onlyOld]
 * @property {array<"campus"|"module"|"ects"|"job"|"compta">} [expand]
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
		.setIssuer("cpem") // TODO : Change to the site name
		.setIssuedAt()
		.setExpirationTime("15m")
		.setSubject(`${user.user_id}`)
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
export const buildPermissions = (user) => {
	const userJSON = user.toJSON();
	userJSON.position.permissions.forEach((p, i, arr) => (arr[i] = p.name));

	return userJSON;
};

/**
 * Transform URI query params to sequelize `where` and `include` clauses.
 * @function
 *
 * @param {module:LoggedUser} currUser
 * @param {StudentFilters} filters
 * @param {Array<string>} disabledExpands - List of expand to not include in the clauses
 * @return {SeqStudentFilters}
 */
const processStudentFilters = async (currUser, filters, disabledExpands = []) => {
	const validExpands = [Expand.CAMPUS, Expand.MODULE, Expand.ECTS, Expand.JOB, Expand.COMPTA]
		.filter(e => !disabledExpands.includes(e));

	const where = {};
	const include = {
		position: { model: models.position, as: "position", required: true, where: {name: "Étudiant"} },
		study: {
			model: models.study,
			as: "study",
			required: true,
			where: { exit_level: null, exit_date: null },
		},
	};

	if (filters) {
		// Campus name
		if (filters.campus) {
			where["$campus.name$"] = filters.campus;
		}

		if (filters.onlyOld === "true") {
			include.study.where = {
				[Op.or]: {
					exit_level: { [Op.not]: null },
					exit_date: { [Op.not]: null },
				},
			};
		}

		// Expand
		if (filters.expand) {
			await new Expand(currUser).setAuthorized(validExpands).process(filters.expand, expand => {
				switch (expand.name) {
					case "campus":
						include.campus = { model: models.campus, as: "campus", required: expand.required };
						break;
					case "module":
						include.module = { model: models.module, as: "modules", required: expand.required };
						break;
					case "ects":
						if (include.hasOwnProperty("module")) {
							include.module.include = [{
								model: models.note,
								as: "notes",
								required: expand.required,
								where: {
									user_id: {[Op.col]: "user.user_id" },
								},
							}];
						}
						break;
					case "job":
						const model = { model: models.job, as: "jobs", required: expand.required };

						if (expand.how === "current") {
							const today = new Date().setHours(0, 0, 0, 0);

							model.where = {
								start_date: { [Op.lte]: today },
								end_date: { [Op.or]: {[Op.eq]: null, [Op.gte]: today} },
							};
						}

						include.job = model;
						break;
					case "compta":
						include.compta = { model: models.compta, as: "compta", required: expand.required };
						break;
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
 * @param {module:LoggedUser} currUser
 * @param {SCTsFilters} filters
 * @param {Array<string>} disabledExpands - List of expand to not include in the clauses
 * @return {SeqSCTsFilters}
 */
const processSCTFilters = async (currUser, filters, disabledExpands = []) => {
	const validExpands = [Expand.CAMPUS, Expand.MODULE].filter(e => !disabledExpands.includes(e));
	const where = {};
	const include = [
		{ model: models.position, as: "position", required: true, where: { name: "Intervenant" } },
	];

	if (filters) {
		if (filters.campus) {
			where["$campus.name$"] = filters.campus;
		}

		if (filters.expand) {
			await new Expand(currUser).setAuthorized(validExpands).process(filters.expand, expand => {
				switch (expand.name) {
					case "campus":
						include.campus = {model: models.campus, as: "campus", required: expand.required};
						break;
					case "module":
						include.module = {model: models.module, as: "modules", required: expand.required};
						break;
				}
			});
		}
	}

	return { where, include: Object.values(include) };
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
					as: "position",
					required: true,
					include: [{
						model: models.permission,
						as: "permissions",
					}],
				},
				{ model: models.campus, as: "campus", required: false },
				{ model: models.study, as: "study", required: false },
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
			as: "campus",
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
 * @param {module:LoggedUser} currUser
 * @param {number} userID
 * @param {object} filters
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const getByID = async (currUser, userID, filters) => {
	const includeClause = [
		{
			model: models.position,
			as: "position",
			required: true,
			include: [{
				model: models.permission,
				as: "permissions",
			}],
		},
		{ model: models.campus, as: "campus", required: false },
	];

	if (filters && filters.expand) {
		await new Expand(currUser).setAuthorized([ "study" ]).process(filters.expand, expand => {
			switch (expand.name) {
				case "study":
					includeClause.push({ model: models.study, as: "study", required: expand.required });
					break;
			}
		});
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
				as: "position",
				required: true,
				include: [{
					model: models.permission,
					as: "permissions",
				}],
			},
			{ model: models.campus, as: "campus", required: false },
		],
		where: { uuid },
	});

	if (!user) {
		throw new APIError(404, `Cet utilisateur (${uuid}) n'existe pas.`);
	}

	const flattenUser = buildPermissions(user);
	return new APIResp(200).setData({ user: flattenUser });
};

/*****************************************************
 * CRUD Methods - Students
 *****************************************************/

/* ---- CREATE ---------------------------------- */
/**
 * Add a new student
 * @function
 * @async
 *
 * @param {NewStudent} newStudent
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const addStudent = async (newStudent) => {
	const processedStudent = {
		first_name: newStudent.first_name,
		last_name: newStudent.last_name,
		email: newStudent.email,
		campus: newStudent.campus,
		password: newStudent.password,
		gender: newStudent.gender,
		region: newStudent.region,
		position_id: 6,
	};

	processedStudent.password = await hashPassword("Password123!");

	// Add to the database
	const student = await models.user.findOrCreate({
		where: {
			first_name: processedStudent.first_name,
			last_name: processedStudent.last_name,
			email: processedStudent.email,
			gender: processedStudent.gender,
			region: processedStudent.region,
			position_id: 6,
		},
		defaults: processedStudent});

	return { userID: student[0].user_id };
};

/* ---- READ ------------------------------------ */
/**
 * Get all student
 * @function
 * @async
 *
 * @param {module:LoggedUser} currUser
 * @param {StudentFilters} filters
 * @return {Promise<APIResp>}
 */
const getAllStudents = async (currUser, filters) => {
	const clauses = await processStudentFilters(currUser, filters);

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
 * @param {module:LoggedUser} currUser
 * @param {string} uuid
 * @param {StudentFilters} filters
 * @return {Promise<APIResp>}
 */
const getStudentByUUID = async (currUser, uuid, filters) => {
	const clauses = await processStudentFilters(currUser, filters);

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
 * @param {module:LoggedUser} currUser
 * @param {StudentFilters} filters
 * @return {Promise<APIResp>}
 */
const getStudentsAtResit = async (currUser, filters) => {
	const clauses = await processStudentFilters(currUser, filters, ["module", "ects", "job"]);

	const students = await models.user.findAll({
		attributes: { exclude: ["password"] },
		include: [
			...clauses.include,
			{
				model: models.module,
				as: "modules",
				required: true,
				include: [
					{
						model: models.note,
						as: "notes",
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
 * @param {module:LoggedUser} currUser
 * @param {SCTsFilters} filters
 * @return {Promise<APIResp>}
 */
const getAllSCTs = async (currUser, filters) => {
	const clauses = await processSCTFilters(currUser, filters);

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
	/* CREATE */ add, addStudent,
	/* READ */ login, getAll, getByID, getByUUID, getAllStudents, getStudentByUUID, getStudentsAtResit, getAllSCTs,
};
export default User;
