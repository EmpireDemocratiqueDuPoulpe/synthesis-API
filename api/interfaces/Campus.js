/**
 * @module Campus
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
 * @typedef {Object} CampusesFilters
 *
 * @property {array<number>} campus_ids
 */

/*****************************************************
 * Functions
 *****************************************************/

/*****************************************************
 * CRUD Methods
 *****************************************************/

/* ---- READ ------------------------------------ */
/**
 * Get all campuses
 * @function
 * @async
 *
 * @param {CampusesFilters} filters
 * @return {Promise<APIResp>}
 */
const getAll = async filters => {
	const usableFilters = {};

	if (filters) {
		if (filters.campusIDs) {
			usableFilters.campus_id = {
				[Op.in]: filters.campusIDs,
			};
		}
	}
	const campuses = await models.campus.findAll({
		where: usableFilters,
		order: [ ["campus_id", "ASC"] ],
	});

	return new APIResp(200).setData({ campuses });
};

/**
 * Get one campus by its id
 * @function
 * @async
 *
 * @param {number} campusID
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const getByID = async (campusID) => {
	const campus = await models.campus.findOne({
		where: { campus_id: campusID },
	});

	if (!campus) {
		throw new APIError(404, `Ce campus (${campusID}) n'existe pas.`);
	}

	return new APIResp(200).setData({ campus });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const Campus = {
	getAll, getByID,	// READ
};
export default Campus;
