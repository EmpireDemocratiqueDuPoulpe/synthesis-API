/**
 * @module Authenticator
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 * @category Middlewares
 * @subcategory Authentication
 */

import { jwtVerify } from "jose";
import keys from "../joseLoader.js";
import { APIError, Logger, LoggedUser } from "../../global/global.js";

/**
 * @const
 * @type {module:Logger}
 */
const logger = new Logger({ prefix: "🔒 " });

/**
 * Verify the JWT token
 * @function
 *
 * @param {e.Request} request
 * @param {e.Response} response
 * @param {function} next
 */
function authenticator(request, response, next) {
	const authHeader = request.headers["authorization"];
	const specialHeader = request.headers["brokilone"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token || !specialHeader) {
		next(new APIError(401, "Jeton d'authentification manquant ou invalide.", null, { withStack: false }));
	}

	jwtVerify(token, keys.publicKey)
		.then(({ payload }) => {
			request.user = new LoggedUser(payload);
			next();
		})
		.catch(err => {
			logger.error("Unauthorized access", { ip: request.clientIP, params: {err} });
			next(new APIError(403, "Accès non autorisé."));
		});
}

export default authenticator;
