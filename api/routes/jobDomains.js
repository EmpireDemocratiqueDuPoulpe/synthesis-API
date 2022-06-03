/**
 * @module jobDomain
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { Logger } from "../../global/global.js";
import { JobDomain } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/jobs/domains", route);

	/* ---- READ ------------------------------------ */
	/**
	 * GET /v1/jobs/domains/all
	 * @summary Get all job domains
	 * @security BearerAuth
	 * @tags JobDomains
	 *
	 * @param {string} brokilone.header.required - Auth header
	 *
	 * @return {SuccessResp} 200 - **Success**: the job domains are returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "jobDomain": [
	 *  { "job_domain_id": 1, "name": "Système" },
	 *  { "job_domain_id": 2, "name": "Réseaux" }
	 * ]}
	 */
	route.get("/all", async (request, response) => {
		const resp = await JobDomain.getAll();
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves all job domains", { ip: request.clientIP, params: {code: resp.code} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
