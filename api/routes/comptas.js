/**
 * @module comptas
 * @author Maxence P. <maxence.pawlowski@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { Logger } from "../../global/global.js";
import { Compta } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/comptas", route);

	/* ---- CREATE ---------------------------------- */
	route.post("/", async (request, response) => {
		const { compta } = request.body;

		const resp = await Compta.add(compta);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Add a new compta", { ip: request.clientIP, params: {code: resp.code} });
	});

	/* ---- READ ------------------------------------ */
	route.get("/by-id/:comptaID", async (request, response) => {
		const resp = await Compta.getByID(request.params.comptaID);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves a compta by its ID", { ip: request.clientIP, params: {code: resp.code, comptaID: request.params.comptaID} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
