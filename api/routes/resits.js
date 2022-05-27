/**
 * @module resits
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { Logger } from "../../global/global.js";
import { User } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/resits", route);

	/* ---- CREATE ---------------------------------- */
	/* ---- READ ------------------------------------ */
	/**
	 * GET /v1/resits/students
	 * @summary Get all students at resits
	 * @security BearerAuth
	 * @tags Resits
	 *
	 * @param {string} campus.query - Filter by campus name
	 * @param {string} expand.query - Fetch with associated data (campus)?
	 *
	 * @return {SuccessResp} 200 - **Success**: the students at resits are returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "students": [
	 *     {
	 *       "user_id": 2, "uuid": "fde0de2a-148d-4fb5-ab6c-d25d314102b4", "first_name": "Jay",
	 *       "last_name": "Raté Mon Année À L'Aide", "birth_date": "2002-06-24T00:00:00.000Z",
	 *       "email": "jay.rate@forni.te", "street_address": null, "gender": "homme", "region": "France",
	 *       "campus_id": 1001, "position_id": 6,
	 *       "position": { "position_id": 6, "name": "Étudiant" },
	 *       "study": {
	 *         "study_id": 1000, "entry_level": 1, "exit_level": 5, "previous_level": 3, "current_level": 4,
	 *         "entry_date": "2022-06-01T02:11:05.000Z", "exit_date": "2022-06-01T02:11:05.000Z", "user_id": 2
	 *       },
	 *       "modules": [
	 *         {
	 *           "module_id": 1004, "year": 4, "name": "PYTH", "long_name": null, "ects": 4,
	 *           "userModules": { "user_id": 2, "module_id": 1004 },
	 *           "notes": [ {"note_id": 5, "note": 8, "module_id": 1004, "user_id": 2} ]
	 *         }
	 *       ]
	 *     }
	 *   ]}
	 */
	route.get("/students", async (request, response) => {
		const filters = request.query;

		if (filters.expand) {
			filters.expand = filters.expand.split(",");
		}

		const resp = await User.getStudentsAtResit(filters);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves all students at resit", { ip: request.clientIP, params: {code: resp.code, ...filters} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
