/**
 * @module jobs
 * @author Louan L. <louan.leplae@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { Logger } from "../../global/global.js";
import { Job } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/jobs", route);

	/* ---- CREATE ---------------------------------- */

	/* ---- READ ------------------------------------ */
	route.get("/all-by-user-id/:userID", async (request, response) => {
		const resp = await Job.getAllByUserID(request.params.userID);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves a user by his user ID", { ip: request.clientIP, params: {code: resp.code, userID: request.params.userID} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};

