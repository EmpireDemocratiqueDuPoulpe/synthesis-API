/**
 * @module JobOffer
 * @category API
 * @subcategory Interfaces
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { Op } from "sequelize";
import sequelize from "../sequelizeLoader.js";
import { APIResp, APIError } from "../../global/global.js";
import Attachement from "./Attachement.js";

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
 * @property {Array<number>} [job_domains_ids]
 * @property {string} title
 * @property {string} company_name
 * @property {string} city
 * @property {string} postal_code
 * @property {string} content
 */

/**
 * @typedef {Object} JobOfferFilters
 *
 * @property {("true"|"false")} expired
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
 * @param {Array<MulterFile>} [attachements]
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const add = async (newJobOffer, attachements) => {
	// Check if the new job offer match the model
	const model = models.jobOffer.build(newJobOffer);

	try {
		await model.validate({ skip: ["job_offer_id"] });
	} catch (err) {
		// TODO: Adapt the system
		throw new APIError(400, "error", Object.values(err));
	}

	let transaction;
	try {
		// Add to the database
		transaction = await sequelize.transaction({ autocommit: false });
		const jobOffer = await models.jobOffer.create(newJobOffer, { transaction });

		if (newJobOffer.job_domains_ids) {
			await jobOffer.setJobDomains(newJobOffer.job_domains_ids, { transaction });
		}

		// Add attachements
		let attachementsIDs = [];
		if (attachements) {
			attachementsIDs = await Attachement.add(
				{ name: "job_offer_id", value: jobOffer.job_offer_id },
				attachements,
				transaction,
			);
		}

		// Commit
		await transaction.commit();
		return new APIResp(200).setData({ jobOfferID: jobOffer.job_offer_id, attachementsIDs });
	} catch (err) {
		if (transaction) await transaction.rollback();
		// TODO: Adapt the system
		throw new APIError(400, "error", Object.values(err));
	}
};

/* ---- READ ------------------------------------ */
/**
 * Get all job offers
 * @function
 * @async
 *
 * @param {null|JobOfferFilters} [filters=null]
 *
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const getAll = async (filters = null) => {
	const usableFilters = {
		expiration_date: {
			[Op.or]: {
				[Op.eq]: null,
				[Op.gte]: new Date().setHours(0, 0, 0, 0),
			},
		},
	};

	if (filters) {
		if (filters.expired === "true") {
			delete usableFilters.expiration_date;
		}
	}

	const jobOffers = await models.jobOffer.findAll({
		include: {
			model: models.jobDomain,
			required: false,
		},
		where: usableFilters,
		order: [ ["job_offer_id", "DESC"] ],
	});

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
		include: [
			{ model: models.jobDomain, required: false },
			{ model: models.attachement, required: false },
		],
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
