/**
 * @module attachement
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
 *  attachement_id: {
 *    type: DataTypes.INTEGER,
 *    primaryKey: boolean,
 *    autoIncrement: boolean,
 *    allowNull: boolean
 *  },
 *  name: {
 *    type: DataTypes.TEXT,
 *    allowNull: boolean
 *  },
 *  path: {
 *    type: DataTypes.TEXT,
 *    allowNull: boolean
 *  },
 *  size: {
 *    type: DataTypes.INTEGER,
 *    allowNull: boolean
 *  },
 *  type: {
 *    type: DataTypes.TEXT,
 *    allowNull: boolean
 *  },
 * }
 */
const attachement = {
	attachement_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	path: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	size: {
		type: DataTypes.INTEGER, // TODO: Not sure about this
		allowNull: true,
	},
	type: {
		type: DataTypes.TEXT,
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
	sequelize.define(name, attachement);
};

export default attachement;
