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
		values: [ "stage", "alternance" ],
		allowNull: false,
	},
	start_date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	end_date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	company_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	is_hired: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false,
	},
	length_month_hired: { type: DataTypes.INTEGER },
};

export const define = (sequelize, name) => {
	sequelize.define(name, Job);
};

export default Job;
