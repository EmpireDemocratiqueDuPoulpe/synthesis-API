import Checkers from "./Checkers.js";

/*****************************************************
 * APIResp
 *****************************************************/

export default class APIResp {
	#code = 200;
	#message = null;
	#data = {};
	// #error = null;

	constructor(code) {
		this.setCode(code);
	}

	/* ---- Setters --------------------------------- */
	setCode(code) {
		if (!Checkers.isNumber(code)) return;

		this.#code = code;
		return this;
	}

	setMessage(message) {
		this.#message = message.toString();
		return this;
	}

	setData(data) {
		this.#data = data;
		return this;
	}

	/*setError(code, message, fields) {
		this.#error = new APIError(code ?? this.Code, message, fields);
		return this;
	}*/

	/* ---- Getters --------------------------------- */
	get code() { return this.#code }
	get message() { return this.#message; }
	get data() { return this.#data; }
	// get error() { return this.#error; }
	// get hasError() { return this.#error instanceof APIError; }

	/* ---- Functions ------------------------------- */
	toJSON() {
		const json = { code: this.code, ...this.data };

		if (this.message) json.message = this.message;
		// if (this.hasError) json.error = this.error;

		return json;
	}
}

/*****************************************************
 * APIError
 *****************************************************/

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