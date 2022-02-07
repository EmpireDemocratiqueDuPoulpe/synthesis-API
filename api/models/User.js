import { DataTypes } from "sequelize";

const User = {
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
	first_name: { type: DataTypes.STRING },
	last_name: { type: DataTypes.STRING },
	email: { type: DataTypes.STRING },
	birth_date: { type: DataTypes.DATE },
	password: { type: DataTypes.STRING },
	street_address: { type: DataTypes.STRING },
	gender: { type: DataTypes.BOOLEAN },
	region: { type: DataTypes.STRING},
	status: {type: DataTypes.ENUM,
		values: [
			"student",
			"fullprofessor",
			"directeur academique",
			"admin",
			"ccoordinateur",
		],
	},
	campus: {type: DataTypes.ENUM,
		values: [
			"Caen",
			"Distanciel",
			"Lille",
			"Lyon",
			"Paris",
			"Tours",
		]},
};

export const define = (sequelize) => {
	sequelize.define("User", User);
};

export default User;
