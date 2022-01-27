import AsyncRouter from "express-promise-router"
import { database } from "../middlewares/middlewares.js";
import { Logger } from "../../global/global.js";
import { Demo } from "../models/models.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/demo/route", route);

	/* ---- CREATE ---------------------------------- */
	/* ---- READ ------------------------------------ */
	route.get("/", database, async (request, response) => {
		const resp = await Demo.get(request.db, request.query);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Reach demo route", { ip: request.clientIP, params: {code: resp.code, ...request.query} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};