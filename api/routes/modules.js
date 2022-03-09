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
	/**
	 * POST /v1/modules
	 * @summary Add a module
	 * @security BearerAuth
	 * @tags Modules
	 *
	 * @param {NewModule} request.body.required - Module info - application/json
	 *
	 * @return {SuccessResp} 200 - **Success**: the module is added - application/json
	 * @return {ErrorResp} 400 - **Bad request**: the provided data is invalid - application/json
	 *
	 * @example request - Add module
	 * { "module": {"year": 4, "name": "PROJ", "long_name": "Projet de fin d'année", "ects": 4} }
	 * @example response - 200 - Success response
	 * { "code": 200, "moduleID": 1 }
	 * @example response - 400 - Bad request response
	 * { "code": 400, "error": "L'année du module ne peux excéder 5.", "fields": ["year"] }
	 */
	route.post("/", async (request, response) => {
		const { module } = request.body;

		const resp = await Module.add(module);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Add a new module", { ip: request.clientIP, params: {code: resp.code} });
	});

	/* ---- READ ------------------------------------ */
	/**
	 * GET /v1/modules/all
	 * @summary Get all modules
	 * @security BearerAuth
	 * @tags Modules
	 *
	 * @return {SuccessResp} 200 - **Success**: the modules are returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "modules": [
	 *  { "module_id": 1, "year": "4", "name": "PROJ", "long_name": "Projet de fin d'année", "ects": 4 }
	 * ]}
	 */
	route.get("/all", async (request, response) => {
		const resp = await Module.getAll();
		response.status(resp.code).json(resp.toJSON());

		logger.log("Fetch all modules", { ip: request.clientIP, params: {code: resp.code} });
	});

	/**
	 * GET /v1/modules/by-id/{moduleID}
	 * @summary Get a module by its id
	 * @security BearerAuth
	 * @tags Modules
	 *
	 * @param {number} moduleID.path.required - Module id
	 *
	 * @return {SuccessResp} 200 - **Success**: the module is returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "module": {"module_id": 1, "year": "4", "name": "PROJ", "long_name": "Projet de fin d'année", "ects": 4} }
	 */
	route.get("/by-id/:moduleID", async (request, response) => {
		const resp = await Module.getByID(request.params.moduleID);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves a module by his ID", { ip: request.clientIP, params: {code: resp.code, moduleID: request.params.moduleID} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
