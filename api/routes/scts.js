/**
 * @module scts
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { Logger } from "../../global/global.js";
import { User } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/scts", route);

	/* ---- CREATE ---------------------------------- */
	/* ---- READ ------------------------------------ */
	/**
	 * GET /v1/scts/all
	 * @summary Get all SCTs
	 * @security BearerAuth
	 * @tags Users [SCTs]
	 *
	 * @param {string} campus.query - Filter by campus name
	 * @param {string} expand.query - Fetch with associated data (campus, module)?
	 *
	 * @return {SuccessResp} 200 - **Success**: the scts are returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "scts": [
	 *  {
	 *    "first_name": "Gorge W.", "last_name": "Bouche", "birth_date": "7/06/1946", "email": "gorge.w@bouc.he",
	 *    "address": "États-Unis du Corps", "gender": "homme", "region": "Maestro Secret Room",
	 *    "position": { "position_id": 5, "name": "Intervenant", "permissions": {} }
	 *  }
	 * ]}
	 */
	route.get("/all", async (request, response) => {
		const filters = request.query;

		if (filters.expand) {
			filters.expand = filters.expand.split(",");
		}

		const resp = await User.getAllSCTs(filters);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Fetch all SCTs", { ip: request.clientIP, params: {code: resp.code, ...filters} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
