const endHandler = (request, response, next) => {
	response.on("finish", () => {
		if (request.db) request.db.release();
	});
};

export default endHandler;