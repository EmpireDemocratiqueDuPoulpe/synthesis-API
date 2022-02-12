import { DataTypes } from "sequelize";

const Position = {
	position_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
};

export const define = (sequelize, name) => {
	sequelize.define(name, Position);
};

export default Position;
