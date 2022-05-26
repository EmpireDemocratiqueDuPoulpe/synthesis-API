/**
 * @module modulePlanning
 * @author Maxence P. <maxence.pawlowski@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { Logger } from "../../global/global.js";
import {ModulePlanning} from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/modules/planning", route);

	/* ---- READ ------------------------------------ */
	/**
	 * GET /v1/modules/planning/all
	 * @summary Get all modules planning
	 * @security BearerAuth
	 * @tags Modules planning
	 *
	 * @param {string} year.query - Year
	 *
	 * @return {SuccessResp} 200 - **Success**: the modules planning are returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "modulesPlanning": [
	 *  { "module_id": 1, "year": 4, "name": "PROJ", "long_name": "Projet de fin d'année", "planning_id": 4,
	 *  "date": "16/05/2022", "consecutive_days": 3, "campus_id": 1001 }
	 * ]}
	 */
	route.get("/all", async (request, response) => {
		const filters = request.query;

		const resp = await ModulePlanning.getAll(filters);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Fetch all modules planning", { ip: request.clientIP, params: {code: resp.code, ...filters} });
	});

	/**
     * GET /v1/modules/planning/by-id/{planningID}
     * @summary Get a module planning by its id
     * @security BearerAuth
     * @tags Module planning
     *
     * @param {number} planningID.path.required - Planning id
     *
     * @return {SuccessResp} 200 - **Success**: the planning is returned - application/json
     *
     * @example response - 200 - Success response
     * { "code": 200, "modulePlanning": {"planning_id": 1, "date": "16/05/2022", "consecutive_days": 3} }
     */
	route.get("/by-id/:planningID", async (request, response) => {
		const resp = await ModulePlanning.getByID(request.params.planningID);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves a module planning by his ID", { ip: request.clientIP, params: {code: resp.code, planningID: request.params.planningID} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
