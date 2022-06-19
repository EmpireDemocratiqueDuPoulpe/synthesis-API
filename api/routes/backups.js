/**
 * @module backups
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import fs from "fs";
import path from "path";
import AsyncRouter from "express-promise-router";
import { authenticator } from "../middlewares/middlewares.js";
import { Logger, APIError, DirName } from "../../global/global.js";
import { API } from "../../config/config.js";

const fsAsync = fs.promises;
const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

export default (router) => {
	router.use("/backups", route);

	/* ---- CREATE ---------------------------------- */
	/* ---- READ ------------------------------------ */
	/**
	 * GET /v1/backups/download-latest
	 * @summary Download the latest backup file
	 * @security BearerAuth
	 * @tags Backups
	 *
	 * @param {string} brokilone.header.required - Auth header
	 *
	 * @return {SuccessResp} 200 - **Success**: the backup file is sent - application/json}
	 */
	route.get("/download-latest", authenticator, async (request, response, next) => {
		if (await request.user.hasAllPermissions("EXPORT_DATA")) {
			// Get the path to the backups directory
			let fullPath = API.backups.path;

			if (!fullPath) {
				throw new APIError(500, "Le répertoire de sauvegarde est introuvable.");
			}

			if (!path.isAbsolute(fullPath)) {
				const currentFile = DirName(import.meta.url);
				fullPath = path.join(currentFile.__dirname, fullPath);
			}

			if (!fs.existsSync(fullPath)) {
				throw new APIError(500, "Le répertoire de sauvegarde est introuvable.");
			}

			// Get all files in this folder
			const files = (await fsAsync.readdir(fullPath))
				.map(file => {
					const filePath = path.join(fullPath, file);
					const stats = fs.lstatSync(filePath);

					return { path: filePath, isFile: stats.isFile(), lastModified: stats.mtime.getTime() };
				})
				.filter(file => file.isFile)
				.sort((fileA, fileB) => fileB.lastModified - fileA.lastModified);

			if (!files.length) {
				throw new APIError(500, "Aucune sauvegarde n'a été trouvée.");
			}

			// Send the last file
			const lastFile = files[0];

			response.download(lastFile.path);
			logger.log("Download the last backup file", { ip: request.clientIP, params: {code: 200, file: lastFile.path} });
		} else next(new APIError(403, "Permission denied: couldn't access this endpoint."));
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
