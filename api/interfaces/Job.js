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

/**
 * @typedef {Object} NewJobFromETL
 *
 * @property {string} companyName
 * @property {string} contrat
 * @property {string} hire_date
 * @property {string} end_date
 */

/*****************************************************
 * CRUD Methods
 *****************************************************/

/* ---- CREATE ---------------------------------- */
/**
 * Add a new job
 * @function
 * @async
 *
 * @param {NewJobFromETL} newJob
 * @param {string|number} userId
 * @return {Promise<APIResp>}
 */
const addFromETL = async (newJob, userId) => {
	const processedJob = {
		user_id: userId,
		company_name: newJob.companyName,
		type: newJob.contrat,
		start_date: newJob.hire_date,
		end_date: newJob.end_date,
	};

	// Add to the database
	const job = await models.job.findOrCreate({
		where: { user_id: userId },
		defaults: processedJob,
	});

	return new APIResp(200).setData({ jobID: job[0].job_id });
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
	addFromETL, // CREATE
	getAllByUserID, // READ
};
export default Job;

