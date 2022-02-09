import { DataTypes } from "sequelize";

const User = {
	user_id: {
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
	birth_date: { type: DataTypes.DATE },
	email: {
		type: DataTypes.STRING,
		unique: true,
	},
	password: { type: DataTypes.STRING },
	street_address: { type: DataTypes.STRING },
	gender: { type: DataTypes.STRING },
	region: { type: DataTypes.STRING },
	status: { type: DataTypes.ENUM,
		values: [
			"élève",
			"full professor",
			"directeur académique",
			"administrateur",
			"coordinateur",
			"intervenant",
		],
	},
	campus: { type: DataTypes.ENUM,
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
