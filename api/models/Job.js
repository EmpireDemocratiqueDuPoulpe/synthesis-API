import { DataTypes } from "sequelize";

const Job = {
	job_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	job_type: {
		type: DataTypes.ENUM,
		values: ["stage", "alternance"],
	},
	start_date: { type: DataTypes.DATE },
	end_date: { type: DataTypes.DATE },
	company_name: { type: DataTypes.STRING },
	lenght_month_hired: { type: DataTypes.INTEGER},
	is_hired: { type: DataTypes.BOOLEAN },
};

export const define = (sequelize) => {
	sequelize.define("Job", Job);
};

export default Job;
