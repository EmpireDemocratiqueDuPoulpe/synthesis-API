//import pg from "pg";
import { APIError } from "../../global/global.js";
import { DB } from "../../config/config.js";
import { Sequelize } from "sequelize";
import Enterprise from "../../sequelize/models/enterprise.js";
import User from "../models/User.js";

/**
const pool = new pg.Pool({
	host: DB.host,
	port: DB.port,
	database: DB.name,
	user: DB.user,
	password: DB.password,
});*/

/**
const database = async (request, response, next) => {
	try {
		request.db = await pool.connect();
		next();
	} catch (err) {
		throw new APIError(500, "Erreur interne du serveur. Veuillez réessayer plus tard où contacter le support.");
	}
};
*/


export const sequelize = new Sequelize(DB.name, DB.user, DB.password,
	{
		host: DB.host,
		dialect: "postgres",
		logging: console.log,
	});

/**
 * initSequelize
 */
export async function initSequelize() {
	const sequelize = await sequelize.authenticate();
	const user = sequelize.define("user", User);
	const enterprise = sequelize.define("enterprise", Enterprise);
	/**
 	* user *-1 enterprise
	*/
	user.belongsTo(enterprise, {
		foreignKey: {
			name: "user_uuid",
			type: DataTypes.UUID,
			allowNull: false,
		},
	});
	return sequelize;
}

export default sequelize;
