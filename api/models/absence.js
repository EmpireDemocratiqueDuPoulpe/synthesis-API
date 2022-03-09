/**
 * @module absence
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
 *  absence_id: {
 *    type: DataTypes.INTEGER,
 *    primaryKey: boolean,
 *    allowNull: boolean,
 *    autoIncrement: boolean
 *  },
 *  start_date: {
 *    type: DataTypes.DATE,
 *    allowNull: boolean,
 *    validate: { isBeforeEndDate(startDate): void }
 *  },
 *  end_date: { type: DataTypes.DATE }
 * }
 */
const absence = {
	absence_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	start_date: {
		type: DataTypes.DATE,
		allowNull: false,
		validate: {
			isBeforeEndDate(startDate) {
				if (startDate > this.end_date) {
					throw new Error("La date de début doit être antérieur à la date de fin.");
				}
			},
		},
	},
	end_date: { type: DataTypes.DATE },
};

/**
 * Define the model
 * @function
 *
 * @param {Sequelize} sequelize
 * @param {string} name - The file name used for the definition
 */
export const define = (sequelize, name) => {
	sequelize.define(name, absence);
};

export default absence;
