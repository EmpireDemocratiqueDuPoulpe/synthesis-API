import { DataTypes } from "sequelize";

const Absence = {
	absence_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	start_date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	end_date: { type: DataTypes.DATE },
};

export const define = (sequelize) => {
	sequelize.define("Absence", Absence);
};

export default Absence;
