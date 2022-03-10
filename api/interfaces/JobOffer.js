/**
 * @module JobOffer
 * @category API
 * @subcategory Interfaces
 * @author Alexis L. <alexis.lecomte@supinfo.com>
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
 * @typedef {Object} NewJobOffer
 *
 * @property {number} job_domain_id
 * @property {string} title
 * @property {string} company_name
 * @property {string} city
 * @property {string} postal_code
 * @property {string} content
 */

/*****************************************************
 * Functions
 *****************************************************/

/*****************************************************
 * CRUD Methods
 *****************************************************/

/* ---- CREATE ---------------------------------- */
/**
 * Add a new job offer
 * @function
 * @async
 *
 * @param {NewJobOffer} newJobOffer
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const add = async (newJobOffer) => {
	const processedOffer = newJobOffer;

	// Check if the new job offer match the model
	const model = models.jobOffer.build(processedOffer);

	try {
		await model.validate({ skip: ["job_offer_id"] });
	} catch (err) {
		// TODO: Adapt the system
		throw new APIError(400, "error", Object.values(err));
	}

	// Add to the database
	const jobOffer = await models.jobOffer.create(processedOffer);

	return new APIResp(200).setData({ jobOfferID: jobOffer.job_offer_id });
};

/* ---- READ ------------------------------------ */
/**
 * Get all job offers
 * @function
 * @async
 *
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const getAll = async () => {
	const jobOffers = await models.jobOffer.findAll();
	return new APIResp(200).setData({ jobOffers });
};

/**
 * Get a job offer by its id
 * @function
 * @async
 *
 * @param {number} jobOfferID
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const getByID = async (jobOfferID) => {
	const jobOffer = await models.jobOffer.findOne({
		where: { job_offer_id: jobOfferID },
	});

	if (!jobOffer) {
		throw new APIError(404, `L'offre d'emploi (${jobOfferID}) n'existe pas.`);
	}

	return new APIResp(200).setData({ jobOffer });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const JobOffer = {
	add,							// CREATE
	getAll, getByID,	// READ
};
export default JobOffer;