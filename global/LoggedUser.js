/**
 * @module LoggedUser
 * @category Global
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { isArray } from "lodash-es";
import { Permission } from "../api/interfaces/interfaces.js";

/**
 * A user object stored in a JWT token
 * @typedef {Object} LoggedUser~JWTObject
 * @property {string|int} sub - User ID
 * @property {string} uuid
 * @property {string} given_name - First name
 * @property {string} family_name - Last name
 * @property {string|null} picture - Link to the user's avatar
 * @property {string} email
 * @property {string} gender
 * @property {string} birthdate
 * @property {string} groups - Groups of the user (CURRENTLY NOT USED)
 * @property {Study} study
 */

/**
 * LoggedUser is a wrapper for the basic user object. It adds multiple functions such as permission checkers, ...
 * @class
 *
 * @example
 * const user = new LoggedUser({ ... });
 */
export default class LoggedUser {
	permissions = null;

	/** @param {LoggedUser~JWTObject} userObj */
	constructor(userObj) {
		const propMapping = { sub: "userID", first_name: "firstName", last_name: "lastName" };

		for (const [key, value] of Object.entries(userObj)) {
			const targetKey = propMapping[key] ?? key;
			this[targetKey] = value;
		}

		return this;
	}

	/* ---- Functions ------------------------------- */
	/**
	 * Updates the user permissions.
	 * @function
	 * @async
	 *
	 * @return {LoggedUser} - Instance of current user
	 */
	async updatePermissions() {
		if (this.uuid) {
			const resp = await Permission.getByUUID(this.uuid);
			this.permissions = resp.data.permissions;
		}

		return this;
	}

	/**
	 * Makes sure that the value of `permission` is an array
	 * @function
	 * @private
	 *
	 * @param {Array<string>|string} permission
	 * @return {Array<string>}
	 */
	_toArray(permission) {
		return isArray(permission) ? permission : [permission];
	}

	/**
	 * Returns true if the user has this permission.
	 * @function
	 * @private
	 *
	 * @param {string} permission
	 * @return {boolean}
	 */
	_hasPermission(permission) {
		return this.permissions.includes(permission);
	}

	/**
	 * Check if the user has the given permission(s). Return an object with true/false for each permission.
	 * @function
	 * @async
	 *
	 * @param {Array<string>|string} permissions
	 *
	 * @example
	 * const user = new LoggedUser({ ... });
	 * console.log(user.hasPermissions([ "SYNC_DATA", "READ_STUDENTS" ])); // ->
	 * // {
	 * //   "SYNC_DATA": false,
	 * //   "READ_STUDENTS": true
	 * // }
	 *
	 * @return {Promise<Object<boolean>>}
	 */
	async hasPermissions(permissions) {
		if (!this.permissions) await this.updatePermissions();
		const perms = {};

		for (const permission of this._toArray(permissions)) {
			perms[permission] = this._hasPermission(permission);
		}

		return perms;
	}

	/**
	 * Returns true if the user has **all** the given permission(s).
	 * @function
	 * @async
	 *
	 * @param {Array<string>|string} permissions
	 *
	 * @example
	 * const user = new LoggedUser({ ... });
	 * console.log(user.hasAllPermissions([ "SYNC_DATA", "READ_STUDENTS" ])); // -> false
	 * console.log(user.hasAllPermissions([ "READ_STUDENTS", "READ_OLD_STUDENTS" ])); // -> true
	 *
	 * @return {Promise<boolean>}
	 */
	async hasAllPermissions(permissions) {
		if (!this.permissions) await this.updatePermissions();
		return this._toArray(permissions).every(p => this._hasPermission(p));
	}
}
