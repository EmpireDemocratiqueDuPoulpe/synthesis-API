/**
 * @module PositionPermissions
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { DataTypes } from "sequelize";

const PositionPermissions = {
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
	sequelize.define(name, PositionPermissions);
};

export default PositionPermissions;
