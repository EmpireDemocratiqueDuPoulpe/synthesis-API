/**
 * @module absences
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { authenticator } from "../middlewares/middlewares.js";
import { Logger, APIError } from "../../global/global.js";
import {Absence} from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/absences", route);

	/* ---- CREATE ---------------------------------- */
	/**
	 * POST /v1/absences
	 * @summary Add an absence to a user
	 * @security BearerAuth
	 * @tags Absences
	 *
	 * @param {string} brokilone.header.required - Auth header
	 * @param {NewAbsence} request.body.required - Absence info - application/json
	 *
	 * @return {SuccessResp} 200 - **Success**: the absence is added - application/json
	 * @return {ErrorResp} 400 - **Bad request**: the provided data is invalid - application/json
	 *
	 * @example request - Add absence to user with 2 as user_id
	 * { "absence": {"user_id": 2, "start_date": "3/21/2022", "end_date": "3/22/2022"} }
	 * @example response - 200 - Success response
	 * { "code": 200, "absenceID": 3 }
	 * @example response - 400 - Bad request response
	 * { "code": 400, "error": "Aucun utilisateur ne correspond à ce user_id (2)", "fields": null }
	 */
	route.post("/", authenticator, async (request, response, next) => {
		if (await request.user.hasAllPermissions("MANAGE_ABSENCES")) {
			const { absence } = request.body;

			const resp = await Absence.add(absence);
			response.status(resp.code).json(resp.toJSON());

			logger.log("Add a new absence to a user", { ip: request.clientIP, params: {code: resp.code, user_id: absence?.user_id} });
		} else next(new APIError(403, "Permission denied: couldn't access this endpoint."));
	});

	/* ---- READ ------------------------------------ */
	/**
	 * GET /v1/absences/all
	 * @summary Get all absences
	 * @security BearerAuth
	 * @tags Absences
	 *
	 * @param {string} brokilone.header.required - Auth header
	 * @param {string} years.query - Years
	 * @param {string} userIDs.query - User IDs
	 * @param {string} campusIDs.query - Campus IDs
	 *
	 * @return {SuccessResp} 200 - **Success**: the absences are returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "absences": [
	 *  { "absence_id": 1, "start_date": "2022-03-20T23:00:00.000Z", "end_date": "2022-03-21T23:00:00.000Z", "user_id": 2 }
	 * ]}
	 */
	route.get("/all", authenticator, async (request, response, next) => {
		const filters = request.query;
		const canManageAbsences = await request.user.hasAllPermissions("MANAGE_ABSENCES");

		if (filters.years) filters.years = filters.years.split(",").map(y => parseInt(y, 10));
		if (filters.campusIDs) filters.campusIDs = filters.campusIDs.split(",").map(c => parseInt(c, 10));
		if (filters.userIDs) {
			filters.userIDs = (canManageAbsences ? filters.userIDs.split(",").map(u => parseInt(u, 10)) : [request.user.userID]);
		}

		if (filters.userIDs.some(userID => userID === request.user.userID) || canManageAbsences) {
			const resp = await Absence.getAll(filters);
			response.status(resp.code).json(resp.toJSON());
			logger.log("Fetch all absences", { ip: request.clientIP, params: {code: resp.code, ...filters} });
		} else next(new APIError(403, "Permission denied: couldn't access this endpoint."));
	});
	/**
	 * GET /v1/absences/by-user-id/{userID}
	 * @summary Get all absences of a user
	 * @security BearerAuth
	 * @tags Absences
	 *
	 * @param {string} brokilone.header.required - Auth header
	 * @param {number} userID.path.required - User id
	 *
	 * @return {SuccessResp} 200 - **Success**: the absences are returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "absences": [
	 *  { "absence_id": 1, "start_date": "2022-03-20T23:00:00.000Z", "end_date": "2022-03-21T23:00:00.000Z", "user_id": 2 }
	 * ]}
	 */
	route.get("/by-user-id/:userID", authenticator, async (request, response, next) => {
		if (await request.user.hasAllPermissions("MANAGE_ABSENCES")) {
			const resp = await Absence.getByUserID(request.params.userID);
			response.status(resp.code).json(resp.toJSON());

			logger.log("Retrieves all absences of a user", { ip: request.clientIP, params: {code: resp.code, userID: request.params.userID} });
		} else next(new APIError(403, "Permission denied: couldn't access this endpoint."));
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
