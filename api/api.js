import { Router } from "express";
import requestIP from "request-ip";
import { demoRoute } from "./routes/routes.js";
import { endHandler, errorHandler } from "./middlewares/middlewares.js";

export default () => {
	const router = Router();

	router.use(endHandler);
	router.use(requestIP.mw({ attributeName: "clientIP" }));

	demoRoute(router);

	router.use(errorHandler.expressLogger);
	router.use(errorHandler.errorForwarder);
	router.use(errorHandler.failSafe);

	return router;
};
