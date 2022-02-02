import { APIResp, APIError } from "../../global/global.js";
import sequelize from "../sequelizeLoader.js";

const { models } = sequelize;

/*****************************************************
 * Functions
 *****************************************************/

/*****************************************************
 * CRUD Methods
 *****************************************************/

/* ---- CREATE ---------------------------------- */
/* ---- READ ------------------------------------ */
const get = async (params) => {
	const users = await models.User.findAll();

	if (!users.length) {
		throw new APIError(404, "Y'a rien en fait");
	}

	return new APIResp(200).setData({ users });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const User = { get };
export default User;
