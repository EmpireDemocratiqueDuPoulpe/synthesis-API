/**
 * @module etl
 * @author Louan L. <louan.leplae@supinfo.com>
 */

import fs from "fs";
import path from "path";
import archiver from "archiver";
import AsyncRouter from "express-promise-router";
import { get } from "lodash-es";
import { authenticator } from "../middlewares/middlewares.js";
import { Logger, APIResp, APIError, DirName } from "../../global/global.js";
import { Compta, Job, Module, Campus, User, Note, Position, Study } from "../interfaces/interfaces.js";
import { API } from "../../config/config.js";

const fsAsync = fs.promises;
const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/etl", route);

	/* ---- CREATE ---------------------------------- */
	/**
	 * POST /v1/etl/students
	 * @summary Add students from ETL
	 * @tags ETL
	 *
	 * @param {Array<Object>} request.body - List of students
	 *
	 * @return {SuccessResp} 200 - **Success**: the response is returned - application/json
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

			// Add compta and study
			await Study.addStudy(
				{
					entry_level: student.entry_level,
					exit_level: student.exit_level,
					current_level: student.current_level,
					entry_date: student.entry_date,
					exit_date: student.exit_date,
					user_id: userID,
				});

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
	 * POST /v1/etl/modules
	 * @summary Add moduules from ETL
	 * @tags ETL
	 *
	 * @param {Array<Object>} request.body - List of modules
	 *
	 * @return {SuccessResp} 200 - **Success**: the response is returned - application/json
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
	 * POST /v1/etl/scts
	 * @summary Add SCTs from ETL
	 * @tags ETL
	 *
	 * @param {Array<Object>} request.body - List of SCTs
	 *
	 * @return {SuccessResp} 200 - **Success**: the response is returned - application/json
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
	 * POST /v1/etl/staff
	 * @summary Add staff member from ETL
	 * @tags ETL
	 *
	 * @param {Array<Object>} request.body - List of staff member
	 *
	 * @return {SuccessResp} 200 - **Success**: the response is returned - application/json
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

	/* ---- READ ------------------------------------ */
	/**
	 * GET /v1/etl/download
	 * @summary Download the data files
	 * @security BearerAuth
	 * @tags ETL
	 *
	 * @param {string} brokilone.header.required - Auth header
	 *
	 * @return {SuccessResp} 200 - **Success**: the data files are sent - application/json}
	 */
	route.get("/download", authenticator, async (request, response, next) => {
		if (await request.user.hasAllPermissions("EXPORT_DATA")) {
		// Get the path to the backups directory
			let fullPath = API.etlData.path;

			if (!fullPath) {
				throw new APIError(500, "Le répertoire de données est introuvable.");
			}

			if (!path.isAbsolute(fullPath)) {
				const currentFile = DirName(import.meta.url);
				fullPath = path.join(currentFile.__dirname, fullPath);
			}

			if (!fs.existsSync(fullPath)) {
				throw new APIError(500, "Le répertoire de données est introuvable.");
			}

			// Get all files in this folder
			const files = (await fsAsync.readdir(fullPath))
				.map(file => {
					const filePath = path.join(fullPath, file);
					const stats = fs.lstatSync(filePath);

					return { path: filePath, name: file, isFile: stats.isFile() };
				})
				.filter(file => file.isFile);

			if (!files.length) {
				throw new APIError(500, "Aucun fichier de données n'a été trouvé.");
			}

			// Zip files
			const zipName = "etl_data.zip";
			const zipPath = path.join(fullPath, `./${zipName}`);
			const output = fs.createWriteStream(zipPath);
			const archive = archiver("zip", { gzip: true, zlib: {level: 9} });

			archive.on("error", err => {
				console.error(err);
				throw new APIError(500, "Impossible d'archiver les fichiers de données.");
			});

			archive.pipe(output);
			files.map(file => archive.file(file.path, {name: file.name}));
			await archive.finalize();

			// Send the zip file
			response.download(zipPath, zipName, err => {
				if (err) {
					throw new APIError(500, "Erreur lors de l'envoi du fichier.");
				}

				fs.unlink(zipPath, () => {});
			});

			logger.log("Download the last backup file", { ip: request.clientIP, params: {code: 200, file: zipName, count: files.length} });
		} else next(new APIError(403, "Permission denied: couldn't access this endpoint."));
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
