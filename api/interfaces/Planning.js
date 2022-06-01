/**
 * @module Planning
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
 * @typedef {Object} NewPlanning
 *
 * @property {date} date
 * @property {number} consecutive_days
 * @property {string} event_name
 * @property {number} year
 */

/**
 * @typedef {Object} PlanningFilters
 *
 * @property {array<number>} years
 * @property {array<string>} eventTypes
 * @property {array<number>} campuses
 */

/*****************************************************
 * Functions
 *****************************************************/

/*****************************************************
 * CRUD Methods
 *****************************************************/

/* ---- READ ------------------------------------ */
/**
 * Get all planning
 * @function
 * @async
 *
 * @param {PlanningFilters} filters
 * @return {Promise<APIResp>}
 */
const getAll = async filters => {
	const usableFilters = {};
	console.log(filters);
	if (filters) {
		if (filters.years) {
			usableFilters.year = {
				[Op.in]: filters.years,
			};
		}
		if (filters.eventTypes) {
			usableFilters.event_type = {
				[Op.in]: filters.eventTypes,
			};
		}
		if (filters.campuses) {
			usableFilters["$campus.campus_id$"] = {
				[Op.in]: filters.campuses,
			};
		}
	}
	const planning = await models.planning.findAll({
		include: [{
			model: models.module,
			as: "module",
			required: false,
		}, {
			model: models.campus,
			as: "campus",
			required: false,
		}],
		where: usableFilters,
	});

	return new APIResp(200).setData({ planning });
};

/**
 * Get one planning by its id
 * @function
 * @async
 *
 * @param {number} planningID
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const getByID = async (planningID) => {
	const planning = await models.planning.findOne({
		where: { planning_id: planningID },
	});

	if (!planning) {
		throw new APIError(404, `Ce planning (${planningID}) n'existe pas.`);
	}

	return new APIResp(200).setData({ planning });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const Planning = {
	getAll, getByID,	// READ
};
export default Planning;
