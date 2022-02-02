import Checkers from "./Checkers.js";

/*****************************************************
 * APIResp
 *****************************************************/

/**
 * APIResp make it easy to return data to Express' response
 * @class
 * @public
 */
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
	 * @param {*} data - The response data
	 * @return {APIResp}
	 */
	setData(data) {
		this.#data = data;
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

/*****************************************************
 * APIError
 *****************************************************/

/**
 * APIError is used to pass errors from anywhere in the express call stack
 * to the error handling middleware.
 * @param {Number} code - The HTTP code of the error
 * @param {string} message - The error message
 * @param {string|Array<string>|null} [fields] - Fields (query parameters) related to the error
 * @constructor
 */
export function APIError(code, message, fields) {
	const error = Error.call(this, message.toString());

	this.code = code ?? 500;
	this.name = "API Error";
	this.message = error.message;
	this.stack = error.stack;
	this.fields = Checkers.isArray(fields) ? fields : (Checkers.isDefined(fields) ? [fields] : null);
}
APIError.prototype = Object.create(Error.prototype);
APIError.prototype.constructor = APIError;
