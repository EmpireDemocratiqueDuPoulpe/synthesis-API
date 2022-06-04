/**
 * @module api
 * @category API
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { Router } from "express";
import {
	absences,
	comptas,
	campuses,
	jobs, jobDomains, jobOffers,
	modules, modulePlanning, notes,
	permissions,
	resits,
	users, scts, students,
	studies,
} from "./routes/routes.js";
import { tokenAssembler } from "./middlewares/middlewares.js";

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
	router.use(tokenAssembler);

	// Routes
	absences(router);
	comptas(router);
	campuses(router);
	jobs(router);
	jobDomains(router);
	jobOffers(router);
	modules(router);
	modulePlanning(router);
	notes(router);
	permissions(router);
	resits(router);
	scts(router);
	students(router);
	studies(router);
	users(router);

	return router;
};
