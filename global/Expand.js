/**
 * @module Expand
 * @category Global
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { isArray } from "lodash-es";

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
	authorizedTableNames = null;

	/* ---- Setters --------------------------------- */
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
	 * Processes the expands and calls a callback for each of them.
	 * @function
	 *
	 * @param {Array<string>} expands - Expands being processed
	 * @param {function} callback
	 */
	process(expands, callback) {
		this._sort(this._filter(expands)).map(expand => callback(Expand._extractParts(expand)));
	}
}
