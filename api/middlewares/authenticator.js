import { jwtVerify } from "jose";
import keys from "../joseLoader.js";
import { APIError, Logger } from "../../global/global.js";

const logger = new Logger({ prefix: "🔒 " });

/**
 * Verify the JWT token
 * @function
 *
 * @param {e.Request} request
 * @param {e.Response} response
 * @param {e.NextFunction} next
 */
export default function authenticator(request, response, next) {
	const authHeader = request.headers["authorization"];
	const specialHeader = request.headers["brokilone"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token || !specialHeader) {
		throw new APIError(401, "Jeton d'authentification manquant.");
	}

	jwtVerify(token, keys.publicKey)
		.then(({ payload }) => {
			request.user = payload;
			next();
		})
		.catch(err => {
			logger.error("Unauthorized access", { ip: request.clientIP, params: err });
			throw new APIError(403, "Accès non autorisé.");
		});
}
