/**
 * @module addDummyData
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

const setData = async (sequelize, logger) => {
	logger.log("Inserting dummy data...");

	/* ---- Position -------------------------------- */
	await sequelize.models.Position.bulkCreate([
		{ name: "Administrateur" },
		{ name: "Directeur académique" },
		{ name: "Coordinateur" },
		{ name: "Full Professor" },
		{ name: "Intervenant" },
		{ name: "Élève" },
	]);

	/* ---- User ------------------------------------ */
	await sequelize.models.User.bulkCreate([
		{
			"position_id": 1,
			"first_name": "Sir Edward",
			"last_name": "Weak Ass",
			"birth_date": "2021-06-24",
			"email": "siredward.weakass@caramail.co.uk",
			"password": "$2b$10$sbcqNmQi3DoIDQG1zbB9degN.toQN4hn2T562.yubcPvDra/RT46.", // "Mot De P4sse"
			"address": {
				"street": "This is my street.",
				"city": "London",
				"postalCode": "45789",
			},
			"gender": "Knight",
			"region": "UK",
			"status": "full professor",
			"campus": "Distanciel",
		},
	]);

	logger.log("Dummy data inserted");
};

export default setData;
