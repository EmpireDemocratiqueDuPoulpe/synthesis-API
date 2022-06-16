/**
 * @module etl
 * @author Louan L. <louan.leplae@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import { get } from "lodash-es";
import { Logger, APIResp } from "../../global/global.js";
import { Compta, Job, Module, Campus, User, Note, Position } from "../interfaces/interfaces.js";

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

		// Fetch modules and campuses
		const modules = mapToKeyValue(((await Module.getAll()).data.modules), "dataValues.name", "dataValues.module_id");
		const campuses = mapToKeyValue(((await Campus.getAll()).data.campuses), "dataValues.name", "dataValues.campus_id");

		// Add students
		for await (const student of request.body) {
			// Add student
			student.campus_id = campuses[student.campus] ?? null;
			delete student.campus;

			const userID = (await User.addStudentFromETL(student)).data.userID;

			// Add compta and jobs
			await Compta.addFromETL(student.accounting, userID);
			await Job.addFromETL(student.job, userID);

			// Add grades
			if (student.grades) {
				await Promise.all(student.grades.map(grade => {
					return Object.hasOwnProperty.call(modules, grade.name)
						? Note.add({ user_id: userID, module_id: modules[grade.name], note: grade.grade })
						: null;
				}).filter(Boolean));
			}
		}

		response.status(resp.code).json(resp.toJSON());
		logger.log("Add students from ETL", { ip: request.clientIP, params: {code: resp.code}});
	});

	/**
	* TODO: POST /v1/etl/modules
	*/
	route.post("/modules", async (request, response) => {
		const resp = new APIResp(200);

		for await (const module of request.body) {
			await Module.addFromETL(module);
		}

		response.status(resp.code).json(resp.toJSON());
		logger.log("Add modules", { ip: request.clientIP, params: {code: resp.code}});
	});

	/**
	* TODO: POST /v1/etl/scts
	*/
	route.post("/scts", async (request, response) => {
		const resp = new APIResp(200);

		// Fetch modules and campuses
		const modules = mapToKeyValue(((await Module.getAll()).data.modules), "dataValues.name", "dataValues.module_id");
		const campuses = mapToKeyValue(((await Campus.getAll()).data.campuses), "dataValues.name", "dataValues.campus_id");

		// Add SCTs
		for await (const sct of request.body) {
			const moduleID = modules[sct.modules] ?? null;
			const campusID = campuses[sct.Section] ?? null;

			await User.addSCTFromETL(sct, [moduleID], campusID);
		}

		response.status(resp.code).json(resp.toJSON());
		logger.log("Add SCTs", { ip: request.clientIP, params: {code: resp.code}});
	});

	/**
	* TODO: POST /v1/etl/staff
	*/
	route.post("/staff", async (request, response) => {
		const resp = new APIResp(200);

		// Fetch positions and campuses
		const positions = mapToKeyValue(((await Position.getAll()).data.positions), "dataValues.name", "dataValues.position_id");
		const campuses = mapToKeyValue(((await Campus.getAll()).data.campuses), "dataValues.name", "dataValues.campus_id");

		// Add staff members
		for await (const staff of request.body) {
			const positionID = positions[staff.Roles] ?? null;

			staff.campus_id = campuses[staff.Campus] ?? null;
			delete staff.Campus;

			await User.addStaffFromETL(staff, positionID);
		}

		response.status(resp.code).json(resp.toJSON());
		logger.log("Add staff members", { ip: request.clientIP, params: {code: resp.code}});
	});
};

/**
 * Transform an array of objects to an object.
 * @function
 *
 * @example
 * const positions = mapToKeyValue(((await Position.getAll()).data.positions), "dataValues.name", "dataValues.position_id");
 *
 * @param {Array} arr - Array to transform
 * @param {string} keyProp - Path to the property used as key
 * @param {string} valueProp - Path to the property used as value
 * @return {Object}
 */
function mapToKeyValue(arr, keyProp, valueProp) {
	const obj = {};

	arr.forEach(item => obj[get(item, keyProp, "_")] = get(item, valueProp, null));

	return obj;
}
