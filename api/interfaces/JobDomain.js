/**
 * @module JobDomain
 * @category API
 * @subcategory Interfaces
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import sequelize from "../sequelizeLoader.js";
import { APIResp } from "../../global/global.js";

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
 * Get all job domains
 * @function
 * @async
 *
 * @return {Promise<APIResp>}
 */
const getAll = async () => {
	const jobDomains = await models.jobDomain.findAll();
	return new APIResp(200).setData({ jobDomains });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const JobDomain = {
	getAll,	// READ
};
export default JobDomain;
