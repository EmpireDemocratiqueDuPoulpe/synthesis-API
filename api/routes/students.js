/**
 * @module students
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { Logger } from "../../global/global.js";
import { User } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/students", route);

	/* ---- CREATE ---------------------------------- */
	/* ---- READ ------------------------------------ */
	/**
	 * GET /v1/students/all
	 * @summary Get all student
	 * @security BearerAuth
	 * @tags Students
	 *
	 * @param {number} campus.query - Filter by campus name
	 *
	 * @return {SuccessResp} 200 - **Success**: the students are returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "students": [
	 *  {
	 *    "first_name": "Pony", "last_name": "Sparks", "birth_date": "4/16/1974", "email": "pony.sparks@psindustry.com",
	 *    "address": "Earth", "gender": "Pony", "region": "New York", "campus": "Distanciel",
	 *    "position": { "position_id": 5, "name": "Étudiant", "permissions": {"READ_PLANNINGS": "READ_PLANNINGS"} }
	 *  }
	 * ]}
	 */
	route.get("/all", async (request, response) => {
		const resp = await User.getAllStudents();
		response.status(resp.code).json(resp.toJSON());

		logger.log("Fetch all students", { ip: request.clientIP, params: {code: resp.code} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
