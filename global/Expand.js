/**
 * @module Expand
 * @category Global
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { isArray } from "lodash-es";

const ex = {
	PERMISSION: "permission",
	CAMPUS: "campus", STUDY: "study",
	MODULE: "module", ECTS: "ects",
	JOB: "job",
	COMPTA: "compta",
};
const exPerms = {
	campus: [ "READ_CAMPUS" ],
	module: [ "READ_MODULES" ],
	ects: [ "READ_MODULES", "READ_ECTS" ],
	job: [ "READ_STUDENTS_JOBS" ],
	compta: [ "READ_COMPTA" ],
};

/**
 * Expand is used to process the parameter named "expand" passed in the route. These expand have the following format:
 * `tableName[~][<FILTER>]`.
 *
 * `[~]`: If a tilde is added to the table name, the join is optional.
 *
 * `[<FILTER>]`: An additional filter for this join.
 * @class
 *
 * @example
 * const expander = new Expand();
 * expander.setAuthorized(["books", "editors", "awards"]).process(["books", "editors<current>", "awards~"], expand => {
 *  const isRequired = expand.required ? "required" : "not required";
 *  const hasExtra = expand.how ? ` and have an extra filter (${expand.how})` : "";
 *
 * 	console.log(`The join ${expand.name} is ${isRequired}{hasExtra}.`);
 * 	// -> The join books is required.
 * 	// -> The join editors is required and have an extra filter(current).
 * 	// -> The join awards is not required.
 * });
 */
export default class Expand {
	currUser = null;
	authorizedTableNames = null;

	/**
	 * @constructor
	 *
	 * @param {module:LoggedUser} user
	 * @param {Array<string>} authorizedExpands
	 * @return {Expand}
	 */
	constructor(user = null, authorizedExpands = null) {
		if (user) this.setUser(user);
		if (authorizedExpands) this.setAuthorized(authorizedExpands);

		return this;
	}

	/* ---- Getters --------------------------------- */
	/** @type {string} - PERMISSION */ static get PERMISSION() { return ex.PERMISSION; }
	/** @type {string} - CAMPUS */ static get CAMPUS() { return ex.CAMPUS; }
	/** @type {string} - STUDY */ static get STUDY() { return ex.STUDY; }
	/** @type {string} - MODULE */ static get MODULE() { return ex.MODULE; }
	/** @type {string} - ECTS */ static get ECTS() { return ex.ECTS; }
	/** @type {string} - JOB */ static get JOB() { return ex.JOB; }
	/** @type {string} - COMPTA */ static get COMPTA() { return ex.COMPTA; }

	/* ---- Setters --------------------------------- */
	/**
	 * Sets the current user for permission checks.
	 * @function
	 *
	 * @param {module:LoggedUser} user
	 * @return {Expand}
	 */
	setUser(user) {
		this.currUser = user;
		return this;
	}

	/**
	 * Sets the authorized expands
	 * @function
	 *
	 * @param {Array<string>} tableNames - List of authorized expand/table names
	 * @return {Expand}
	 */
	setAuthorized(tableNames) {
		if (isArray(tableNames)) {
			this.authorizedTableNames = tableNames;
		}

		return this;
	}

	/* ---- Functions ------------------------------- */
	/**
	 * Filter the expands being processed.
	 * @function
	 * @private
	 *
	 * @param {Array<string>} expands - Expands being processed
	 * @return {Array<string>} - Filtered expands
	 */
	_filter(expands) {
		if (this.authorizedTableNames) {
			return expands.filter(tableName => {
				return this.authorizedTableNames.some(authorizedName => tableName.includes(authorizedName));
			});
		} else return expands;
	}

	/**
	 * Sort the expands being processed.
	 * @function
	 * @private
	 *
	 * @param {Array<string>} expands - Expands being processed
	 * @return {Array<string>} - Sorted expands
	 */
	_sort(expands) {
		if (this.authorizedTableNames) {
			return expands.sort((a, b) => {
				const nameA = Expand._extractName(a);
				const nameB = Expand._extractName(b);

				return this.authorizedTableNames.indexOf(nameA) - this.authorizedTableNames.indexOf(nameB);
			});
		} else return expands;
	}

	/**
	 * Read an "expand" and extract information from it. See the class description to get detail on processing.
	 * @function
	 * @private
	 *
	 * @param {string} expand - The "expand" being processed
	 * @return {{ name: string, required: boolean, how: (string|null) }} - Information extracted from the "expand"
	 */
	static _extractParts(expand) {
		const parts = expand.split(/(^\w+)/).filter(Boolean);
		const build = { name: parts[0], required: true, how: null };
		parts.shift();

		if (parts.length > 0) {
			build.required = !parts.includes("~");
			build.how = parts.some(part => /^<\w+>$/.test(part)) ? expand.split("<").pop().split(">")[0] : null;
		}

		return build;
	}

	/**
	 * Read an "expand" and extract only its name. See the class description to get detail on processing.
	 * @function
	 * @private
	 *
	 * @param {string} expand - The "expand" being processed
	 * @return {string} - The "expand" name
	 */
	static _extractName(expand) {
		return Expand._extractParts(expand).name;
	}

	/**
	 * Filters an array asynchronously.
	 * @function
	 * @async
	 * @private
	 *
	 * @see From [this StackOverflow answer](https://stackoverflow.com/a/46842181).
	 *
	 * @example
	 * const numbers = await this._asyncFilter([1, 2, 3], async (number) => {
	 *   return await excludeOddButAsync(number);
	 * });
	 * console.log(numbers) // -> [2]
	 *
	 * @param {Array<*>} arr
	 * @param {function} callback - Asynchronous callback with the current item
	 * @return {Promise<Array>} - The filtered array
	 */
	async _asyncFilter(arr, callback) {
		const fail = Symbol();
		return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail))).filter(i => i !== fail);
	}

	/**
	 * Processes the expands and calls a callback for each of them.
	 * @function
	 *
	 * @param {Array<string>} expands - Expands being processed
	 * @param {function} callback
	 */
	async process(expands, callback) {
		const splittedExpands = this._sort(this._filter(expands)).map(ex => Expand._extractParts(ex));
		const usableExpands = await this._asyncFilter(splittedExpands, async splittedEx => {
			if (this.currUser && exPerms[splittedEx.name]) {
				return await this.currUser.hasAllPermissions(exPerms[splittedEx.name]);
			} return true;
		});

		usableExpands.map(callback);
	}
}
