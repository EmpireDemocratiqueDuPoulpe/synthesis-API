/**
 * @module sequelizeLoader
 * @category Sequelize
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 *
 * @requires Sequelize
 */

import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import associations from "./models/associations.js";
import addDummyData from "./models/addDummyData.js";
import { Logger, DirName } from "../global/global.js";
import { DB } from "../config/config.js";

const logger = new Logger({ prefix: "⛃ " });
const currentFile = DirName(import.meta.url);

/* ---- Initialize Sequelize -------------------- */
/**
 * Sequelize instance
 * @const
 * @type {Sequelize}
 */
const sequelize = new Sequelize(DB.name, DB.user, DB.password, {
	host: DB.host,
	port: DB.port,
	dialect: DB.dialect,
	logging: process.env.NODE_ENV === "production" ? false : ((msg) => logger.log(msg)),
	define: {
		// TODO: Enable timestamp for some tables
		timestamps: false,
		underscored: true,
	},
});

/* ---- Test the connection --------------------- */
try {
	await sequelize.authenticate();
	logger.log("Database connection established");
} catch (err) {
	logger.error(`Error when connecting to the database: ${err}`);
	process.exit(1);
}

/* ---- Import models --------------------------- */
const modelsDir = "models";
const modelsDirPath = path.join(currentFile.__dirname, `./${modelsDir}/`);
const exclusionList = [ `${modelsDir}.js`, "associations.js", "addDummyData.js" ];

logger.log(`Loading models in "${modelsDirPath}"...`);

const modules = fs.readdirSync(modelsDirPath)
	.filter(file => ((file.indexOf(".") !== 0) && (!exclusionList.includes(file)) && (file.slice(-3) === ".js")));

for await (const module of modules) {
	try {
		const model = await import(`./${modelsDir}/${module}`);
		const modelName = module.slice(0, -3);
		model.define(sequelize, modelName);

		logger.log(`∟ Loaded "${module}"`, { subLevel: true });
	} catch (err) {
		logger.error(`Error while loading "${module}": ${err}`);
		break;
	}
}

/* ---- Make associations ----------------------- */
associations(sequelize, logger);

/* ---- Syncing models with the database -------- */
const forceSync = (process.env.NODE_ENV !== "production" && process.env.FORCE_SYNC === "true");

logger.log(`Running model synchronization (${forceSync ? "" : "not "}forced)...`);
await sequelize.sync({ force: forceSync });
logger.log("Models synced successfully ");

/* ---- Add dummy data -------------------------- */
if (forceSync) {
	await addDummyData(sequelize, logger);
}

logger.log("Sequelize initialization done");

export default sequelize;
