/**
 * @module ErrorHandler
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 * @category Middlewares
 * @subcategory Request flow
 */

import { isString } from "lodash-es";
import { APIResp, APIError, APIWarn, Logger } from "../../global/global.js";

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
 * @param {module:APIError|module:APIWarn|Error|string} err
 * @param {e.Request} request
 * @param {e.Response} response
 * @param {e.NextFunction} next
 */
function expressLogger(err, request, response, next) {
	const url = `${request.protocol}://${request.headers.host}${request.originalUrl}`;
	const error = isString(err) ? new Error(err) : err;
	const types = {
		isAPIErr: (error instanceof APIError),
		isAPIWarn: (error instanceof APIWarn),
		isError: (error instanceof Error),
	};
	const message = (!err.stack ? err.message : (`${err.message}${err.message ? "\n" : ""}${err.stack}`));

	if (types.isAPIWarn) {
		logger.warn(`At ${url}\n${message}`, {ip: request.clientIP});
	} else {
		logger.error(`At ${url}\n${message}`, {ip: request.clientIP});
	}

	if (types.isError && !(types.isAPIErr || types.isAPIWarn)) {
		// TODO: Send mail
	}

	next({ url, types, ref: err });
}

/* ---- Error forwarder ------------------------- */
/**
 * Forward the error to the user
 * @function
 *
 * @param {{ url: string, types: Object<Boolean>, ref: (APIError|APIWarn|Error) }} err
 * @param {e.Request} request
 * @param {e.Response} response
 * @param {e.NextFunction} next
 */
function errorForwarder(err, request, response, next) {
	const resp = new APIResp(err.ref.code).setData({
		code: err.ref.code ?? 500,
		type: (err.types.isAPIWarn ? "warning" : "error"),
		message: err.ref.message,
	});

	if (err.types.isAPIErr || err.types.isAPIWarn) {
		resp.setData({ ...resp.data, fields: err.ref.fields });
		response.status(resp.code).json(resp.toJSON());
	} else {
		switch (err.ref.type) {
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
			...resp.data,
			message: "Le serveur a rencontré une erreur inconnue. Veuillez réessayer plus tard où contacter le support.",
		});
	}

	response.status(resp.code).json(resp.toJSON());
}

/* ---- Export ---------------------------------- */
export default { expressLogger, errorForwarder, failSafe };
