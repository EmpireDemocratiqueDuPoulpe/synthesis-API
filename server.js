import express from "express";
import http from "http";
import https from "https";
import fs from "fs";
import urljoin from "urljoin";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import requestIP from "request-ip";
import { requireHTTPS, errorHandler } from "./api/middlewares/middlewares.js";
import expressJSDocSwagger from "express-jsdoc-swagger";
import api from "./api/api.js";
import "./api/sequelizeLoader.js";
import "./api/joseLoader.js";
import { DirName, APIWarn } from "./global/global.js";
import { API, Swagger } from "./config/config.js";

/**
 * Build a message to the console when the API is ready
 * @function
 * @category Server
 *
 * @param {("http"|"https")} protocol - Protocol used
 * @param {Number} port - Listening port
 * @return {void}
 */
const serverReady = (protocol, port) => {
	console.log(`~~~ Campus Booster en mieux API | Now listening on port ${port} (${protocol})`);
};

/**
 * Build a message to the console when the Swagger UI docs are ready
 * @function
 * @category Server
 *
 * @param {("http"|"https")} protocol - Protocol used
 * @param {Number} port - Listening port
 * @param {string} swaggerPath - Path to the Swagger UI docs
 * @return {void}
 */
const swaggerReady = (protocol, port, swaggerPath) => {
	console.log(`~~~ Campus Booster en mieux API | Routes docs available on ${urljoin(`${protocol}://localhost:${port}/`, swaggerPath)}`);
};

/**
 * Start the API
 * @function
 * @category Server
 *
 * @return {void}
 */
function startServer() {
	// Set HTTPS certificates
	const key = fs.readFileSync("./certs/selfsigned-key.pem", "utf-8");
	const cert = fs.readFileSync("./certs/selfsigned.pem", "utf-8");
	const opts = { key, cert };

	// Initialize servers
	const app = express();
	const server = http.createServer(app);
	const secureServer = https.createServer(opts, app);
	const port = API.http.port || 3000;
	const securePort = API.https.port || 3443;

	// CORS
	app.use(cors(API.cors));

	// Force HTTPS
	app.use(requireHTTPS);

	// IP
	app.use(requestIP.mw({ attributeName: "clientIP" }));

	// Transform raw and x-www-form-urlencoded to nice JSON
	app.use(bodyParser.json({ limit: "1mb" }));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());

	// Setup Swagger UI x JSDoc
	expressJSDocSwagger(app)({ ...Swagger, baseDir: (DirName(import.meta.url).__dirname) });
	swaggerReady("https", securePort, Swagger.swaggerUIPath);

	// Add API routes
	app.use(API.prefix, api());

	// Serves static files
	app.use("/.well-known", express.static("./.well-known", { dotfiles: "allow" }));
	app.use("/files", express.static("./uploads"));

	// Handle 404
	// noinspection JSUnusedLocalSymbols
	app.use((request, response, next) => {
		throw new APIWarn(404, `Ce endpoint n'existe pas (${request.method}).`);
	});

	// Error handling
	app.use(errorHandler.expressLogger);
	app.use(errorHandler.errorForwarder);
	app.use(errorHandler.failSafe);

	// Start listening
	server.listen(port, () => serverReady("http", port))
		.on("error", err => {
			console.error(err);
			process.exit(1);
		});

	secureServer.listen(securePort, () => serverReady("https", securePort))
		.on("error", err => {
			console.error(err);
			process.exit(1);
		});
}

startServer();
