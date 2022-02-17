/**
 * @module joseLoader
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import fs from "fs";
import path from "path";
import { createPublicKey, createPrivateKey } from "crypto";
import { Logger, DirName } from "../global/global.js";
import { API } from "../config/config.js";

const logger = new Logger({ prefix: "🔒 " });
const currentFile = DirName(import.meta.url);

/* ---- Load the private key -------------------- */
logger.log("Loading JWT private key...");

/**
 * Load a key file
 * @function
 * @async
 *
 * @param {string} fileName
 * @param {string} algorithm
 * @param {("public"|"private")} type
 * @return {KeyObject}
 */
async function loadKey(fileName, algorithm, type = "public") {
	const keyFile = fs.readFileSync(path.join(currentFile.__dirname, "..", "certs", fileName), "utf-8");
	const key = type === "public" ? createPublicKey(keyFile) : createPrivateKey(keyFile);

	logger.log(`∟ Loaded "${fileName}"`, { subLevel: true });
	return key;
}

const publicKey = await loadKey(API.jwt.publicKey, API.jwt.algorithm, "public");
const privateKey = await loadKey(API.jwt.privateKey, API.jwt.algorithm, "private");

logger.log("JWT private key loaded");

/* ---- Export the key -------------------------- */
export default { publicKey, privateKey };
