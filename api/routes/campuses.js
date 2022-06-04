/**
 * @module campuses
 * @author Maxence P. <maxence.pawlowski@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { authenticator } from "../middlewares/middlewares.js";
import { Logger } from "../../global/global.js";
import { Campus } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/campuses", route);

	/* ---- READ ------------------------------------ */
	/**
     * GET /v1/campuses/all
     * @summary Get all campuses
     * @security BearerAuth
     * @tags Campuses
     *
     * @param {string} brokilone.header.required - Auth header
     * @param {string} campusIDs.query - Campus IDs
     *
     * @return {SuccessResp} 200 - **Success**: the campuses are returned - application/json
     *
     * @example response - 200 - Success response
     * { "code": 200, "campuses": [
     *  { "campus_id": 1000,
	 *  "name": "Paris",
	 *  "address_street": "123 rue des phalempins",
	 *  "address_city": "France",
	 *  "address_postal_code": "75000" }
     * ]}
     */
	route.get("/all", authenticator, async (request, response) => {
		const filters = request.query;

		if (filters.campusIDs) {
			filters.campusIDs = filters.campusIDs.split(",").map(y => parseInt(y, 10));
		}

		const resp = await Campus.getAll(filters);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Fetch all campuses", { ip: request.clientIP, params: {code: resp.code, ...filters} });
	});

	/**
     * GET /v1/campuses/by-id/{campusID}
     * @summary Get a campus by its id
     * @security BearerAuth
     * @tags Campuses
     *
     * @param {string} brokilone.header.required - Auth header
     * @param {number} campusID.path.required - Campus id
     *
     * @return {SuccessResp} 200 - **Success**: the campus is returned - application/json
     *
     * @example response - 200 - Success response
     * { "code": 200,
	 * "name": "Paris",
	 * "address_street": "123 rue des phalempins",
	 * "address_city": "France",
	 * "address_postal_code": "75000" }
     */
	route.get("/by-id/:campusID", authenticator, async (request, response) => {
		const resp = await Campus.getByID(request.params.campusID);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves a campus by his ID", { ip: request.clientIP, params: {code: resp.code, campusID: request.params.campusID} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
