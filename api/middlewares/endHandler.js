/**
 * @module EndHandler
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

/**
 * @function
 * @memberOf module:EndHandler
 *
 * @param {e.Request} request
 * @param {e.Response} response
 * @param {e.NextFunction} next
 */
const endHandler = (request, response, next) => {
	response.on("finish", () => {
		if (request.db) request.db.release();
	});

	next();
};

/* ---- Export ---------------------------------- */
/** @export EndHandler */
export default endHandler;
