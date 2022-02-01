import { APIResp, APIError } from "../../global/global.js";
import sequelize from "../middlewares/database.js";

/*****************************************************
 * Functions
 *****************************************************/

/*****************************************************
 * CRUD Methods
 *****************************************************/

/* ---- CREATE ---------------------------------- */
/* ---- READ ------------------------------------ */
const get = async (params) => {
	const demo = await sequelize.findAll();

	if (!demo.rows.length) {
		throw new APIError(404, "Y'a rien en fait");
	}

	return new APIResp(200).setData({ demo: demo.rows });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const User = { get };
export default User;
