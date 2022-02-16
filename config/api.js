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

	},
	jwt: {
		algorithm: "ES256",
		publicKey: "jwt-public.key",
		privateKey: "jwt-private.key",
	},
	cookies: {
		path: "/",
		sameSite: "Lax",
		secure: true,
	},
};
