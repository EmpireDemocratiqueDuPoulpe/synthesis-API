/**
 * @module students
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { authenticator } from "../middlewares/middlewares.js";
import { Logger, APIError } from "../../global/global.js";
import { User } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/students", route);

	/* ---- CREATE ---------------------------------- */
	/* ---- READ ------------------------------------ */
	/**
	 * GET /v1/students/all
	 * @summary Get all students
	 * @security BearerAuth
	 * @tags Users [Students]
	 *
	 * @param {string} brokilone.header.required - Auth header
	 * @param {string} campus.query - Filter by campus name (is an array)
	 * @param {string} onlyHired.query - Skips students without jobs (true/false)
	 * @param {string} expand.query - Fetch with associated data (campus, module, ects, job)?
	 *
	 * @return {SuccessResp} 200 - **Success**: the students are returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "students": [
	 *  {
	 *    "first_name": "Pony", "last_name": "Sparks", "birth_date": "4/16/1974", "email": "pony.sparks@psindustry.com",
	 *    "address": "Earth", "gender": "Pony", "region": "New York",
	 *    "position": { "position_id": 5, "name": "Étudiant", "permissions": {"READ_PLANNINGS": "READ_PLANNINGS"} },
	 *    "campus": {
	 *    	"campus_id": 2, "name": "Distanciel",
	 *    	"address_street": "streeeet", "address_city": "cityyyyyy", "address_postal_code": "coode"
	 *    },
	 *    "study":	{
	 *    	"study_id": 1, "entry_level": 1, "exit_level": null, "previous_level": 3, "current_level": 4,
	 *    	"entry_date": "28/08/2008", "exit_date": null
	 *    }
	 *  }
	 * ]}
	 */
	route.get("/all", authenticator, async (request, response, next) => {
		if (await request.user.hasAllPermissions("READ_STUDENTS")) {
			const filters = request.query;

			if (filters.expand) {
				filters.expand = filters.expand.split(",");
			}
			if (filters.campus) {
				filters.campus = filters.campus.split(",");
			}

			const resp = await User.getAllStudents(request.user, filters);
			response.status(resp.code).json(resp.toJSON());

			logger.log("Fetch all students", { ip: request.clientIP, params: {code: resp.code, ...filters} });
		} else next(new APIError(403, "Permission denied: couldn't access this endpoint."));
	});

	/**
	 * GET /v1/students/by-uuid/{UUID}
	 * @summary Get a student by its UUID
	 * @security BearerAuth
	 * @tags Users [Students]
	 *
	 * @param {string} brokilone.header.required - Auth header
	 * @param {string} UUID.path.required - UUIDv4
	 * @param {string} campus.query - Filter by campus name (is an array)
	 * @param {string} expand.query - Fetch with associated data (campus, module, ects, job)?
	 *
	 * @return {SuccessResp} 200 - **Success**: the student is returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "students": {
	 *    "first_name": "Pony", "last_name": "Sparks", "birth_date": "4/16/1974", "email": "pony.sparks@psindustry.com",
	 *    "address": "Earth", "gender": "Pony", "region": "New York",
	 *    "position": { "position_id": 6, "name": "Étudiant", "permissions": {"READ_PLANNINGS": "READ_PLANNINGS"} },
	 *    "campus": {
	 *    	"campus_id": 2, "name": "Distanciel",
	 *    	"address_street": "streeeet", "address_city": "cityyyyyy", "address_postal_code": "coode"
	 *    },
	 *    "study":	{
	 *    	"study_id": 1, "entry_level": 1, "exit_level": null, "previous_level": 3, "current_level": 4,
	 *    	"entry_date": "28/08/2008", "exit_date": null
	 *    }
	 *  }}
	 */
	route.get("/by-uuid/:UUID", authenticator, async (request, response, next) => {
		const { UUID } = request.params;

		if (request.user.uuid === UUID || await request.user.hasAllPermissions("READ_STUDENTS")) {
			const filters = request.query;

			if (filters.expand) {
				filters.expand = filters.expand.split(",");
			}
			if (filters.campus) {
				filters.campus = filters.campus.split(",");
			}

			const resp = await User.getStudentByUUID(request.user, UUID, filters);
			response.status(resp.code).json(resp.toJSON());

			logger.log("Fetch a student by its UUID", { ip: request.clientIP, params: {code: resp.code, UUID: request.params.UUID, ...filters} });
		} else next(new APIError(403, "Permission denied: couldn't access this endpoint."));
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
