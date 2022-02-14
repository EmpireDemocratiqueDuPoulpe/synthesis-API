/**
 * @module study
 * @author Louan L. <louan.leplae@supinfo.com>
 */

import sequelize from "../sequelizeLoader.js";
import { APIResp, APIError } from "../../global/global.js";

const { models } = sequelize;


/*****************************************************
  * Functions
  *****************************************************/


/*****************************************************
  * CRUD Methods
  *****************************************************/

/* ---- CREATE ---------------------------------- */

/* ---- READ ------------------------------------ */

/**
  * Get studies user by user id
  * @function
  * @async
  *
  * @param {number} userID
  * @throws {APIError}
  * @return {Promise<APIResp>}
  */
const getByUserID = async (userID) => {
	const study = await models.study.findOne({
		where: { user_id: userID },
	});

	if (!study) {
		throw new APIError(404, `Cet utilisateur (${userID}) n'a pas de parcours d'étude.`);
	}

	const studyJSON = study.toJSON();

	return new APIResp(200).setData({ study: studyJSON });
};


/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
  * Export
  *****************************************************/

const Study = {
	getByUserID, // READ
};
export default Study;

