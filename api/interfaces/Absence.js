/**
 * @module Absence
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import sequelize from "../sequelizeLoader.js";
import { APIResp, APIError } from "../../global/global.js";

const { models } = sequelize;

/**
 * @typedef {Object} NewAbsence
 *
 * @property {number} user_id
 * @property {Date|string} start_date
 * @property {Date|string} end_date
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
	getByUserID,	// READ
};
export default Absence;
