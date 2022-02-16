/**
 * @module users
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { Logger } from "../../global/global.js";
import { User } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/users", route);

	/* ---- CREATE ---------------------------------- */
	route.post("/", async (request, response) => {
		const { user } = request.body;

		const resp = await User.add(user);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Add a new user", { ip: request.clientIP, params: {code: resp.code, email: user?.email} });
	});

	/* ---- READ ------------------------------------ */
	// get all users
	route.get("/all", async (request, response) => {
		const resp = await User.getAll();
		response.status(resp.code).json(resp.toJSON());

		logger.log("Fetch all users", { ip: request.clientIP, params: {code: resp.code} });
	});

	// get user by id
	route.get("/by-id/:userID", async (request, response) => {
		const resp = await User.getByID(request.params.userID);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves a user by his user ID", { ip: request.clientIP, params: {code: resp.code, userID: request.params.userID} });
	});

	// get all users by uuid
	route.get("/by-uuid/:UUID", async (request, response) => {
		const resp = await User.getByUUID(request.params.UUID);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves a user by his UUID", { ip: request.clientIP, params: {code: resp.code, UUID: request.params.UUID} });
	});

	// get all students of a campus
	route.get("/students-by-campus", async (request, response) => {
		const resp = await User.getAllStudentsFromCampus(request.query.campusName);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Fetch all users from a campus", { ip: request.clientIP, params: {code: resp.code, campusName: request.query.campusName} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
