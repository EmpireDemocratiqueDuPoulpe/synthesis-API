/**
 * @module User
 * @category API
 * @subcategory Interfaces
 * @author Louan L. <louan.leplae@supinfo.com>
 */


import { APIResp } from "../../global/global.js";
import sequelize from "../sequelizeLoader.js";

/**
 * Sequelize models
 * @const
 * @name models
 * @type {Object<Sequelize.models>}
 */
const { models } = sequelize;


/*****************************************************
 * CRUD Methods - Students
 *****************************************************/

/* ---- READ ------------------------------------ */
/**
 * Get all positions
 * @function
 * @async
 *
 * @return {Promise<APIResp>}
 */
const getAllPositions = async () => {
	const positions = await models.position.findAll();

	return new APIResp(200).setData({ positions });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */


const Position = {
	/* READ */ getAllPositions,
};
export default Position;
