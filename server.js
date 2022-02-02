import express from "express";
import http from "http";
// import https from "https";
// import fs from "fs";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import api from "./api/api.js";
// eslint-disable-next-line no-unused-vars
import sequelize from "./api/sequelizeLoader.js";
import { API } from "./config/config.js";

const serverReady = (protocol, port) => `~~~ Campus Booster en mieux API | Now listening on port ${port} (${protocol})`;

function startServer() {
	// Set HTTPS certificates
	// const key = fs.readFileSync("./certs/selfsigned.key", "utf-8");
	// const cert = fs.readFileSync("./certs/selfsigned.crt", "utf-8");
	// const opts = { key, cert, passphrase: API.https.passphrase };

	// Initialize servers
	const app = express();
	const server = http.createServer(app);
	// const secureServer = https.createServer(opts, app);
	const port = API.http.port || 3000;
	// const securePort = API.https.port || 3443;

	// CORS
	// TODO: CORS
	app.use(cors(API.cors));

	// Transform raw and x-www-form-urlencoded to nice JSON
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());

	/*initSequelize().catch((error) => {
		console.error(`Sequelize init failed: ${error}`);
		process.exit(1);
	});*/

	// Add API routes
	app.use(API.prefix, api());

	// Handle 404
	app.use((request, response, next) => {
		response.status(404).end();
		next();
	});

	// Start listening
	server.listen(port, () => console.log(serverReady("http", port)))
		.on("error", (err) => {
			console.error(err);
			process.exit(1);
		});

	/* secureServer.listen(securePort, () => console.log(serverReady("https", securePort)))
			.on("error", err => {
				console.error(err);
				process.exit(1);
			});*/
}

startServer();
