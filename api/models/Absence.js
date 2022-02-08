import { DataTypes } from "sequelize";

const Absence = {
	absence_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	payment_type: {
		type: DataTypes.ENUM,
		values: ["OPCA", "Comptant", "Echelonnemt"],
	},
	start_date: { type: DataTypes.DATE },
	end_date: { type: DataTypes.DATE },
};

export const define = (sequelize) => {
	sequelize.define("Absence", Absence);
};

export default Absence;
