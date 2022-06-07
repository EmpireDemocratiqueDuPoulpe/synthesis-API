/**
 * @module Absence
 * @category API
 * @subcategory Interfaces
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import sequelize from "../sequelizeLoader.js";
import { APIResp, APIError } from "../../global/global.js";
import {Op} from "sequelize";

/**
 * Sequelize models
 * @const
 * @name models
 * @type {Object<Sequelize.models>}
 */
const { models } = sequelize;

/**
 * @typedef {Object} NewAbsence
 *
 * @property {number} user_id
 * @property {Date|string} start_date
 * @property {Date|string} end_date
 */
/**
 * @typedef {Object} AbsencesFilters
 *
 * @property {array<number>} userIDs
 * @property {array<number>} campusIDs
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
 * Add a new absence to a user
 * @function
 * @async
 *
 * @param {NewAbsence} newAbsence
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const add = async (newAbsence) => {
	const processedAbsence = newAbsence;

	// Check if the new absence match the model
	const model = models.absence.build(processedAbsence);

	try {
		await model.validate({ skip: ["absence_id"] });
	} catch (err) {
		// TODO: Adapt the system
		throw new APIError(400, "error", Object.values(err));
	}

	// Add to the database
	const absence = await models.absence.create(processedAbsence);

	return new APIResp(200).setData({ absenceID: absence.absence_id });
};

/* ---- READ ------------------------------------ */
/**
 * Get all absences
 * @function
 * @async
 *
 * @param {AbsencesFilters} filters
 * @return {Promise<APIResp>}
 */
const getAll = async filters => {
	const usableFilters = {};
	if (filters) {
		if (filters.userIDs) {
			usableFilters.user_id = { [Op.in]: filters.userIDs };
		}
		if (filters.campusIDs) {
			usableFilters["$user.campus.campus_id$"] = { [Op.in]: filters.campusIDs };
		}
		if (filters.years) {
			usableFilters["$user.study.current_level$"] = { [Op.in]: filters.years };
		}
	}

	const absences = await models.absence.findAll({
		include: [{
			model: models.user,
			as: "user",
			required: true,
			include: [{
				model: models.study,
				as: "study",
				required: false,
			}, {
				model: models.campus,
				as: "campus",
				required: false,
			}],
		}],
		where: usableFilters,
	});

	return new APIResp(200).setData({ absences });
};
/**
 * Get all absences of a user
 * @function
 * @async
 *
 * @param {number} userID
 * @return {Promise<APIResp>}
 */
const getByUserID = async (userID) => {
	const absences = await models.absence.findAll({
		where: { user_id: userID },
	});

	return new APIResp(200).setData({ absences });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const Absence = {
	add,					// CREATE
	getAll,					// READ
	getByUserID,
};
export default Absence;
