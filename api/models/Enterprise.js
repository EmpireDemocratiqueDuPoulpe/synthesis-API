import { DataTypes } from "sequelize";

const Enterprise = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	uuid: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	type: {
		type: DataTypes.ENUM,
		values: ["stage", "alternance"],
	},
	start_date: { type: DataTypes.DATE },
	end_date: { type: DataTypes.DATE },
	name: { type: DataTypes.STRING },
	lenght_month_hired: { type: DataTypes.INTEGER},
	is_hired: { type: DataTypes.BOOLEAN },
};

export const define = (sequelize) => {
	sequelize.define("Enterprise", Enterprise);
};

export default Enterprise;
