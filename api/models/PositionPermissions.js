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

export const define = (sequelize) => {
	PositionPermissions.position_id.references.model = sequelize.models.Position;
	PositionPermissions.permission_id.references.model = sequelize.models.Permission;

	sequelize.define("PositionPermissions", PositionPermissions);
};

export default PositionPermissions;
