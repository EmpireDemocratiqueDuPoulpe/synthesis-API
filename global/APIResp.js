/**
 * @module APIResp
 * @category Global
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { isNumber } from "lodash-es";

/**
 * APIResp make it easy to return data to Express' response
 * @class
 *
 * @example
 * const response = new APIResp(200).setMessage("Logged in!").setData({ user: {firstName: "Hammong", lastName: "Gus"} });
 * const json = response.toJSON();
 * console.log(json); // ->
 * // {
 * //   code: 200,
 * //   message: "Logged in!",
 * //   data: {
 * //     firstName: "Hammong",
 * //     lastName: "Gus"
 * //   }
 * // }
 */
export default class APIResp {
	#code = 200;
	#message = null;
	#data = {}

	/** @param {Number} [code] - The HTTP code of the response */
	constructor(code) {
		this.setCode(code);
	}

	/* ---- Setters --------------------------------- */
	/**
	 * Changes the HTTP response code
	 * @function
	 *
	 * @param {Number} code - The HTTP code of the response
	 * @return {APIResp}
	 */
	setCode(code) {
		if (!isNumber(code)) return this;

		this.#code = code;
		return this;
	}

	/**
	 * Changes the response message
	 * @function
	 *
	 * @param {string|null} message - The response message
	 * @return {APIResp}
	 */
	setMessage(message) {
		this.#message = message ? message.toString() : null;
		return this;
	}

	/**
	 * Set response data
	 * @function
	 *
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
	 * @function
	 *
	 * @return {Object.<string, *>}
	 */
	toJSON() {
		const json = { code: this.code, ...this.data };
		if (this.message) json.message = this.message;

		return json;
	}
}
