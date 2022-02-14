/**
 * @module user
 * @author Louan L. <louan.leplae@supinfo.com>
 */

import { DataTypes } from "sequelize";

// TODO: Custom messages
const user = {
	user_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
		validate: { isInteger: true },
	},
	uuid: {
		type: DataTypes.UUID,
		unique: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4,
		validate: { isUUID: 4 },
	},
	first_name: {
		type: DataTypes.STRING(100),
		allowNull: false,
		validate: { notEmpty: true },
	},
	last_name: {
		type: DataTypes.STRING(100),
		allowNull: false,
		validate: { notEmpty: true },
	},
	birth_date: {
		type: DataTypes.DATE,
		validate: { isAfter: "1900-01-01" },
	},
	email: {
		type: DataTypes.STRING(256),
		unique: {
			args: true,
			msg: "L'adresse e-mail est déjà utilisée.",
		},
		allowNull: false,
		validate: { isEmail: true },
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

/**
 * Define the model
 * @function
 *
 * @param {Sequelize} sequelize
 * @param {string} name - The file name used for the definition
 */
export const define = (sequelize, name) => {
	sequelize.define(name, user);
};

export default user;
