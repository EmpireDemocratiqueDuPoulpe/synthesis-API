/**
 * Merge `tokenPayload` and `tokenSignature`
 * @function
 *
 * @param {e.Request} request
 * @param {e.Response} response
 * @param {e.NextFunction} next
 */
export default function tokenAssembler(request, response, next) {
	const { tokenPayload, tokenSignature } = parseCookies(request.headers.cookie);

	if (tokenPayload && tokenSignature) {
		const token = `${tokenPayload}.${tokenSignature}`;
		request.headers["authorization"] = `Bearer ${token}`;
	}

	next();
}

/**
 * Parse the cookie string to an Object
 * @function
 *
 * @param {string} cookies
 * @return {Object}
 */
function parseCookies(cookies) {
	if (!cookies) return {};
	const rawCookies = cookies.split("; ");
	const parsedCookies = {};

	for (const cookie of rawCookies) {
		const parsed = cookie.split("=");
		parsedCookies[parsed[0]] = parsed[1];
	}

	return parsedCookies;
}
