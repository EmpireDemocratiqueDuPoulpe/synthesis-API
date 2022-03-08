/**
 * @module positionPermissions
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
 *  position_id: {
 *    type: DataTypes.INTEGER,
 *    references: { model: string, key: string }
 *  }
 *  permission_id: {
 *    type: DataTypes.INTEGER,
 *    references: { model: string, key: string }
 *  }
 * }
 */
const positionPermissions = {
	position_id: {
		type: DataTypes.INTEGER,
		references: {
			model: "positions",
			key: "position_id",
		},
	},
	permission_id: {
		type: DataTypes.INTEGER,
		references: {
			model: "permissions",
			key: "permission_id",
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
	sequelize.define(name, positionPermissions);
};

export default positionPermissions;
