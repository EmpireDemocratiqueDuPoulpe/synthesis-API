/**
 * @module studies
 * @author Louan L. <louan.leplae@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { authenticator } from "../middlewares/middlewares.js";
import { Logger, APIError } from "../../global/global.js";
import { Study } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/studies", route);

	/* ---- CREATE ---------------------------------- */
	/* ---- READ ------------------------------------ */
	/**
	 * GET /v1/studies/by-user-id/{userID}
	 * @summary Get a study of a user
	 * @security BearerAuth
	 * @tags Studies
	 *
	 * @param {string} brokilone.header.required - Auth header
	 * @param {number} userID.path.required - User id
	 *
	 * @return {SuccessResp} 200 - **Success**: the study is returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "study": {
	 *  "study_id": 1, "entry_level": 1, "exit_level": null, "previous_level": 3, "current_level": 4,
	 *  "entry_date": "8/01/2018", "exit_date": "6/30/2023"
	 * }}
	 */
	route.get("/by-user-id/:userID", authenticator, async (request, response, next) => {
		if (await request.user.hasAllPermissions("READ_STUDENTS")) {
			const resp = await Study.getByUserID(request.params.userID);
			response.status(resp.code).json(resp.toJSON());

			logger.log("Retrieves a user by his user ID", { ip: request.clientIP, params: {code: resp.code, userID: request.params.userID} });
		} else next(new APIError(403, "Permission denied: couldn't access this endpoint."));
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};

