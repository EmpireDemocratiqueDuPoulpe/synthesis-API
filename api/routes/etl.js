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
import Campus from "../interfaces/Campus.js";
import Position from "../interfaces/Position.js";

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
				await Compta.addAccountings(student.accounting, userID);
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
	* TODO: POST /v1/etl/modules
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

		logger.log("Add modules", { ip: request.clientIP, params: {code: resp.code}});
	});

	/**
	* TODO: POST /v1/etl/intervenants
	*/
	route.post("/intervenants", async (request, response) => {
		const resp = new APIResp(200);
		const list = request.body;

		const modules = (await Module.getAll()).data.modules;
		const campus = (await Campus.getAll()).data.campuses;

		for await (const intervenant of list) {
			const intervenantModules = modules.map(m => {
				if (m.dataValues.name === intervenant.modules) {
					return m.dataValues.module_id;
				}
				return null;
			}).filter(Boolean);

			const campusId = campus.map(c =>{
				if (c.dataValues.name === intervenant.Section) {
					return c.dataValues.campus_id;
				}
				return null;
			}).filter(Boolean)[0];

			if (intervenantModules.length > 0) {
				await User.addSCT(intervenant, intervenantModules, campusId);
			}
		}
		response.status(resp.code).json(resp.toJSON());

		logger.log("Add intervenants", { ip: request.clientIP, params: {code: resp.code}});
	});

	/**
	* TODO: POST /v1/etl/staff
	*/
	route.post("/staff", async (request, response) => {
		const resp = new APIResp(200);
		const list = request.body;
		const positions = (await Position.getAllPositions()).data.positions;

		for await (const staff of list) {
			const roleId = positions.map(p => {
				if (p.dataValues.name === staff.Roles) {
					return p.dataValues.position_id;
				}
				return null;
			}).filter(Boolean)[0];

			User.addStaff(staff, roleId);
		}
		response.status(resp.code).json(resp.toJSON());

		logger.log("Add staff", { ip: request.clientIP, params: {code: resp.code}});
	});
};
