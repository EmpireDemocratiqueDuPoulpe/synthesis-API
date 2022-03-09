/**
 * @module Permission
 * @category API
 * @subcategory Interfaces
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import sequelize from "../sequelizeLoader.js";
import { APIResp } from "../../global/global.js";
import { isEmpty } from "lodash-es";

/**
 * Sequelize models
 * @const
 * @name models
 * @type {Object<Sequelize.models>}
 */
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
 * Get all available permissions
 * @function
 * @async
 *
 * @return {Promise<APIResp>}
 */
const getAll = async () => {
	const permissions = await models.permission.findAll();
	const permsAsObj = {};

	permissions.forEach((p) => {
		permsAsObj[p.name] = !isEmpty(p.name_localized) ? p.name_localized : p.name;
	});

	return new APIResp(200).setData({ permissions: permsAsObj });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const Permission = {
	getAll,	// READ
};
export default Permission;
