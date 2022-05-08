/**
 * @module userModules
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
 *  user_id: {
 *    type: DataTypes.INTEGER,
 *    references: { model: string, key: string }
 *  }
 *  module_id: {
 *    type: DataTypes.INTEGER,
 *    references: { model: string, key: string }
 *  }
 * }
 */
const userModules = {
	user_id: {
		type: DataTypes.INTEGER,
		references: {
			model: "users",
			key: "user_id",
		},
	},
	module_id: {
		type: DataTypes.INTEGER,
		references: {
			model: "modules",
			key: "module_id",
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
	sequelize.define(name, userModules);
};

export default userModules;
