/**
 * @module APIResp
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import Checkers from "./Checkers.js";

/** APIResp make it easy to return data to Express' response */
export default class APIResp {
	#code = 200;
	#message = null;
	#data = {}

	/**
	 * @constructor
	 * @param {Number} [code] - The HTTP code of the response
	 */
	constructor(code) {
		this.setCode(code);
	}

	/* ---- Setters --------------------------------- */
	/**
	 * Changes the HTTP response code
	 * @param {Number} code - The HTTP code of the response
	 * @return {APIResp}
	 */
	setCode(code) {
		if (!Checkers.isNumber(code)) return this;

		this.#code = code;
		return this;
	}

	/**
	 * Changes the response message
	 * @param {string|null} message - The response message
	 * @return {APIResp}
	 */
	setMessage(message) {
		this.#message = message ? message.toString() : null;
		return this;
	}

	/**
	 * Set response data
	 * @param {Object|null} data - The response data
	 * @return {APIResp}
	 */
	setData(data) {
		if (!data) {
			this.#data = {};
		} else {
			this.#data = data;
		}

		return this;
	}

	/* ---- Getters --------------------------------- */
	/**
	 * The HTTP code of the response
	 * @return {number}
	 */
	get code() { return this.#code; }

	/**
	 * The response message
	 * @return {string|null}
	 */
	get message() { return this.#message; }

	/**
	 * The response data
	 * @return {*}
	 */
	get data() { return this.#data; }

	/* ---- Functions ------------------------------- */
	/**
	 * Create an object with the values of this instance
	 * @return {Object.<string, *>}
	 */
	toJSON() {
		const json = { code: this.code, ...this.data };
		if (this.message) json.message = this.message;

		return json;
	}
}
