/**
 * @module EndHandler
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 * @category Middlewares
 * @subcategory Request flow
 */

/**
 * @function
 *
 * @param {e.Request} request
 * @param {e.Response} response
 * @param {e.NextFunction} next
 */
function endHandler(request, response, next) {
	response.on("finish", () => {
		if (request.db) request.db.release();
	});

	next();
}

/* ---- Export ---------------------------------- */
export default endHandler;
