/**
 * @module jobOfferDomain
 * @category API
 * @subcategory Models
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { DataTypes } from "sequelize";

/**
 * @const
 * @type {Object}
 *
 * @example
 * {
 *  job_offer_id: {
 *    type: DataTypes.INTEGER,
 *    references: { model: string, key: string }
 *  }
 *  job_domain_id: {
 *    type: DataTypes.INTEGER,
 *    references: { model: string, key: string }
 *  }
 * }
 */
const jobOfferDomain = {
	job_offer_id: {
		type: DataTypes.INTEGER,
		references: {
			model: "jobOffers",
			key: "job_offer_id",
		},
	},
	job_domain_id: {
		type: DataTypes.INTEGER,
		references: {
			model: "jobDomains",
			key: "job_domain_id",
		},
	},
};
/**
 * Define the model
 * @function
 *
 * @param {Sequelize} sequelize
 * @param {string} name - The file name used for the definition
 */
export const define = (sequelize, name) => {
	sequelize.define(name, jobOfferDomain);
};

export default jobOfferDomain;
