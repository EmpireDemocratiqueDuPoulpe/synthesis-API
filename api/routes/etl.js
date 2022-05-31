/**
 * @module absences
 * @author Louan L. <louan.leplae@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { Logger } from "../../global/global.js";
import { Absence } from "../interfaces/interfaces.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/etl", route);
	/* ---- CREATE ---------------------------------- */
	/**
	  * POST /v1/etl
	  * @summary Add an absence to a user
	  * @security BearerAuth
	  * @tags ELT
	  *
	  * @param {NewAbsence} request.body.required - Absence info - application/json ********
	  *
	  * @return {SuccessResp} 200 - **Success**: the absences have been added - application/json
	  * @return {ErrorResp} 400 - **Bad request**: the provided data is invalid - application/json
	  *
	  * @example request - Add absence to user with 2 as user_id
	  * { "absence": {"user_id": 2, "start_date": "3/21/2022", "end_date": "3/22/2022"} }
	  * @example response - 200 - Success response
	  * { "code": 200, "absenceID": 3 }
	  * @example response - 400 - Bad request response
	  * { "code": 400, "error": "Aucun utilisateur ne correspond à ce user_id (2)", "fields": null }
	  */
	route.post("/", async (request, response) => {
		const list = request.body;
		console.log(list);
		// const resp = await Absence.add(absence); // ***********
		// response.status(resp.code).json(resp.toJSON());

		// logger.log("Add a new absence to a user", { ip: request.clientIP, params: {code: resp.code, user_id: absence?.user_id} }); // **********
	});
};
