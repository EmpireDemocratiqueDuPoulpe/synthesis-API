/**
 * @module planning
 * @author Maxence P. <maxence.pawlowski@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { Logger } from "../../global/global.js";
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
	 * @param {string} year.query - Year
	 * @param {string} eventType.query - Event Type
	 *
	 * @return {SuccessResp} 200 - **Success**: the plannings are returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "planning": [
	 *  { "year": 4, "event_name": "PROJ", "long_name": "Projet de fin d'année", "planning_id": 4,
	 *  "date": "16/05/2022", "consecutive_days": 3, "campus_id": 1001 }
	 * ]}
	 */
	route.get("/all", async (request, response) => {
		const filters = request.query;

		const resp = await Planning.getAll(filters);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Fetch all planning", { ip: request.clientIP, params: {code: resp.code, ...filters} });
	});

	/**
     * GET /v1/planning/by-id/{planningID}
     * @summary Get a planning by its id
     * @security BearerAuth
     * @tags Module planning
     *
     * @param {number} planningID.path.required - Planning id
     *
     * @return {SuccessResp} 200 - **Success**: the planning is returned - application/json
     *
     * @example response - 200 - Success response
     * { "code": 200, "planning": {"planning_id": 1, "date": "16/05/2022", "consecutive_days": 3} }
     */
	route.get("/by-id/:planningID", async (request, response) => {
		const resp = await Planning.getByID(request.params.planningID);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves a planning by his ID", { ip: request.clientIP, params: {code: resp.code, planningID: request.params.planningID} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
