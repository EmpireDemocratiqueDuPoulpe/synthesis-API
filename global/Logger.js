import "colors";
import Checkers from "./Checkers.js";

/**
 * Initialization option of the logger
 * @typedef {Object} Logger~InitOptions
 * @property {string|null} [prefix=""] - Prefix is used at the beginning of the log
 * @property {string|null} [separator=" - "] - Separator is the string that separates the date from the log message
 * @property {boolean} [colors=true] - Colors is used to control whether the log should have colors or not
 */

/**
 * Build option of the logger
 * @typedef {Object} Logger~Options
 * @property {boolean} [withTime=true] - Must show time before the log message
 * @property {string|null} [ip=null] - The IP address of the user who triggered this log message
 * @property {Object|null} [params=null] - A list of parameters to log
 * @property {boolean} [subLevel=false] - Mark this log message as a sub-level log message
 */

/**
 * Logger used on top of console
 * @class
 * @public
 */
export default class Logger {
	#prefix = "";
	#separator = " - ";
	#colors = true;

	/**
	 * @constructor
	 * @param {Logger~InitOptions} [options] - The initialization options of the Logger
	 */
	constructor(options = { prefix: null, separator: null, colors: true }) {
		this.setPrefix(options.prefix);
		this.setSeparator(options.separator);
		this.enableColors(options.colors);
	}

	/* ---- Setters --------------------------------- */
	/**
	 * Changes the prefix
	 * @param {string} prefix - The new prefix
	 * @return {void}
	 */
	setPrefix(prefix) { if (prefix) this.#prefix = prefix.toString(); }

	/**
	 * Changes the separator
	 * @param {string} separator - The new separator
	 * @return {void}
	 */
	setSeparator(separator) { if (separator) this.#separator = separator.toString(); }

	/**
	 * Used to enable or disable colors in log messages
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
	 * Build the complete log message to show
	 * @private
	 * @param {string} message - The message to log
	 * @param {Logger~Options} options - Build options
	 * @return {string} - The message once it has been built
	 */
	build(message, options = { withTime: true, ip: null, params: null, subLevel: false }) {
		const now = options.withTime ? (Checkers.dateToString(new Date())) : "";
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
	 * @param {string} message - The message to log
	 * @param {Logger~Options} [options] - Build options
	 * @return {void}
	 */
	log(message, options) { console.log(this.build(message, { withTime: true, ...options })); }

	/**
	 * Equivalent of console.info with various options
	 * @param {string} message - The message to log
	 * @param {Logger~Options} [options] - Build options
	 * @return {void}
	 */
	info(message, options) { console.info(this.build(message, { withTime: true, ...options })); }

	/**
	 * Equivalent of console.warn with various options
	 * @param {string} message - The message to log
	 * @param {Logger~Options} [options] - Build options
	 * @return {void}
	 */
	warn(message, options) { console.warn(this.build(message, { withTime: true, ...options }).stripColors.yellow); }

	/**
	 * Equivalent of console.error with various options
	 * @param {string} message - The message to log
	 * @param {Logger~Options} [options] - Build options
	 * @return {void}
	 */
	error(message, options) { console.warn(this.build(message, { withTime: true, ...options }).stripColors.red); }
}
