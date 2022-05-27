export default {
	info: {
		title: "Campus Booster en mieux - API",
		description: "We exist.",
		termsOfService: "N/A",
		contact: {
			name: "API Support",
			url: "https://github.com/EmpireDemocratiqueDuPoulpe/campus-booster-en-mieux-API/issues",
			email: "alexis.lecomte@supinfo.com",
		},
		license: {
			name: "GNU GPLv3",
			url: "https://github.com/EmpireDemocratiqueDuPoulpe/campus-booster-en-mieux-API/blob/master/LICENSE.md",
		},
		version: "1.0.1",
	},
	security: {
		BearerAuth: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT",
		},
	},
	filesPattern: [ "./api/api.js", "./api/routes/*.js" ],
	swaggerUIPath: "/route-docs",
	exposeSwaggerUI: true,
	exposeApiDocs: false,
	apiDocsPath: "/v3/route-docs",
	notRequiredAsNullable: false,
	swaggerUiOptions: {
		displayRequestDuration: true,
	},
};
