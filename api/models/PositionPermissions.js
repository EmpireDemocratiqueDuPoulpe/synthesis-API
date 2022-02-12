/**
 * @module PositionPermissions
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { DataTypes } from "sequelize";

const PositionPermissions = {
	position_id: {
		type: DataTypes.INTEGER,
		references: {
			model: "Position", // Replaced in .define()
			key: "position_id",
		},
	},
	permission_id: {
		type: DataTypes.INTEGER,
		references: {
			model: "Permission", // Replaced in .define()
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
	PositionPermissions.position_id.references.model = sequelize.models.Position;
	PositionPermissions.permission_id.references.model = sequelize.models.Permission;

	sequelize.define(name, PositionPermissions);
};

export default PositionPermissions;
