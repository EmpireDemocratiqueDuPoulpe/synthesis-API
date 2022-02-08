import { DataTypes } from "sequelize";

const Module = {
	module_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	module: {
		type: DataTypes.STRING(4),
		unique: true,
	},
	longName: { type: DataTypes.STRING },
};

export const define = (sequelize) => {
	sequelize.define("Module", Module);
};

export default Module;
