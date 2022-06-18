export default {
	prefix: "/v1",
	http: {
		port: 8080,
	},
	https: {
		port: 8443,
		passphrase: "[PASSPHRASE]",
	},
	cors: {
		origin: [ "https://localhost:3000" ],
		methods: [ "POST", "GET", "PUT", "DELETE" ],
		allowedHeaders: [ "Accept", "Content-Type", "Authorization", "Brokilone" ],
		credentials: true,
	},
	jwt: {
		algorithm: "ES256",
		publicKey: "jwt-public.key",
		privateKey: "jwt-private.key",
	},
	cookies: {
		path: "/",
		sameSite: "None", /* ONLY FOR DEVELOPMENT PURPOSE. MUST BE "Lax" */
		secure: true,
	},
	uploads: {
		jobOfferAttachement: {
			fieldName: "attachements[]",
			folder: "./uploads/attachements/job-offers/",
			maxSize: 8388608, // 8 Mo
		},
	},
};
