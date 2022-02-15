/**
 * @module addDummyData
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

const setData = async (sequelize, logger) => {
	logger.log("Inserting dummy data...");

	/* ---- modules ----------------------------- */
	await sequelize.models.module.bulkCreate([
		{
			year: 4,
			name: "BOSS",
			longName: "Business Owner",
		},
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

	/* ---- notes ----------------------------- */
	await sequelize.models.note.bulkCreate([
		{
			user_id: 1,
			module_id: 1,
			note: 14.5,
		},
	]);

	logger.log("Dummy data inserted");
};

export default setData;
