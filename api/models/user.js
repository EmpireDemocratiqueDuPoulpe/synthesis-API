/**
 * @module user
 * @category API
 * @subcategory Models
 * @author Louan L. <louan.leplae@supinfo.com>
 */

import { DataTypes } from "sequelize";

// TODO: Custom messages
/**
 * @const
 * @type {Object}
 *
 * @example
 * {
 *  user_id: {
 *    type: DataTypes.INTEGER,
 *    primaryKey: boolean,
 *    allowNull: boolean,
 *    autoIncrement: boolean,
 *    validate: { isInteger: boolean }
 *  },
 *  uuid: {
 *    type: DataTypes.UUID,
 *    unique: boolean,
 *    allowNull: boolean,
 *    defaultValue: DataTypes.UUIDV4,
 *    validate: { isUUID: number }
 *  },
 *  first_name: {
 *    type: DataTypes.STRING,
 *    allowNull: boolean,
 *    validate: { notEmpty: boolean }
 *  },
 *  last_name: {
 *    type: DataTypes.STRING,
 *    allowNull: boolean,
 *    validate: { notEmpty: boolean }
 *  },
 *  birth_date: {
 *    type: DataTypes.DATE,
 *    validate: { isAfter: string }
 *  },
 *  email: {
 *    type: DataTypes.STRING,
 *    unique: { args: boolean, msg: string },
 *    allowNull: boolean,
 *    validate: { isEmail: boolean }
 *  },
 *  password: {
 *    type: DataTypes.STRING,
 *    allowNull: boolean
 *  },
 *  street_address: {
 *  	type: DataTypes.STRING,
 *  	allowNull: boolean
 *  },
 *  gender: {
 *  	type: DataTypes.STRING,
 *  	allowNull: boolean
 *  },
 *  region: {
 *  	type: DataTypes.STRING,
 *  	allowNull: boolean
 *  }
 * }
 */
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
	street_address: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	gender: {
		type: DataTypes.ENUM,
		values: ["homme", "femme"],
		allowNull: true,
	},
	region: {
		type: DataTypes.STRING,
		allowNull: true,
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
