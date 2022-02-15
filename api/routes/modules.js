/**
 * @module modules
 * @author Maxence P. <maxence.pawlowski@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { Logger } from "../../global/global.js";
import { Module } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/modules", route);

	/* ---- CREATE ---------------------------------- */
	route.post("/", async (request, response) => {
		const { module } = request.body;

		const resp = await Module.add(module);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Add a new module", { ip: request.clientIP, params: {code: resp.code} });
	});

	/* ---- READ ------------------------------------ */
	route.get("/all", async (request, response) => {
		const resp = await Module.getAll();
		response.status(resp.code).json(resp.toJSON());

		logger.log("Fetch all modules", { ip: request.clientIP, params: {code: resp.code} });
	});

	route.get("/by-id/:moduleID", async (request, response) => {
		const resp = await Module.getByID(request.params.moduleID);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves a module by his ID", { ip: request.clientIP, params: {code: resp.code, moduleID: request.params.moduleID} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
