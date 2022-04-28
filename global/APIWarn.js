/**
 * @module APIWarn
 * @category Global
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import Checkers from "./Checkers.js";

/**
 * APIWarn is used to pass warning from anywhere in the express call stack
 * to the error handling middleware.
 * @constructor
 *
 * @param {Number} code - The HTTP code of the error
 * @param {string} message - The error message
 * @param {string|Array<string>|null} [fields] - Fields (query parameters) related to the error
 * @param {{ withStack: Boolean }} [options] - Options
 *
 * @example
 * throw new APIWarn(404, "This page doesn't exist.");
 */
export default function APIWarn(code, message, fields, options = {}) {
	const error = Error.call(this, message.toString());
	const opts = { withStack: false, ...options };

	this.code = code ?? 500;
	this.name = "API Warning";
	this.message = error.message;
	this.stack = opts.withStack ? error.stack : null;
	this.fields = Checkers.isArray(fields) ? fields : (Checkers.isDefined(fields) ? [fields] : null);
}
APIWarn.prototype = Object.create(Error.prototype);
APIWarn.prototype.constructor = APIWarn;
