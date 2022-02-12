/**
 * @module Compta
 * @author Louan L. <louan.leplae@supinfo.com>
 */

import { DataTypes } from "sequelize";

const Compta = {
	compta_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	payment_type: {
		type: DataTypes.ENUM,
		values: [ "OPCA", "Comptant", "Échelonnement" ],
		allowNull: false,
	},
	payment_due: {
		type: DataTypes.DECIMAL(17, 2),
		defaultValue: 0,
		allowNull: false,
	},
	paid: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false,
	},
	relance: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
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
	sequelize.define(name, Compta);
};

export default Compta;
