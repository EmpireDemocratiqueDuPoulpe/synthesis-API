/**
 * @module campus
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
 *  campus_id: {
 *    type: DataTypes.INTEGER,
 *    primaryKey: boolean,
 *    allowNull: boolean,
 *    autoIncrement: boolean,
 *    validate: { isInteger: boolean }
 *  },
 *  name: {
 *    type: DataTypes.STRING,
 *    allowNull: boolean,
 *    unique: boolean,
 *    validate: { notEmpty: boolean }
 *  },
 *  address_street: {
 *  	type: DataTypes.STRING,
 * 	 	allowNull: boolean,
 *  },
 *  address_city: {
 *  	type: DataTypes.STRING,
 * 	 	allowNull: boolean,
 *  },
 *  address_postal_code: {
 *  	type: DataTypes.STRING,
 * 	 	allowNull: boolean,
 *  },
 *  geo_position: {
 *  	type: DataTypes.GEOMETRY("POINT"),
 * 	 	allowNull: boolean,
 *  }
 * }
 */
const campus = {
	campus_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
		validate: { isInteger: true },
	},
	name: {
		type: DataTypes.STRING(100),
		allowNull: false,
		unique: true,
		validate: { notEmpty: true },
	},
	address_street: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	address_city: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	address_postal_code: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	geo_position: {
		type: DataTypes.GEOMETRY("POINT"),
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
	sequelize.define(name, campus);
};

export default campus;
