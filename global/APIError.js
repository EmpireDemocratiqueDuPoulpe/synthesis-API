/**
 * @module APIError
 * @category Global
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { isArray, isNil } from "lodash-es";

/**
 * APIError is used to pass errors from anywhere in the express call stack
 * to the error handling middleware.
 * @constructor
 *
 * @param {Number} code - The HTTP code of the error
 * @param {string} message - The error message
 * @param {string|Array<string>|null} [fields] - Fields (query parameters) related to the error
 * @param {{ withStack: Boolean }} [options] - Options
 *
 * @example
 * throw new APIError(400, "Invalid email/password", ["email", "password"]);
 * throw new APIError(400, "Missing auth token.", null, { withStack: false });
 */
export default function APIError(code, message, fields, options = {}) {
	const error = Error.call(this, message.toString());
	const opts = { withStack: true, ...options };

	this.code = code ?? 500;
	this.name = "API Error";
	this.message = error.message;
	this.stack = opts.withStack ? error.stack : null;
	this.fields = isArray(fields) ? fields : (!isNil(fields) ? [fields] : null);
}
APIError.prototype = Object.create(Error.prototype);
APIError.prototype.constructor = APIError;
