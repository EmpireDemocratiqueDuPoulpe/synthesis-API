/**
 * @module absences
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { Logger } from "../../global/global.js";
import { Absence } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/absences", route);

	/* ---- CREATE ---------------------------------- */
	route.post("/", async (request, response) => {
		const { absence } = request.body;

		const resp = await Absence.add(absence);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Add a new absence to a user", { ip: request.clientIP, params: {code: resp.code, user_id: absence?.user_id} });
	});

	/* ---- READ ------------------------------------ */
	route.get("/by-user-id/:userID", async (request, response) => {
		const resp = await Absence.getByUserID(request.params.userID);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves all absences of a user", { ip: request.clientIP, params: {code: resp.code, userID: request.params.userID} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
