import AsyncRouter from "express-promise-router";
//import { database } from "../middlewares/middlewares.js";
import { Logger } from "../../global/global.js";
import { User } from "../models/models.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/user", route);

	/* ---- CREATE ---------------------------------- */
	/* ---- READ ------------------------------------ */
	route.get("/", async (request, response) => {
		const resp = await User.get(request.query);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Request user", { ip: request.clientIP, params: {code: resp.code, ...request.query} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
