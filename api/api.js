import { Router } from "express";
import requestIP from "request-ip";
import { users } from "./routes/routes.js";
import { endHandler, errorHandler } from "./middlewares/middlewares.js";

export default () => {
	const router = Router();
	// Middlewares
	router.use(endHandler);
	router.use(requestIP.mw({ attributeName: "clientIP" }));

	// Routes
	users(router);

	// Middlewares for errors
	router.use(errorHandler.expressLogger);
	router.use(errorHandler.errorForwarder);
	router.use(errorHandler.failSafe);

	return router;
};
