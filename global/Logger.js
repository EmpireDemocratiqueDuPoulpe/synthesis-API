/**
 * @module Logger
 * @category Global
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import "colors";

/**
 * Initialization option of the logger
 * @typedef {Object} Logger~InitOptions
 * @property {string|null} [prefix=""] - Prefix is used at the beginning of the log
 * @property {string|null} [separator=" - "] - Separator is the string that separates the date from the log message
 * @property {boolean} [colors=true] - Colors is used to control whether the log should have colors or not
 */

/**
 * Build option of the logger
 * @typedef {Object} Logger~BuildOptions
 * @property {boolean} [withTime=true] - Must show time before the log message
 * @property {string|null} [ip=null] - The IP address of the user who triggered this log message
 * @property {Object|null} [params=null] - An object of parameters to log
 * @property {boolean} [subLevel=false] - Mark this log message as a sub-level log message
 */

/**
 * Logger used on top of console
 * @class

 * @example
 * const logger = new Logger({ prefix: "@ " });
 * logger.log("hi, world");
 */
export default class Logger {
	#prefix = "";
	#separator = " - ";
	#colors = true;

	/** @param {Logger~InitOptions} [options] - The initialization options of the Logger */
	constructor(options = { prefix: null, separator: null, colors: true }) {
		this.setPrefix(options.prefix);
		this.setSeparator(options.separator);
		this.enableColors(options.colors);
	}

	/* ---- Setters --------------------------------- */
	/**
	 * Changes the prefix
	 * @function
	 *
	 * @param {string} prefix - The new prefix
	 * @return {void}
	 */
	setPrefix(prefix) { if (prefix) this.#prefix = prefix.toString(); }

	/**
	 * Changes the separator
	 * @function
	 *
	 * @param {string} separator - The new separator
	 * @return {void}
	 */
	setSeparator(separator) { if (separator) this.#separator = separator.toString(); }

	/**
	 * Used to enable or disable colors in log messages
	 * @function
	 *
	 * @param {boolean} [enable=true] - Enable colors?
	 * @return {void}
	 */
	enableColors(enable = true) { this.#colors = !!enable; }

	/* ---- Getters --------------------------------- */
	/**
	 * Prefix is used at the beginning of the log
	 * @return {string}
	 */
	get prefix() { return this.#prefix; }

	/**
	 * Separator is the string that separates the date from the log message
	 * @return {string}
	 */
	get separator() { return this.#separator; }

	/**
	 * Colors is used to control whether the log should have colors or not
	 * @return {boolean}
	 */
	get hasColors() { return this.#colors; }

	/* ---- Functions-------------------------------- */
	/**
	 * Builds a date string using a user's locale or the specified one.
	 * @function
	 * @private
	 *
	 * @param {Date} date - Date to stringify
	 * @param {boolean} withTime - Include time in the date string?
	 * @param {string} locale - The locale to used. User's locale if null.
	 * @return {string}
	 */
	_dateToString(date, withTime = true, locale = "fr-FR") {
		return withTime ? date.toLocaleString(locale) : date.toLocaleDateString(locale);
	}

	/**
	 * Build the complete log message to show
	 * @function
	 * @private
	 *
	 * @param {string} message - The message to log
	 * @param {Logger~BuildOptions} options - Build options
	 * @return {string} - The message once it has been built
	 */
	_build(message, options = { withTime: true, ip: null, params: null, subLevel: false }) {
		const now = options.withTime ? (this._dateToString(new Date())) : "";
		const ip = options.ip ? `[${options.ip}]` : "";
		let params = [];

		if (options.params) {
			Object.entries(options.params).forEach(([key, value]) => params.push(`${key}=${value}`));
			params = params.join(", ");
		} else params = "";

		let preSep = `${this.prefix}${now} ${ip}${this.separator}`.green;
		let postSep = `${message} ${params.gray}`;

		if (options.subLevel) {
			preSep = `${this.prefix}${" ".repeat(3)}`.gray;
			postSep = postSep.gray;
		}

		const str = `${preSep}${postSep}`;
		return this.hasColors ? str : str.stripColors;
	}

	/**
	 * Equivalent of console.log with various options
	 * @function
	 *
	 * @param {string} message - The message to log
	 * @param {Logger~BuildOptions} [options] - Build options
	 * @return {void}
	 */
	log(message, options) { console.log(this._build(message, { withTime: true, ...options })); }

	/**
	 * Equivalent of console.info with various options
	 * @function
	 *
	 * @param {string} message - The message to log
	 * @param {Logger~BuildOptions} [options] - Build options
	 * @return {void}
	 */
	info(message, options) { console.info(this._build(message, { withTime: true, ...options })); }

	/**
	 * Equivalent of console.warn with various options
	 * @function
	 *
	 * @param {string} message - The message to log
	 * @param {Logger~BuildOptions} [options] - Build options
	 * @return {void}
	 */
	warn(message, options) { console.warn(this._build(message, { withTime: true, ...options }).stripColors.yellow); }

	/**
	 * Equivalent of console.error with various options
	 * @function
	 *
	 * @param {string} message - The message to log
	 * @param {Logger~BuildOptions} [options] - Build options
	 * @return {void}
	 */
	error(message, options) { console.warn(this._build(message, { withTime: true, ...options }).stripColors.red); }
}
