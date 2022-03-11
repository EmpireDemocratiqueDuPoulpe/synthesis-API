/**
 * @module jobOffer
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
 *    primaryKey: boolean,
 *    autoIncrement: boolean,
 *    allowNull: boolean
 *  },
 *  type: {
 *    type: DataTypes.ENUM,
 *    values: string[],
 *    allowNull: boolean
 *  },
 *  title: {
 *    type: DataTypes.TEXT,
 *    allowNull: boolean
 *  },
 *  company_name: {
 *    type: DataTypes.TEXT
 *    allowNull: boolean
 *  },
 *  city: {
 *    type: DataTypes.TEXT,
 *    allowNull: boolean
 *  },
 *  postal_code: {
 *    type: DataTypes.TEXT,
 *    allowNull: boolean,
 *    validate: { len: Array<number> }
 *  },
 *  content: {
 *    type: DataTypes.TEXT,
 *    allowNull: boolean
 *  },
 *  expiration_date: {
 *    type: DataTypes.DATE,
 *    allowNull: boolean,
 *    validate: { isPosterior(expDate): void }
 *  },
 * }
 */
const jobOffer = {
	job_offer_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	type: {
		type: DataTypes.ENUM,
		values: [ "stage", "alternance" ],
		allowNull: false,
	},
	title: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	company_name: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	city: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	postal_code: {
		type: DataTypes.TEXT,
		allowNull: true,
		validate: { len: [0, 10] },
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	expiration_date: {
		type: DataTypes.DATE,
		allowNull: true,
		validate: {
			isPosterior(expDate) {
				if (Date.now() > expDate) {
					throw new Error("La date d'expiration doit être antérieure à la date d'aujourd'hui.");
				}
			},
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
	sequelize.define(name, jobOffer);
};

export default jobOffer;
