/**
 * @module api
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { Router } from "express";
import requestIP from "request-ip";
import { absences, comptas, jobs, modules, notes, permissions, studies, users } from "./routes/routes.js";
import { tokenAssembler, endHandler, errorHandler } from "./middlewares/middlewares.js";

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
	studies(router);
	users(router);

	// Middlewares for errors
	router.use(errorHandler.expressLogger);
	router.use(errorHandler.errorForwarder);
	router.use(errorHandler.failSafe);

	return router;
};
