/**
 * @module api
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { Router } from "express";
import requestIP from "request-ip";
import { modules, users, studies, notes } from "./routes/routes.js";
import { endHandler, errorHandler } from "./middlewares/middlewares.js";

export default () => {
	const router = Router();

	// Middlewares
	router.use(endHandler);
	router.use(requestIP.mw({ attributeName: "clientIP" }));

	// Routes
	modules(router);
	notes(router);
	users(router);
	studies(router);

	// Middlewares for errors
	router.use(errorHandler.expressLogger);
	router.use(errorHandler.errorForwarder);
	router.use(errorHandler.failSafe);

	return router;
};
