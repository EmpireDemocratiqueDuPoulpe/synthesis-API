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
const addJobs = async (newJob, userId) => {
	const processJob = {
		type: newJob.contrat,
		start_date: newJob.hire_date,
		company_name: newJob.companyName,
		user_id: userId,
	};

	// Add to the database
	const job = await models.job.findOrCreate({
		where: {
			user_id: userId,
		},
		defaults: processJob});

	return { accountingID: job[0].compta_id };
};

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
	addJobs, // CREATE
	getAllByUserID, // READ
};
export default Job;

