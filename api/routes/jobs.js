/**
 * @module jobs
 * @author Louan L. <louan.leplae@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { authenticator } from "../middlewares/middlewares.js";
import { Logger, APIError } from "../../global/global.js";
import { Job } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/jobs", route);

	/* ---- CREATE ---------------------------------- */
	/* ---- READ ------------------------------------ */
	/**
	 * GET /v1/jobs/all-by-user-id/{userID}
	 * @summary Get all jobs of a user
	 * @security BearerAuth
	 * @tags Jobs
	 *
	 * @param {string} brokilone.header.required - Auth header
	 * @param {number} userID.path.required - User id
	 *
	 * @return {SuccessResp} 200 - **Success**: the jobs are returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "jobs": [
	 *  {
	 *    "job_id": 2, "job_type": "alternance", "start_date": "3/21/2022", "end_date": "3/22/2022",
	 *    "company_name": "KFC", "is_hired": false, "length_month_hired": 0
	 *  }
	 * ]}
	 */
	route.get("/all-by-user-id/:userID", authenticator, async (request, response, next) => {
		if (await request.user.hasAllPermissions("READ_STUDENTS_JOBS")) {
			const resp = await Job.getAllByUserID(request.params.userID);
			response.status(resp.code).json(resp.toJSON());

			logger.log("Retrieves a user by his user ID", { ip: request.clientIP, params: {code: resp.code, userID: request.params.userID} });
		} else next(new APIError(403, "Permission denied: couldn't access this endpoint."));
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};

