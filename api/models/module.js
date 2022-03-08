/**
 * @module module
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
 *  module_id: {
 *    type: DataTypes.INTEGER,
 *    primaryKey: boolean,
 *    allowNull: boolean,
 *    autoIncrement: boolean
 *  },
 *  year: {
 *    type: DataTypes.SMALLINT,
 *    allowNull: boolean,
 *    validate: { min: number, max: number }
 *  },
 *  name: {
 *    type: DataTypes.STRING,
 *    allowNull: boolean,
 *    validate: { notEmpty: boolean }
 *  },
 *  long_name: {
 *    type: DataTypes.STRING,
 *    allowNull: boolean,
 *    validate: { notEmpty: boolean }
 *  }
 * }
 */
const module = {
	module_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	year: {
		type: DataTypes.SMALLINT,
		allowNull: false,
		validate: {
			min: 1,
			max: 5,
		},
	},
	name: {
		type: DataTypes.STRING(4),
		allowNull: false,
		validate: { notEmpty: true },
	},
	long_name: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: { notEmpty: true },
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
	sequelize.define(name, module);
};

export default module;
