/**
 * @module notes
 * @author Maxence P. <maxence.pawlowski@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { Logger } from "../../global/global.js";
import { Note } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/notes", route);

	/* ---- CREATE ---------------------------------- */
	route.post("/", async (request, response) => {
		const { note } = request.body;

		const resp = await Note.add(note);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Add a new note", { ip: request.clientIP, params: {code: resp.code} });
	});

	/* ---- READ ------------------------------------ */
	route.get("/by-id/:noteID", async (request, response) => {
		const resp = await Note.getByID(request.params.noteID);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves a note by his ID", { ip: request.clientIP, params: {code: resp.code, noteID: request.params.noteID} });
	});

	route.get("/by-user-id/:userID", async (request, response) => {
		const resp = await Note.getByUserID(request.params.userID);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves all notes of a user", { ip: request.clientIP, params: {code: resp.code, noteID: request.params.noteID} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
