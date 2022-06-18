/**
 * @module jobDomain
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
 *  job_domain_id: {
 *    type: DataTypes.INTEGER,
 *    primaryKey: boolean,
 *    autoIncrement: boolean,
 *    allowNull: boolean
 *  }
 *  name: {
 *    type: DataTypes.TEXT,
 *    allowNull: boolean
 *  }
 * }
 */
const jobDomain = {
	job_domain_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.TEXT,
		allowNull: false,
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
	sequelize.define(name, jobDomain);
};

export default jobDomain;
