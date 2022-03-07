/**
 * @module absences
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { Logger } from "../../global/global.js";
import { Permission } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/permissions", route);

	/* ---- READ ------------------------------------ */
	route.get("/all", async (request, response) => {
		const resp = await Permission.getAll();
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves all available permissions", { ip: request.clientIP, params: {code: resp.code} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
