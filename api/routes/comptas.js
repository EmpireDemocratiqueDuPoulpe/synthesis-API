/**
 * @module comptas
 * @author Maxence P. <maxence.pawlowski@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { Logger } from "../../global/global.js";
import { Compta } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/comptas", route);

	/* ---- CREATE ---------------------------------- */
	/**
	 * POST /v1/comptas
	 * @summary Add a compta to a user
	 * @security BearerAuth
	 * @tags Comptas
	 *
	 * @param {NewCompta} request.body.required - Compta info - application/json
	 *
	 * @return {SuccessResp} 200 - **Success**: the compta is added - application/json
	 * @return {ErrorResp} 400 - **Bad request**: the provided data is invalid - application/json
	 *
	 * @example request - Add compta to user with 2 as user_id
	 * { "compta": {"user_id": 2, "payment_type": "OPCA", "payment_due": 5050.76, "paid": false, "relance": false} }
	 * @example response - 200 - Success response
	 * { "code": 200, "comptaID": 3 }
	 * @example response - 400 - Bad request response
	 * { "code": 400, "error": "Aucun utilisateur ne correspond à cet user_id (2)", "fields": null }
	 */
	route.post("/", async (request, response) => {
		const { compta } = request.body;

		const resp = await Compta.add(compta);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Add a new compta", { ip: request.clientIP, params: {code: resp.code} });
	});

	/* ---- READ ------------------------------------ */
	/**
	 * GET /v1/comptas/by-id/{comptaID}
	 * @summary Get compta by its id
	 * @security BearerAuth
	 * @tags Comptas
	 *
	 * @param {number} comptaID.path.required - Compta id
	 *
	 * @return {SuccessResp} 200 - **Success**: the compta is returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "compta": {
	 *  "compta_id": 2, "payment_type": "OPCA", "payment_due": "5050.76", "paid": false, "relance": false, "user_id": 2
	 * }}
	 */
	route.get("/by-id/:comptaID", async (request, response) => {
		const resp = await Compta.getByID(request.params.comptaID);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves a compta by its ID", { ip: request.clientIP, params: {code: resp.code, comptaID: request.params.comptaID} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
