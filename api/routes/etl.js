/**
 * @module etl
 * @author Louan L. <louan.leplae@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { Logger, APIResp } from "../../global/global.js";
import Compta from "../interfaces/Compta.js";
import Job from "../interfaces/Job.js";
import Module from "../interfaces/Module.js";
import User from "../interfaces/User.js";
import Note from "../interfaces/Note.js";

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
		const moduleList = {};
		const modules = (await Module.getAll()).data.modules;

		modules.forEach(module => {
			moduleList[module.dataValues.name] = module.dataValues.module_id;
		});

		for await (const key of list) {
			if (Object.hasOwnProperty.call(list, key)) {
				const student = list[key];
				const userID = await User.addStudent(student);
				await Compta.addAccounting(student.accounting, userID);
				await Job.addJobs(student.job, userID);
				student.grades?.forEach(grade => {
					if (moduleList.hasOwnProperty(grade.name)) {
						Note.addNote(grade, moduleList[grade.name], userID);
					}
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
