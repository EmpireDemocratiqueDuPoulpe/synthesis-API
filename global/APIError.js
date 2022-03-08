/**
 * @module APIError
 * @category Global
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import Checkers from "./Checkers.js";

/**
 * APIError is used to pass errors from anywhere in the express call stack
 * to the error handling middleware.
 * @constructor
 *
 * @param {Number} code - The HTTP code of the error
 * @param {string} message - The error message
 * @param {string|Array<string>|null} [fields] - Fields (query parameters) related to the error
 *
 * @example
 * throw new APIError(400, "Invalid email/password", ["email", "password"];
 */
export default function APIError(code, message, fields) {
	const error = Error.call(this, message.toString());

	this.code = code ?? 500;
	this.name = "API Error";
	this.message = error.message;
	this.stack = error.stack;
	this.fields = Checkers.isArray(fields) ? fields : (Checkers.isDefined(fields) ? [fields] : null);
}
APIError.prototype = Object.create(Error.prototype);
APIError.prototype.constructor = APIError;
