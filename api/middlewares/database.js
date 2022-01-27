import pg from "pg";
import { APIError } from "../../global/global.js";
import { DB } from "../../config/config.js";

const pool = new pg.Pool({
	host: DB.host,
	port: DB.port,
	database: DB.name,
	user: DB.user,
	password: DB.password,
});

const database = async (request, response, next) => {
	try {
		request.db = await pool.connect();
		next();
	} catch (err) {
		throw new APIError(500, "Erreur interne du serveur. Veuillez réessayer plus tard où contacter le support.");
	}
};

export default database;
