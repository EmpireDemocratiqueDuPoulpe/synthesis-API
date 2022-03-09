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
	/**
	 * POST /v1/users
	 * @summary Add a user
	 * @security BearerAuth
	 * @tags Users
	 *
	 * @param {NewUser} request.body.required - User info - application/json
	 *
	 * @return {SuccessResp} 200 - **Success**: the user is added - application/json
	 * @return {ErrorResp} 400 - **Bad request**: the provided data is invalid - application/json
	 *
	 * @example request - Add user
	 * { "user": {
	 *  "first_name": "Pony", "last_name": "Sparks", "birth_date": "4/16/1974", "email": "pony.sparks@psindustry.com",
	 *  "password1": "My lil P0ny", "password2": "My lil P0ny", "address": "Earth", "gender": "Pony", "region": "New York",
	 *  "campus": "Distanciel"
	 * }}
	 * @example response - 200 - Success response
	 * { "code": 200, "userID": 4 }
	 * @example response - 400 - Bad request response
	 * { "code": 400, "error": "Les mots de passe ne correspondent pas.", "fields": ["password1", "password2"] }
	 */
	route.post("/", async (request, response) => {
		const { user } = request.body;

		const resp = await User.add(user);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Add a new user", { ip: request.clientIP, params: {code: resp.code, email: user?.email} });
	});

	/* ---- READ ------------------------------------ */
	/**
	 * POST /v1/users/login
	 * @summary Login a user
	 * @tags Users
	 *
	 * @return {SuccessResp} 200 - **Success**: the user is returned along with a JWT token in the cookies - application/json
	 *
	 * @example request - Login user
	 * { "user": {"email": "pony.sparks@psindustry.com", "password": "My lil P0ny"} }
	 * @example response - 200 - Success response
	 * { "code": 200, "user": {
	 *  "first_name": "Pony", "last_name": "Sparks", "birth_date": "4/16/1974", "email": "pony.sparks@psindustry.com",
	 *  "address": "Earth", "gender": "Pony", "region": "New York", "campus": "Distanciel",
	 *  "position": { "position_id": 5, "name": "Étudiant", "permissions": {"READ_PLANNINGS": "READ_PLANNINGS"} }
	 * } }
	 * @example response - 400 - Bad request response
	 * { "code": 400, "error": "L'adresse email et/ou le mot de passe sont erronés.", "fields": ["email", "password"] }
	 */
	route.post("/login", async (request, response) => {
		const resp = new APIResp();
		const { user } = request.body;

		const auth = (await User.login(user)).data;
		CookiesFn.setTokenCookie(response, auth.token);

		resp.setData({ user: auth.user });
		response.status(resp.code).json(resp.toJSON());

		logger.log("Logs in", { ip: request.clientIP, params: {code: resp.code, email: user.email} });
	});

	/**
	 * POST /v1/users/authenticate
	 * @summary Authenticate a user using his JWT token
	 * @security BearerAuth
	 * @tags Users
	 *
	 * @return {SuccessResp} 200 - **Success**: the user is returned along with a new JWT token in the cookies - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "user": {
	 *  "first_name": "Pony", "last_name": "Sparks", "birth_date": "4/16/1974", "email": "pony.sparks@psindustry.com",
	 *  "address": "Earth", "gender": "Pony", "region": "New York", "campus": "Distanciel",
	 *  "position": { "position_id": 5, "name": "Étudiant", "permissions": {"READ_PLANNINGS": "READ_PLANNINGS"} }
	 * } }
	 * @example response - 400 - Bad request response
	 * { "code": 401, "error": "Jeton d'authentification manquant.", "fields": null }
	 */
	route.post("/authenticate", authenticator, async (request, response) => {
		const resp = new APIResp();

		const user = (await User.getByID(request.user.sub)).data.user;
		const token = await generateJWT(user);
		CookiesFn.setTokenCookie(response, token);

		resp.setData({ user });
		response.status(resp.code).json(resp.toJSON());

		logger.log("Logs in using a JWT token", { ip: request.clientIP, params: {code: resp.code, user_id: request.user.sub} });
	});

	/**
	 * GET /v1/users/all
	 * @summary Get all users
	 * @security BearerAuth
	 * @tags Users
	 * @deprecated
	 *
	 * @return {SuccessResp} 200 - **Success**: the users are returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "users": [
	 *  {
	 *    "first_name": "Pony", "last_name": "Sparks", "birth_date": "4/16/1974", "email": "pony.sparks@psindustry.com",
	 *    "address": "Earth", "gender": "Pony", "region": "New York", "campus": "Distanciel",
	 *    "position": { "position_id": 5, "name": "Étudiant", "permissions": {"READ_PLANNINGS": "READ_PLANNINGS"} }
	 *  }
	 * ]}
	 */
	route.get("/all", authenticator, async (request, response) => {
		const resp = await User.getAll();
		response.status(resp.code).json(resp.toJSON());

		logger.log("Fetch all users", { ip: request.clientIP, params: {code: resp.code} });
	});

	/**
	 * GET /v1/users/by-id/{userID}
	 * @summary Get a user by its id
	 * @security BearerAuth
	 * @tags Users
	 *
	 * @param {number} userID.path.required - User id
	 *
	 * @return {SuccessResp} 200 - **Success**: the user is returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "user": {
	 *    "first_name": "Pony", "last_name": "Sparks", "birth_date": "4/16/1974", "email": "pony.sparks@psindustry.com",
	 *    "address": "Earth", "gender": "Pony", "region": "New York", "campus": "Distanciel",
	 *    "position": { "position_id": 5, "name": "Étudiant", "permissions": {"READ_PLANNINGS": "READ_PLANNINGS"} }
	 * }}
	 */
	route.get("/by-id/:userID", async (request, response) => {
		const resp = await User.getByID(request.params.userID);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves a user by his user ID", { ip: request.clientIP, params: {code: resp.code, userID: request.params.userID} });
	});

	/**
	 * GET /v1/users/by-uuid/{UUID}
	 * @summary Get a user by its UUIDv4
	 * @security BearerAuth
	 * @tags Users
	 *
	 * @param {number} UUID.path.required - UUIDv4
	 *
	 * @return {SuccessResp} 200 - **Success**: the user is returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "user": {
	 *    "first_name": "Pony", "last_name": "Sparks", "birth_date": "4/16/1974", "email": "pony.sparks@psindustry.com",
	 *    "address": "Earth", "gender": "Pony", "region": "New York", "campus": "Distanciel",
	 *    "position": { "position_id": 5, "name": "Étudiant", "permissions": {"READ_PLANNINGS": "READ_PLANNINGS"} }
	 * }}
	 */
	route.get("/by-uuid/:UUID", async (request, response) => {
		const resp = await User.getByUUID(request.params.UUID);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves a user by his UUID", { ip: request.clientIP, params: {code: resp.code, UUID: request.params.UUID} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
