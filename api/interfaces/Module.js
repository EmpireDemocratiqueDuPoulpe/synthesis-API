/**
 * @module Module
 * @category API
 * @subcategory Interfaces
 * @author Maxence P. <maxence.pawlowski@supinfo.com>
 */

import { Op } from "sequelize";
import sequelize from "../sequelizeLoader.js";
import { APIResp, APIError } from "../../global/global.js";

/**
 * Sequelize models
 * @const
 * @name models
 * @type {Object<Sequelize.models>}
 */
const { models } = sequelize;

/**
 * @typedef {Object} NewModule
 *
 * @property {number} year
 * @property {string} name
 * @property {string} long_name
 * @property {number} ects
 */

/**
 * @typedef {Object} ModuleNotesFilters
 *
 * @property {array<number>} years
 */

/**
 * @typedef {Object} ModuleFilters
 *
 * @property {array<number>} years
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

	// Check if the new module match the model
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
 * @param {ModuleFilters} filters
 * @return {Promise<APIResp>}
 */
const getAll = async filters => {
	const usableFilters = {};

	if (filters) {
		if (filters.years) {
			usableFilters.year = {
				[Op.in]: filters.years,
			};
		}
	}
	const modules = await models.module.findAll({
		include: [{
			model: models.user,
			as: "users",
			required: false,
			include: [{
				model: models.position,
				as: "position",
				required: true,
				where: {
					name: "Intervenant",
				},
			}],
		}],
		where: usableFilters,
		order: [ ["year", "ASC"] ],
	});

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

/**
 * Get all modules with notes of a user
 * @function
 * @async
 *
 * @param {number} userID
 * @param {ModuleNotesFilters} filters
 * @return {Promise<APIResp>}
 */
const getNotesByUserID = async (userID, filters) => {
	const usableFilters = {};

	if (filters) {
		if (filters.years) {
			usableFilters.year = {
				[Op.in]: filters.years,
			};
		}
	}

	const modules = await models.module.findAll({
		include: [{
			model: models.note,
			as: "notes",
			required: false,
			where: { user_id: userID },
		}],
		where: usableFilters,
		order: [ ["year", "DESC"] ],
	});

	return new APIResp(200).setData({ modules });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const Module = {
	add,							// CREATE
	getAll, getByID, getNotesByUserID,	// READ
};
export default Module;
