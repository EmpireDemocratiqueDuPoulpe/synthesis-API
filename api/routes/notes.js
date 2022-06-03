/**
 * @module notes
 * @author Maxence P. <maxence.pawlowski@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { authenticator } from "../middlewares/middlewares.js";
import { Logger, APIError } from "../../global/global.js";
import { Note } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/notes", route);

	/* ---- CREATE ---------------------------------- */
	/**
	 * POST /v1/notes
	 * @summary Add a note to a user
	 * @security BearerAuth
	 * @tags Notes
	 *
	 * @param {string} brokilone.header.required - Auth header
	 * @param {NewNote} request.body.required - Note info - application/json
	 *
	 * @return {SuccessResp} 200 - **Success**: the note is added - application/json
	 * @return {ErrorResp} 400 - **Bad request**: the provided data is invalid - application/json
	 *
	 * @example request - Add note to user with 2 as user_id
	 * { "note": {"user_id": 2, "module_id": 1, "note": 9.95} }
	 * @example response - 200 - Success response
	 * { "code": 200, "noteID": 1 }
	 * @example response - 400 - Bad request response
	 * { "code": 400, "error": "Aucun module ne correspond à ce module_id (1).", "fields": null }
	 */
	route.post("/", authenticator, async (request, response, next) => {
		if (await request.user.hasAllPermissions("EDIT_NOTES")) {
			const { note } = request.body;

			const resp = await Note.add(note);
			response.status(resp.code).json(resp.toJSON());

			logger.log("Add a new note", { ip: request.clientIP, params: {code: resp.code} });
		} else next(new APIError(403, "Permission denied: couldn't access this endpoint."));
	});

	/* ---- READ ------------------------------------ */
	/**
	 * GET /v1/notes/by-id/{noteID}
	 * @summary Get a note by its id
	 * @security BearerAuth
	 * @tags Notes
	 *
	 * @param {string} brokilone.header.required - Auth header
	 * @param {number} noteID.path.required - Note id
	 *
	 * @return {SuccessResp} 200 - **Success**: the note is returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "note": {"note_id": 1, "note": 9.95} }
	 */
	route.get("/by-id/:noteID", authenticator, async (request, response, next) => {
		if (await request.user.hasAllPermissions("READ_NOTES")) {
			const resp = await Note.getByID(request.params.noteID);
			response.status(resp.code).json(resp.toJSON());

			logger.log("Retrieves a note by his ID", { ip: request.clientIP, params: {code: resp.code, noteID: request.params.noteID} });
		} else next(new APIError(403, "Permission denied: couldn't access this endpoint."));
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
