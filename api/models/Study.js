import { DataTypes } from "sequelize";

const Study = {
	study_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	year: { type: DataTypes.STRING }, // M.Eng.1 ?
	entry_level: { type: DataTypes.INTEGER },
	exit_level: { type: DataTypes.INTEGER },
	previous_level: { type: DataTypes.INTEGER },
	current_level: { type: DataTypes.INTEGER },
	entry_date: { type: DataTypes.DATE },
	exit_date: { type: DataTypes.DATE },
};

export const define = (sequelize) => {
	sequelize.define("Study", Study);
};

export default Study;
