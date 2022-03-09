/**
 * @module permission
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
 *  permission_id: {
 *    type: DataTypes.INTEGER,
 *    primaryKey: boolean,
 *    allowNull: boolean,
 *    autoIncrement: boolean
 *   }
 *  name: {
 *    type: DataTypes.STRING,
 *    allowNull: boolean,
 *    validate: { isUppercase: boolean, notEmpty: boolean }
 *  },
 *  name_localized: { type: DataTypes.STRING }
 * }
 */
const permission = {
	permission_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			isUppercase: true,
			notEmpty: true,
		},
	},
	name_localized: { type: DataTypes.STRING },
};

/**
 * Define the model
 * @function
 *
 * @param {Sequelize} sequelize
 * @param {string} name - The file name used for the definition
 */
export const define = (sequelize, name) => {
	sequelize.define(name, permission);
};

export default permission;
