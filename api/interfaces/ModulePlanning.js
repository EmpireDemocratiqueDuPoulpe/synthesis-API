/**
 * @module ModulePlanning
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
 * @typedef {Object} NewModulePlanning
 *
 * @property {number} module_id
 * @property {date} date
 * @property {number} consecutive_days
 */

/**
 * @typedef {Object} ModulePlanningFilters
 *
 * @property {number} year
 */

/*****************************************************
 * Functions
 *****************************************************/

/*****************************************************
 * CRUD Methods
 *****************************************************/

/* ---- READ ------------------------------------ */
/**
 * Get all modules planning
 * @function
 * @async
 *
 * @param {ModulePlanningFilters} filters
 * @return {Promise<APIResp>}
 */
const getAll = async filters => {
	const usableFilters = {};

	if (filters) {
		if (filters.year) {
			usableFilters.year = {
				[Op.eq]: filters.year,
			};
		}
	}
	const modulesPlanning = await models.modulePlanning.findAll({
		where: usableFilters,
	});

	return new APIResp(200).setData({ modulesPlanning });
};

/**
 * Get one module planning by its id
 * @function
 * @async
 *
 * @param {number} planningID
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const getByID = async (planningID) => {
	const modulePlanning = await models.modulePlanning.findOne({
		where: { planning_id: planningID },
	});

	if (!modulePlanning) {
		throw new APIError(404, `Ce planning de module (${planningID}) n'existe pas.`);
	}

	return new APIResp(200).setData({ modulePlanning });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const ModulePlanning = {
	getAll, getByID,	// READ
};
export default ModulePlanning;
