/**
 * @module Position
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { DataTypes } from "sequelize";

const Position = {
	position_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	name: {
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
	sequelize.define(name, Position);
};

export default Position;
