import "colors";
import Checkers from "./Checkers.js";

/**
 * Logger
 */
export default class Logger {
	#prefix = "";
	#separator = " - ";
	#colors = true;

	/**
	 * constructor Logger
	 * @param {*} options
	 */
	constructor(options = { prefix: null, separator: null, colors: true }) {
		this.setPrefix(options.prefix);
		this.setSeparator(options.separator);
		this.enableColors(options.colors);
	}

	/* ---- Getters --------------------------------- */
	get prefix() { return this.#prefix; }
	get separator() { return this.#separator; }
	get hasColors() { return this.#colors; }

	/* ---- Setters --------------------------------- */
	setPrefix(prefix) { if (prefix) this.#prefix = prefix.toString(); }
	setSeparator(separator) { if (separator) this.#separator = separator.toString(); }
	enableColors(enable = true) { this.#colors = !!enable; }

	/* ---- Functions-------------------------------- */
	build(message, options = { withTime: true, ip: null, params: null, subLevel: false }) {
		const now = options.withTime ? (Checkers.dateToString(new Date())) : "";
		const ip = options.ip ? `[${options.ip}]` : "";
		let params = [];

		if (options.params) {
			Object.entries(options.params).forEach(([key, value]) => params.push(`${key}=${value}`));
			params = params.join(", ");
		} else params = "";

		let preSep = `${this.prefix}${now} ${ip}${this.separator}`.red;
		let postSep = `${message} ${params.gray}`;

		if (options.subLevel) {
			preSep = `${this.prefix}${" ".repeat(3)}`.gray;
			postSep = postSep.gray;
		}

		const str = `${preSep}${postSep}`;
		return this.hasColors ? str : str.stripColors;
	}

	log(message, options) { console.log(this.build(message, { withTime: true, ...options })); }
	info(message, options) { console.info(this.build(message, { withTime: true, ...options })); }
	warn(message, options) { console.warn(this.build(message, { withTime: true, ...options }).stripColors.yellow); }
	error(message, options) { console.warn(this.build(message, { withTime: true, ...options }).stripColors.red); }
}
