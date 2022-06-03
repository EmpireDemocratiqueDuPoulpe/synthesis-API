/**
 * @module planning
 * @author Maxence P. <maxence.pawlowski@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { authenticator } from "../middlewares/middlewares.js";
import { Logger, APIError } from "../../global/global.js";
import { Planning } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/planning", route);

	/* ---- READ ------------------------------------ */
	/**
	 * GET /v1/planning/all
	 * @summary Get all planning
	 * @security BearerAuth
	 * @tags Planning
	 *
	 * @param {string} brokilone.header.required - Auth header
	 * @param {string} years.query - Years
	 * @param {string} eventTypes.query - Event Types
	 * @param {string} campuses.query - Campus IDs
	 *
	 * @return {SuccessResp} 200 - **Success**: the plannings are returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "planning": [
	 *  { "year": 4, "event_name": "PROJ", "long_name": "Projet de fin d'année", "planning_id": 4,
	 *  "date": "16/05/2022", "consecutive_days": 3, "campus_id": 1001 }
	 * ]}
	 */
	route.get("/all", authenticator, async (request, response, next) => {
		if (await request.user.hasAllPermissions("READ_PLANNINGS")) {
			const filters = request.query;

			if (filters.years) filters.years = filters.years.split(",").map(y => parseInt(y, 10));
			if (filters.campuses) filters.campuses = filters.campuses.split(",").map(c => parseInt(c, 10));
			if (filters.eventTypes) filters.eventTypes = filters.eventTypes.split(",");

			const resp = await Planning.getAll(filters);
			response.status(resp.code).json(resp.toJSON());

			logger.log("Fetch all planning", { ip: request.clientIP, params: {code: resp.code, ...filters} });
		} else next(new APIError(403, "Permission denied: couldn't access this endpoint."));
	});

	/**
     * GET /v1/planning/by-id/{planningID}
     * @summary Get a planning by its id
     * @security BearerAuth
     * @tags Planning
     *
	   * @param {string} brokilone.header.required - Auth header
     * @param {number} planningID.path.required - Planning id
     *
     * @return {SuccessResp} 200 - **Success**: the planning is returned - application/json
     *
     * @example response - 200 - Success response
     * { "code": 200, "planning": {"planning_id": 1, "date": "16/05/2022", "consecutive_days": 3} }
     */
	route.get("/by-id/:planningID", authenticator, async (request, response, next) => {
		if (await request.user.hasAllPermissions("READ_PLANNINGS")) {
			const resp = await Planning.getByID(request.params.planningID);
			response.status(resp.code).json(resp.toJSON());

			logger.log("Retrieves a planning by his ID", { ip: request.clientIP, params: {code: resp.code, planningID: request.params.planningID} });
		} else next(new APIError(403, "Permission denied: couldn't access this endpoint."));
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
