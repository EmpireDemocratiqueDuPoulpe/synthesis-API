/**
 * @module Job
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
const getAllByUserID = async (userID) => {
	const jobs = await models.job.findAll({
		where: { user_id: userID },
	});

	if (!jobs) {
		throw new APIError(404, `Cet utilisateur (${userID}) n'a pas de parcours professionnel.`);
	}

	return new APIResp(200).setData({ jobs });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const Job = {
	getAllByUserID, // READ
};
export default Job;

