/**
 * @module api
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { Router } from "express";
import requestIP from "request-ip";
import { absences, modules, users, studies } from "./routes/routes.js";
import { endHandler, errorHandler } from "./middlewares/middlewares.js";

export default () => {
	const router = Router();

	// Middlewares
	router.use(endHandler);
	router.use(requestIP.mw({ attributeName: "clientIP" }));

	// Routes
	absences(router);
	modules(router);
	users(router);
	studies(router);

	// Middlewares for errors
	router.use(errorHandler.expressLogger);
	router.use(errorHandler.errorForwarder);
	router.use(errorHandler.failSafe);

	return router;
};
