/**
 * @module api
 * @category API
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { Router } from "express";
import requestIP from "request-ip";
import { absences, comptas, jobs, modules, notes, permissions, students, studies, users } from "./routes/routes.js";
import { tokenAssembler, endHandler, errorHandler } from "./middlewares/middlewares.js";

/**
 * @typedef {Object} SuccessResp
 *
 * @property {number} code - HTTP status code
 * @property {string} [message] - Optional message
 * @property {*} [keyName] - Response data
 */

/**
 * @typedef {Object} ErrorResp
 *
 * @property {number} code - HTTP status code
 * @property {string} error - Error message
 * @property {Array<string>} [fields] - Fields name related to the error
 */

/**
 * Builds the master router
 * @return {e.Router}
 */
export default () => {
	const router = Router();

	// Middlewares
	router.use(endHandler);
	router.use(requestIP.mw({ attributeName: "clientIP" }));
	router.use(tokenAssembler);

	// Routes
	absences(router);
	comptas(router);
	jobs(router);
	modules(router);
	notes(router);
	permissions(router);
	students(router);
	studies(router);
	users(router);

	// Middlewares for errors
	router.use(errorHandler.expressLogger);
	router.use(errorHandler.errorForwarder);
	router.use(errorHandler.failSafe);

	return router;
};
