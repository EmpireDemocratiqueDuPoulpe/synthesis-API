import { APIResp, APIError, Logger } from "../../global/global.js";

const logger = new Logger({ separator: ": " });

/* ---- Logger ---------------------------------- */
const expressLogger = (err, request, response, next) => {
	const error = (err instanceof APIError || err instanceof Error)
		? (err.stack ?? err.message)
		: (err.toString());

	logger.error(error, { ip: request.clientIP });

	if (err instanceof Error && !(err instanceof APIError)) {
		// TODO: Send mail
	}

	next(err);
};

/* ---- Error forwarder ------------------------- */
const errorForwarder = (err, request, response, next) => {
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
};

/* ---- FailSafe -------------------------------- */
// noinspection JSUnusedLocalSymbols
const failSafe = (err, request, response, next) => {
	const resp = err.setCode(500);

	if (process.env.NODE_ENV === "production") {
		resp.setData({
			error: "Le serveur a rencontré une erreur inconnue. Veuillez réessayer plus tard où contacter le support.",
		});
	}

	response.status(resp.code).json(resp.toJSON());
};

/* ---- Export ---------------------------------- */
export default { expressLogger, errorForwarder, failSafe };
