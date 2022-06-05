/**
 * @module permissions
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { authenticator } from "../middlewares/middlewares.js";
import { Logger } from "../../global/global.js";
import { Permission } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/permissions", route);

	/* ---- READ ------------------------------------ */
	/**
	 * GET /v1/permissions/all
	 * @summary Get all permissions
	 * @security BearerAuth
	 * @tags Permissions
	 *
	 * @param {string} brokilone.header.required - Auth header
	 *
	 * @return {SuccessResp} 200 - **Success**: the permissions are returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "permissions": [
	 *  { "permission_id": 1, "name": "READ_PLANNINGS", "name_localized": "Voir les plannings" },
	 *  { "permission_id": 2, "name": "READ_NOTES", "name_localized": "Voir les notes" }
	 * ]}
	 */
	route.get("/all", authenticator, async (request, response) => {
		const resp = await Permission.getAll();
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves all available permissions", { ip: request.clientIP, params: {code: resp.code} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
