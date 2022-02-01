import { DataTypes } from "sequelize";

const Enterprise = {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
	},
	uuid: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
	},
	start_date: {type: DataTypes.DATE},
	end_date: {type: DataTypes.DATE},
	name: {type: DataTypes.STRING},
};

export default Enterprise;

