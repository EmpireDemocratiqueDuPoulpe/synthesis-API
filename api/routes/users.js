import AsyncRouter from "express-promise-router";
import { Logger } from "../../global/global.js";
import { User } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/users", route);

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
