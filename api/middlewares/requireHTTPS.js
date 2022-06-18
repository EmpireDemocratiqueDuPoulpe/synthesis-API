/**
 * @module RequireHTTPS
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 * @category Middlewares
 * @subcategory Request flow
 */

/**
 * Force a request to use HTTPS
 * @function
 *
 * @param {e.Request} request
 * @param {e.Response} response
 * @param {function} next
 *
 * @return {void}
 */
function requireHTTPS(request, response, next) {
	if (!request.secure && process.env.NODE_ENV !== "development") {
		return response.redirect(`https://${request.headers.host}${request.url}`);
	}

	next();
}

export default requireHTTPS;
