/**
 * @module job
 * @category API
 * @subcategory Models
 * @author Louan L. <louan.leplae@supinfo.com>
 */

import { DataTypes } from "sequelize";

/**
 * @const
 * @type {Object}
 *
 * @example
 * {
 *  job_id: {
 *    type: DataTypes.INTEGER,
 *    primaryKey: boolean,
 *    allowNull: boolean,
 *    autoIncrement: boolean
 *  },
 *  job_type: {
 *    type: DataTypes.ENUM,
 *    values: string[],
 *    allowNull: boolean
 *  },
 *  start_date: {
 *    type: DataTypes.DATE,
 *    allowNull: boolean
 *  },
 *  end_date: {
 *    type: DataTypes.DATE,
 *    allowNull: boolean
 *  },
 *  company_name: {
 *    type: DataTypes.STRING,
 *    allowNull: boolean
 *  },
 *  is_hired: {
 *    type: DataTypes.BOOLEAN,
 *    defaultValue: boolean,
 *    allowNull: boolean
 *  },
 *  length_month_hired: {
 *    type: DataTypes.BOOLEAN,
 *    allowNull: boolean
 *  }
 * }
 */
const job = {
	job_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	job_type: {
		type: DataTypes.ENUM,
		values: [ "stage", "alternance" ],
		allowNull: false,
	},
	start_date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	end_date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	company_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	is_hired: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false,
	},
	length_month_hired: {
		type: DataTypes.INTEGER,
		allowNull: true,
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
	sequelize.define(name, job);
};

export default job;
