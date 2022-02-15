/**
 * @module Module
 * @author Maxence P. <maxence.pawlowski@supinfo.com>
 */

import sequelize from "../sequelizeLoader.js";
import { APIResp, APIError } from "../../global/global.js";

const { models } = sequelize;

/**
 * @typedef {Object} NewModule
 *
 * @property {number} year
 * @property {string} name
 * @property {string} longName
 */

/*****************************************************
 * Functions
 *****************************************************/


/*****************************************************
 * CRUD Methods
 *****************************************************/

/* ---- CREATE ---------------------------------- */
/**
 * Add a new module
 * @function
 * @async
 *
 * @param {NewModule} newModule
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const add = async (newModule) => {
	const processedModule = newModule;

	// Check if the new user match the model
	const model = models.module.build(processedModule);

	try {
		await model.validate({ skip: ["module_id"] });
	} catch (err) {
		// TODO: Adapt the system
		throw new APIError(400, "error", Object.values(err));
	}

	// Add to the database
	const module = await models.module.create(processedModule);

	return new APIResp(200).setData({ moduleID: module.module_id });
};

/* ---- READ ------------------------------------ */
/**
 * Get all modules
 * @function
 * @async
 *
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const getAll = async () => {
	const modules = await models.module.findAll();

	return new APIResp(200).setData({ modules });
};

/**
 * Get one module by its id
 * @function
 * @async
 *
 * @param {number} moduleID
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const getByID = async (moduleID) => {
	const module = await models.module.findOne({
		where: { module_id: moduleID },
	});

	if (!module) {
		throw new APIError(404, `Ce module (${moduleID}) n'existe pas.`);
	}

	return new APIResp(200).setData({ module });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const Module = {
	add,							// CREATE
	getAll, getByID,	// READ
};
export default Module;
