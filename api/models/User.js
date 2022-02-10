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
	first_name: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	last_name: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	birth_date: { type: DataTypes.DATE },
	email: {
		type: DataTypes.STRING(256),
		unique: true,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	street_address: { type: DataTypes.STRING },
	gender: { type: DataTypes.STRING },
	region: { type: DataTypes.STRING },
	status: {
		type: DataTypes.ENUM,
		values: [
			"élève",
			"full professor",
			"directeur académique",
			"administrateur",
			"coordinateur",
			"intervenant",
		],
		allowNull: false,
	},
	campus: {
		type: DataTypes.ENUM,
		values: [
			"Caen",
			"Distanciel",
			"Lille",
			"Lyon",
			"Paris",
			"Tours",
		],
	},
};

export const define = (sequelize) => {
	sequelize.define("User", User);
};

export default User;
