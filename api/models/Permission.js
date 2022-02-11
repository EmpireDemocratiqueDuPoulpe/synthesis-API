import { DataTypes } from "sequelize";

const Permission = {
	permission_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	name_localized: { type: DataTypes.STRING },
};

export const define = (sequelize) => {
	sequelize.define("Permission", Permission);
};

export default Permission;
