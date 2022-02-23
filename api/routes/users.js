/**
 * @module users
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { authenticator } from "../middlewares/middlewares.js";
import { Logger, APIResp, CookiesFn } from "../../global/global.js";
import { User, generateJWT } from "../interfaces/interfaces.js";

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
	// Login a user
	route.post("/login", async (request, response) => {
		const resp = new APIResp();
		const { user } = request.body;

		const auth = (await User.login(user)).data;
		CookiesFn.setTokenCookie(response, auth.token);

		resp.setData(null);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Logs in", { ip: request.clientIP, params: {code: resp.code, email: user.email} });
	});

	// Authenticate a user using his JWT token
	route.post("/authenticate", authenticator, async (request, response) => {
		const resp = new APIResp();

		const user = (await User.getByID(request.user.sub)).data.user;
		const token = await generateJWT(user);
		CookiesFn.setTokenCookie(response, token);

		resp.setData({ user });
		response.status(resp.code).json(resp.toJSON());

		logger.log("Logs in using a JWT token", { ip: request.clientIP, params: {code: resp.code, user_id: request.user.sub} });
	});

	// Get all users
	route.get("/all", authenticator, async (request, response) => {
		const resp = await User.getAll();
		response.status(resp.code).json(resp.toJSON());

		logger.log("Fetch all users", { ip: request.clientIP, params: {code: resp.code} });
	});

	// Get a user by his id
	route.get("/by-id/:userID", async (request, response) => {
		const resp = await User.getByID(request.params.userID);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves a user by his user ID", { ip: request.clientIP, params: {code: resp.code, userID: request.params.userID} });
	});

	// Get a user by his UUID
	route.get("/by-uuid/:UUID", async (request, response) => {
		const resp = await User.getByUUID(request.params.UUID);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves a user by his UUID", { ip: request.clientIP, params: {code: resp.code, UUID: request.params.UUID} });
	});

	// Get all students of a campus
	route.get("/students-by-campus", async (request, response) => {
		const resp = await User.getAllStudentsFromCampus(request.query.campusName);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Fetch all users from a campus", { ip: request.clientIP, params: {code: resp.code, campusName: request.query.campusName} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
