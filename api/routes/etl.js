/**
 * @module etl
 * @author Louan L. <louan.leplae@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { Logger, APIResp } from "../../global/global.js";
import Compta from "../interfaces/Compta.js";
import Job from "../interfaces/Job.js";
import Module from "../interfaces/Module.js";
// import Compta from "../interfaces/Compta.js";
import User from "../interfaces/User.js";
// import job from "../models/job.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/etl", route);
	/* ---- CREATE ---------------------------------- */
	/**
	  * TODO: POST /v1/etl/students
	  */
	route.post("/students", async (request, response) => {
		const resp = new APIResp(200);
		const list = request.body;
		const moduleList = await Module.getAll();
		console.log(moduleList);
		for (const key in list) {
			if (Object.hasOwnProperty.call(list, key)) {
				const student = list[key];
				await User.addStudent(student).then((userId) => {
					Compta.addAccountings(student.accounting, userId);
					Job.addJobs(student.job, userId);
					// TODO : grades
				});
			}
		}
		response.status(resp.code).json(resp.toJSON());

		logger.log("Add students", { ip: request.clientIP, params: {code: resp.code}});
	});

	/**
	* TODO: POST /v1/etl/students
	*/
	route.post("/modules", async (request, response) => {
		const resp = new APIResp(200);
		const list = request.body;
		for (const key in list) {
			if (Object.hasOwnProperty.call(list, key)) {
				const module = list[key];
				await Module.addModule(module);
			}
		}
		response.status(resp.code).json(resp.toJSON());

		logger.log("Add students", { ip: request.clientIP, params: {code: resp.code}});
	});
};
