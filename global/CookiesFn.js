/**
 * @module CookiesFn
 * @category Global
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { API } from "../config/config.js";

/**
 * Split the JWT token and set it as a cookie
 * @function
 *
 * @param {e.Response} response
 * @param {string} token
 */
function setTokenCookie(response, token) {
	const tokenParts = token.split(".");
	const tokenPayload = tokenParts.slice(0, -1).join(".");
	const tokenSignature = tokenParts.slice(-1)[0];
	const options = { ...API.cookies, maxAge: 25200000 };

	response.cookie("tokenPayload", tokenPayload, options);
	response.cookie("tokenSignature", tokenSignature, { ...options, httpOnly: true });
}

export default { setTokenCookie };
