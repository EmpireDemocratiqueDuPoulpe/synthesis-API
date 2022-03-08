/**
 * @module study
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
 *  study_id: {
 *    type: DataTypes.INTEGER,
 *    primaryKey: boolean,
 *    allowNull: boolean,
 *    autoIncrement: boolean
 *  },
 *  entry_level: {
 *    type: DataTypes.INTEGER,
 *    allowNull: boolean
 *  },
 *  exit_level: { type: DataTypes.INTEGER },
 *  previous_level: { type: DataTypes.INTEGER },
 *  current_level: {
 *    type: DataTypes.INTEGER,
 *    allowNull: boolean
 *  },
 *  entry_date: {
 *    type: DataTypes.DATE,
 *    allowNull: boolean
 *  },
 *  exit_date: { type: DataTypes.DATE }
 * }
 */
const study = {
	study_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	/* ------------------------------------------------*/
	/* Version SupinfoTM */
	/* year: { type: DataTypes.INTEGER },
		entry_level: { type: DataTypes.STRING },
		exit_level: { type: DataTypes.STRING },
		previous_level: { type: DataTypes.STRING },
		current_level: { type: DataTypes.STRING }, */

	/* Version idéale */
	entry_level: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	exit_level: { type: DataTypes.INTEGER },
	previous_level: { type: DataTypes.INTEGER }, // TODO: Calculable
	current_level: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	/* ------------------------------------------------*/
	entry_date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	exit_date: { type: DataTypes.DATE },
};

/**
 * Define the model
 * @function
 *
 * @param {Sequelize} sequelize
 * @param {string} name - The file name used for the definition
 */
export const define = (sequelize, name) => {
	sequelize.define(name, study);
};

export default study;
