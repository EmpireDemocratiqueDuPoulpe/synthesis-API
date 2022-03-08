/**
 * @module ErrorHandler
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 * @category Middlewares
 * @subcategory Request flow
 */

import { APIResp, APIError, Logger } from "../../global/global.js";

/**
 * @const
 * @type {module:Logger}
 */
const logger = new Logger({ separator: ": " });

/* ---- Logger ---------------------------------- */
/**
 * Logs the error in the console and can send a mail
 * @function
 *
 * @param {module:APIError|Error|string} err
 * @param {e.Request} request
 * @param {e.Response} response
 * @param {e.NextFunction} next
 */
function expressLogger(err, request, response, next) {
	const error = (err instanceof APIError || err instanceof Error)
		? (`${err.message}${err.message ? "\n" : ""}${err.stack}`)
		: (err.toString());

	logger.error(error, { ip: request.clientIP });

	if (err instanceof Error && !(err instanceof APIError)) {
		// TODO: Send mail
	}

	next(err);
}

/* ---- Error forwarder ------------------------- */
/**
 * Forward the error to the user
 * @function
 *
 * @param {APIError|Error|string} err
 * @param {e.Request} request
 * @param {e.Response} response
 * @param {e.NextFunction} next
 */
function errorForwarder(err, request, response, next) {
	const resp = new APIResp().setData({ error: err.message });

	if (err instanceof APIError) {
		response.status(err.code).json({ code: err.code, error: err.message, fields: err.fields });
	} else {
		switch (err.type) {
			case "time-out":
				resp.setCode(408);
				response.status(resp.code).json(resp.toJSON());
				break;
			default:
				next(resp);
		}
	}
}

/* ---- FailSafe -------------------------------- */
// noinspection JSUnusedLocalSymbols
/**
 * In case the error is unexpected, it sends a generic error message to the user
 * @function
 *
 * @param {APIResp} err
 * @param {e.Request} request
 * @param {e.Response} response
 * @param {e.NextFunction} next
 */
function failSafe(err, request, response, next) {
	const resp = err.setCode(500);

	if (process.env.NODE_ENV === "production") {
		resp.setData({
			error: "Le serveur a rencontré une erreur inconnue. Veuillez réessayer plus tard où contacter le support.",
		});
	}

	response.status(resp.code).json(resp.toJSON());
}

/* ---- Export ---------------------------------- */
export default { expressLogger, errorForwarder, failSafe };
