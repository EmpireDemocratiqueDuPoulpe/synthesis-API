/**
 * @module etl
 * @author Louan L. <louan.leplae@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { Logger } from "../../global/global.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/etl", route);
	/* ---- CREATE ---------------------------------- */
	/**
	  * TODO: POST /v1/etl/students
	  */
	route.post("/students", async (request, response) => {
		const list = request.body;
		console.log(list);
		// const resp = await Absence.add(absence); // ***********
		// response.status(resp.code).json(resp.toJSON());

		// logger.log("Add a new absence to a user", { ip: request.clientIP, params: {code: resp.code, user_id: absence?.user_id} }); // **********
	});
};
