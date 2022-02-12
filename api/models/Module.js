/**
 * @module Module
 * @author Louan L. <louan.leplae@supinfo.com>
 */

import { DataTypes } from "sequelize";

const Module = {
	module_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	year: {
		type: DataTypes.SMALLINT,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING(4),
		allowNull: false,
	},
	longName: {
		type: DataTypes.STRING,
		allowNull: false,
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
	sequelize.define(name, Module);
};

export default Module;
