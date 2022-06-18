/**
 * @module User
 * @category API
 * @subcategory Interfaces
 * @author Louan L. <louan.leplae@supinfo.com>
 */

import sequelize from "../sequelizeLoader.js";
import { APIResp } from "../../global/global.js";

/**
 * Sequelize models
 * @const
 * @name models
 * @type {Object<Sequelize.models>}
 */
const { models } = sequelize;


/*****************************************************
 * CRUD Methods
 *****************************************************/

/* ---- READ ------------------------------------ */
/**
 * Get all positions
 * @function
 * @async
 *
 * @return {Promise<APIResp>}
 */
const getAll = async () => {
	const positions = await models.position.findAll();
	return new APIResp(200).setData({ positions });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

const Position = {
	/* READ */ getAll,
};
export default Position;
