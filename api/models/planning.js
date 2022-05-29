/**
 * @module planning
 * @category API
 * @subcategory Models
 * @author Maxence P. <maxence.pawlowski@supinfo.com>
 */

import { DataTypes } from "sequelize";

/**
 * @const
 * @type {Object}
 *
 * @example
 * {
 *  planning_id: {
 *    type: DataTypes.INTEGER,
 *    primaryKey: boolean,
 *    allowNull: boolean,
 *    autoIncrement: boolean
 *  },
 *  start_date: {
 *    type: DataTypes.DATE,
 *    allowNull: boolean,
 *    validate: { isDate: boolean }
 *  },
 *  end_date: {
 *    type: DataTypes.DATE,
 *    allowNull: boolean,
 *    validate: { isDate: boolean }
 *  },
 *  event_name: {
 * 		type: DataTypes.STRING,
 * 		allowNull: boolean,
 * 	},
 * 	event_type: {
 * 		type: DataTypes.STRING,
 * 		allowNull: boolean,
 * 	},
 * 	year: {
 * 		type: DataTypes.SMALLINT,
 * 		allowNull: boolean,
 * 		validate: { min: int },
 * 	},
 * }
 */
const planning = {
	planning_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	start_date: {
		type: DataTypes.DATE,
		allowNull: false,
		validate: {
			isDate: true,
		},
	},
	end_date: {
		type: DataTypes.DATE,
		allowNull: false,
		validate: {
			isDate: true,
		},
	},
	event_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	event_type: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	year: {
		type: DataTypes.SMALLINT,
		allowNull: true,
		validate: { min: 1 },
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
	sequelize.define(name, planning);
};

export default planning;
