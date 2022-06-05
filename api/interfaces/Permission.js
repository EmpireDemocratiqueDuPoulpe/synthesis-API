/**
 * @module Permission
 * @category API
 * @subcategory Interfaces
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { isEmpty } from "lodash-es";
import sequelize from "../sequelizeLoader.js";
import { buildPermissions } from "./User.js";
import { APIResp, APIError } from "../../global/global.js";

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

/**
 * Get all permission of a user by its UUID
 * @function
 * @async
 *
 * @param {string} uuid
 * @return {Promise<APIResp>}
 */
const getByUUID = async (uuid) => {
	const user = await models.user.findOne({
		include: [{
			model: models.position,
			as: "position",
			required: true,
			include: [{
				model: models.permission,
				as: "permissions",
				required: false,
			}],
		}],
		where: { uuid },
	});

	if (!user) {
		throw new APIError(404, `Cet utilisateur (${uuid}) n'existe pas.`);
	}

	const flattenUser = buildPermissions(user);
	return new APIResp(200).setData({ permissions: flattenUser.position.permissions });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const Permission = {
	getAll, getByUUID,	// READ
};
export default Permission;
