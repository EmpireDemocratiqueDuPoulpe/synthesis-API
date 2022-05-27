/**
 * @module Study
 * @category API
 * @subcategory Interfaces
 * @author Louan L. <louan.leplae@supinfo.com>
 */

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
 * @typedef {Object} Study
 *
 * @property {number} study_id
 * @property {number} entry_level
 * @property {number} exit_level
 * @property {number} previous_level
 * @property {number} current_level
 * @property {Date|string} entry_date
 * @property {Date|string} [exit_date]
 */

/*****************************************************
 * Functions
 *****************************************************/

/*****************************************************
 * CRUD Methods
 *****************************************************/

/* ---- CREATE ---------------------------------- */
/* ---- READ ------------------------------------ */
/**
  * Get user's study by user id
  * @function
  * @async
  *
  * @param {number} userID
  * @throws {APIError}
  * @return {Promise<APIResp>}
  */
const getByUserID = async (userID) => {
	const study = await models.study.findOne({
		where: { user_id: userID },
	});

	if (!study) {
		throw new APIError(404, `Cet utilisateur (${userID}) n'a pas de parcours d'étude.`);
	}

	return new APIResp(200).setData({ study });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const Study = {
	getByUserID, // READ
};
export default Study;

