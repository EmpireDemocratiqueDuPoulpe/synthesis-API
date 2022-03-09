/**
 * @module addDummyData
 * @category Sequelize
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 *
 * @requires Sequelize
 */

/**
 * Add dummy data in the database
 * @function
 *
 * @param {Sequelize} sequelize
 * @param {module:Logger|Console} logger
 * @return {Promise<void>}
 */
async function setData(sequelize, logger) {
	logger.log("Inserting dummy data...");

	/* ---- modules ----------------------------- */
	await sequelize.models.module.bulkCreate([
		{ module_id: 1000, year: 4, name: "BOSS", long_name: "Business Owner", ects: 3 },
		{ module_id: 1001, year: 1, name: "WORK", long_name: null, ects: 3 },
		{ module_id: 1002, year: 1, name: "TEAM", long_name: null, ects: 2 },
		{ module_id: 1003, year: 1, name: "PROG", long_name: null, ects: 4 },
		{ module_id: 1004, year: 2, name: "PYTH", long_name: null, ects: 4 },
		{ module_id: 1005, year: 2, name: "O365", long_name: null, ects: 3 },
		{ module_id: 1006, year: 2, name: "GRAP", long_name: null, ects: 2 },
		{ module_id: 1007, year: 2, name: "AWSP", long_name: null, ects: 3 },
		{ module_id: 1008, year: 2, name: "ALGO", long_name: null, ects: 1 },
		{ module_id: 1009, year: 2, name: "PMGT", long_name: null, ects: 2 },
		{ module_id: 1010, year: 2, name: "DVST", long_name: null, ects: 4 },
		{ module_id: 1011, year: 2, name: "PHPD", long_name: null, ects: 3 },
		{ module_id: 1012, year: 2, name: "UIXD", long_name: null, ects: 4 },
		{ module_id: 1013, year: 2, name: "AGIL", long_name: null, ects: 2 },
		{ module_id: 1014, year: 2, name: "DVSC", long_name: null, ects: 3 },
		{ module_id: 1015, year: 2, name: "VRAR", long_name: null, ects: 4 },
		{ module_id: 1016, year: 2, name: "BAEX", long_name: null, ects: 2 },
		{ module_id: 1017, year: 2, name: "MERN", long_name: null, ects: 4 },
		{ module_id: 1018, year: 2, name: "CCNA", long_name: null, ects: 3 },
		{ module_id: 1019, year: 2, name: "BOSS", long_name: null, ects: 3 },
		{ module_id: 1020, year: 2, name: "GDPR", long_name: null, ects: 3 },
		{ module_id: 1021, year: 2, name: "PENE", long_name: null, ects: 3 },
		{ module_id: 1022, year: 2, name: "DATA", long_name: null, ects: 3 },
		{ module_id: 1023, year: 2, name: "DOKR", long_name: null, ects: 3 },
		{ module_id: 1024, year: 2, name: "KUBE", long_name: null, ects: 2 },
		{ module_id: 1025, year: 2, name: "DATA", long_name: null, ects: 2 },
		{ module_id: 1026, year: 2, name: "RBIG", long_name: null, ects: 3 },
		{ module_id: 1027, year: 2, name: "ENGL", long_name: null, ects: 4 },
		{ module_id: 1028, year: 2, name: "MDDP", long_name: null, ects: 4 },
		{ module_id: 1029, year: 2, name: "CCNA", long_name: null, ects: 3 },
		{ module_id: 1030, year: 2, name: "ITIL", long_name: null, ects: 4 },
	]);

	/* ---- permissions ----------------------------- */
	/*
	 Setting `permission_id` makes AUTO_INCREMENT stay at one.
	 To avoid this, these IDs start at 1001.
	*/
	await sequelize.models.permission.bulkCreate([
		{ permission_id: 1001, name: "READ_STUDENTS", name_localized: "" },
		{ permission_id: 1002, name: "READ_OLD_STUDENTS", name_localized: "" },
		{ permission_id: 1003, name: "READ_STUDENTS_JOBS", name_localized: "" },
		{ permission_id: 1004, name: "READ_STUDENTS_COMPANIES", name_localized: "" },
		{ permission_id: 1005, name: "READ_SCTS", name_localized: "" },
		{ permission_id: 1006, name: "READ_PLANNINGS", name_localized: "" },
		{ permission_id: 1007, name: "READ_CAMPUS", name_localized: "" },
		{ permission_id: 1008, name: "READ_MODULES", name_localized: "" },
		{ permission_id: 1009, name: "READ_NOTES", name_localized: "" },
		{ permission_id: 1010, name: "READ_ECTS", name_localized: "" },
		{ permission_id: 1011, name: "READ_RESITS", name_localized: "" },
		{ permission_id: 1012, name: "READ_INTERNSHIP_OFFERS", name_localized: "" },
		{ permission_id: 1013, name: "READ_COMPTA", name_localized: "" },
		{ permission_id: 1014, name: "EDIT_NOTES", name_localized: "" },
		{ permission_id: 1015, name: "EDIT_ACHIEVEMENT_CRTS", name_localized: "" },
		{ permission_id: 1016, name: "MANAGE_ABSENCES", name_localized: "" },
		{ permission_id: 1017, name: "MANAGE_PARTNERSHIPS", name_localized: "" },
		{ permission_id: 1018, name: "MANAGE_INTERNSHIP_OFFERS", name_localized: "" },
		{ permission_id: 1019, name: "MANAGE_INTERNSHIP_CONTRACTS", name_localized: "" },
		{ permission_id: 1020, name: "SEND_MAILS", name_localized: "" },
		{ permission_id: 1021, name: "SYNC_DATA", name_localized: "" },
		{ permission_id: 1022, name: "EXPORT_DATA", name_localized: "" },
	]);

	/* ---- position -------------------------------- */
	await sequelize.models.position.bulkCreate([
		/*{ name: "Administrateur" },
		{ name: "Directeur académique" },
		{ name: "Coordinateur" },
		{ name: "Full Professor" },
		{ name: "Intervenant" },
		{ name: "Élève" },*/
		{ name: "Admin. plateforme" },
		{ name: "Direction académique" },
		{ name: "Administration" },
		{ name: "Pédagogie" },
		{ name: "Étudiant" },
	]);

	/* ---- positionPermissions --------------------- */
	await sequelize.models.positionPermissions.bulkCreate([
		// Admin. plateforme
		{ position_id: 1, permission_id: 1021 },
		{ position_id: 1, permission_id: 1022 },

		// Direction académique
		{ position_id: 2, permission_id: 1001 },
		{ position_id: 2, permission_id: 1007 },
		{ position_id: 2, permission_id: 1010 },
		{ position_id: 2, permission_id: 1008 },
		{ position_id: 2, permission_id: 1011 },
		{ position_id: 2, permission_id: 1014 },
		{ position_id: 2, permission_id: 1015 },
		{ position_id: 2, permission_id: 1002 },
		{ position_id: 2, permission_id: 1017 },

		// Administration
		{ position_id: 3, permission_id: 1019 },
		{ position_id: 3, permission_id: 1013 },

		// Pédagogie
		{ position_id: 4, permission_id: 1001 },
		{ position_id: 4, permission_id: 1006 },
		{ position_id: 4, permission_id: 1008 },
		{ position_id: 4, permission_id: 1005 },
		{ position_id: 4, permission_id: 1014 },
		{ position_id: 4, permission_id: 1010 },
		{ position_id: 4, permission_id: 1003 },
		{ position_id: 4, permission_id: 1004 },
		{ position_id: 4, permission_id: 1016 },
		{ position_id: 4, permission_id: 1018 },
		{ position_id: 4, permission_id: 1020 },

		// Étudiant
		{ position_id: 5, permission_id: 1008 },
		{ position_id: 5, permission_id: 1010 },
		{ position_id: 5, permission_id: 1009 },
		{ position_id: 5, permission_id: 1006 },
		{ position_id: 5, permission_id: 1013 },
		{ position_id: 5, permission_id: 1012 },
	]);

	/* ---- User ------------------------------------ */
	await sequelize.models.user.bulkCreate([
		{
			"position_id": 1,
			"first_name": "Sir Edward",
			"last_name": "Weak Ass",
			"birth_date": "968-06-24",
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
		{
			"position_id": 5,
			"first_name": "Jay",
			"last_name": "Raté Mon Année À L'Aide",
			"birth_date": "2002-06-24",
			"email": "jay.rate@forni.te",
			"password": "$2b$10$sbcqNmQi3DoIDQG1zbB9degN.toQN4hn2T562.yubcPvDra/RT46.", // "Mot De P4sse"
			"address": {
				"street": "Tomato Plaza",
				"city": "Map de frotnite",
				"postalCode": "0000",
			},
			"gender": "Homme",
			"region": "France",
			"status": "élève",
			"campus": "Lille",
		},
		{
			"position_id": 5,
			"first_name": "Test",
			"last_name": "Testf",
			"birth_date": "2021-06-24",
			"email": "tedst@caramail.co.uk",
			"password": "$2b$10$sbcqNmQi3DoIDQG1zbB9degN.toQN4hn2T562.yubcPvDra/RT46.", // "Mot De P4sse"
			"address": {
				"street": "This is my street.",
				"city": "London",
				"postalCode": "45789",
			},
			"gender": "Knight",
			"region": "UK",
			"status": "élève",
			"campus": "Lille",
		},
	]);

	/* ---- studies ----------------------------- */
	await sequelize.models.study.bulkCreate([
		{
			study_id: 1,
			entry_level: 1,
			exit_level: 5,
			previous_level: 4,
			current_level: 5,
			entry_date: "06/01/22 04:11:05",
			exit_date: "06/01/22 04:11:05",
			user_id: 1,
		},
	]);

	/* ---- jobs ----------------------------- */
	await sequelize.models.job.bulkCreate([
		{
			job_id: 1,
			job_type: "alternance",
			start_date: "06/01/22 04:11:05",
			end_date: "06/01/22 04:11:05",
			company_name: "supinfo",
			is_hired: false,
			user_id: 1,
		},
		{
			job_id: 2,
			job_type: "stage",
			start_date: "06/01/22 04:11:05",
			end_date: "06/01/22 04:11:05",
			company_name: "supinfo",
			is_hired: false,
			user_id: 1,
		},
	]);


	/* ---- notes ----------------------------- */
	await sequelize.models.note.bulkCreate([
		{ user_id: 1, module_id: 1000, note: 14.5 },
		{ user_id: 1, module_id: 1001, note: 14.5 },
		{ user_id: 1, module_id: 1002, note: 14.5 },
		{ user_id: 1, module_id: 1003, note: 14.5 },
		{ user_id: 1, module_id: 1004, note: 14.5 },
		{ user_id: 1, module_id: 1005, note: 14.5 },
		{ user_id: 1, module_id: 1006, note: 14.5 },
		{ user_id: 1, module_id: 1007, note: 14.5 },
		{ user_id: 1, module_id: 1008, note: 14.5 },
		{ user_id: 1, module_id: 1009, note: 14.5 },
		{ user_id: 1, module_id: 1010, note: 14.5 },
		{ user_id: 1, module_id: 1011, note: 14.5 },
		{ user_id: 1, module_id: 1012, note: 14.5 },
		{ user_id: 1, module_id: 1013, note: 14.5 },
		{ user_id: 1, module_id: 1014, note: 14.5 },
		{ user_id: 1, module_id: 1015, note: 14.5 },
		{ user_id: 1, module_id: 1016, note: 14.5 },
		{ user_id: 1, module_id: 1017, note: 14.5 },
		{ user_id: 1, module_id: 1018, note: 14.5 },
		{ user_id: 1, module_id: 1019, note: 14.5 },
		{ user_id: 1, module_id: 1020, note: 14.5 },
	]);

	/* ---- comptas ----------------------------- */
	await sequelize.models.compta.bulkCreate([
		{
			user_id: 1,
			payment_type: "Comptant",
			payment_due: 28750.56,
			paid: false,
			relance: true,
		},
	]);

	logger.log("Dummy data inserted");
}

export default setData;
