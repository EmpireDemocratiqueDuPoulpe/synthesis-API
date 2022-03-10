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

	/* ---- jobDomain ------------------------------- */
	await sequelize.models.jobDomain.bulkCreate([
		{ job_domain_id: 1000, name: "Système" },
		{ job_domain_id: 1001, name: "Réseaux" },
		{ job_domain_id: 1002, name: "Développement web (front-end)" },
		{ job_domain_id: 1003, name: "Développement web (back-end)" },
		{ job_domain_id: 1004, name: "Développement d'application" },
		{ job_domain_id: 1005, name: "Développement d'application mobile" },
	]);

	/* ---- jobOffer -------------------------------- */
	await sequelize.models.jobOffer.bulkCreate([
		{
			type: "stage",
			title: "[21-44] Stage d’outils automatiques d’analyse données oculométriques",
			company_name: "Railenium",
			city: "Famars",
			postal_code: "59300",
			content: `
				**Qui sommes-nous ?**
				RAILENIUM, l’Institut de Recherche Technologique dédié au ferroviaire, pilote la réalisation de projets
				d’innovation collaborative en créant des partenariats entre les industriels et le monde de la recherche. Son
				ambition : devenir le référent mondial de la R&D ferroviaire.
				
				Basé dans les Hauts-de-France et en Région Parisienne, soutenu par l’Etat et la filière ferroviaire, RAILENIUM
				est adossé à un réseau d’excellence de partenaires industriels et académiques : nos collaborateurs répondent
				ensemble aux grands défis sociétaux et technologiques de la filière ferroviaire.
				
				Réunir l’ensemble des acteurs d’un projet offre un univers de travail dynamique et motivant tout en
				créant de véritables interactions entre les acteurs de la recherche.
				
				L’industrie ferroviaire européenne doit surmonter de grands défis afin d'accroitre la capacité du transport
				ferroviaire. Les infrastructures existantes âgées pour certains, requièrent des actions de maintenances efficaces
				et durables afin d’accroître le niveau de performances générales du réseau.
				
				Rejoindre RAILENIUM, c’est inventer et concevoir un transport plus sûr, plus performant et plus durable : le
				système ferroviaire de demain. Nous recherchons des hommes et des femmes de talent prêts à s’investir pour
				construire et faire vivre ces projets à nos côtés. En ce sens, RAILENIUM recherche un/une stagiaire en
				développement d’outils automatiques d’analyse de données oculométriques.

				**Ce que nous vous proposons :**
				Au-delà d’un diplôme ou d’une expérience, nous recherchons des personnalités, des challengers, des inventeurs
				dans l’âme que nous nous engageons d’accompagner afin de faire de votre parcours au sein de Railenium une
				expérience enrichissante et stimulante. Nous veillerons au développement de vos talents à travers nos pôles de
				compétences en diversifiant vos activités et vos thématiques de recherche. Aux côtés d’une équipe dynamique et
				motivée, votre quotidien vous offre un environnement de travail multi-partenarial agréable et performant où
				chacun peut se sentir libre de s’épanouir à travers de nombreux projets innovants. Venez collaborer avec les
				grands noms de l’industrie ferroviaire : Alstom, SNCF, Hitachi…. Railenium, c’est avant tout une aventure humaine
				et stimulante pour préparer le futur.

				**Description du poste :**
				Dans le cadre du projet Train Autonome Service Voyageurs, une activité de quantification de la performance de
				l’opérateur de conduite est prévue. L’objectif de cette quantification est d’aider à la définition des exigences
				de performance que les systèmes, contribuant à l’autonomie du train, devront atteindre pour ne pas la dégrader. 
				Dans ce cadre, des mesures auprès d’agents de conduite sont prévues grâce à un oculomètre : elles permettront
				notamment d’appréhender les zones de regard, la distance de détection des éléments, Etc. L’oculomètre enregistre
				un ensemble de données brutes qui, après traitement, nous permettront d’accéder à ces informations de plus haut
				niveau. Réaliser ces traitements entièrement de façon manuelle serait trop chronophage ; des outils d’analyse
				automatique sont donc fournis par le constructeur du système d’oculométrie mais ne sont cependant pas adaptés à
				toutes les situations/études. C’est pourquoi, il est nécessaire de les compléter.

				Railenium est à la recherche d’un (e) stagiaire qui aura pour activité principale de développer le code
				informatique permettant l’analyse automatique des données enregistrées par un oculomètre.

				Dans le cadre de ce stage, le/la stagiaire devra, dans un premier temps, prendre en main l’outil d’oculométrie
				et le SDK (Software Development Kit) associé au travers notamment sa documentation.

			Dans un second temps, le/la stagiaire devra proposer des améliorations et développements, qui seront testées et
			évaluées, afin de pouvoir être mise en application.

			**Vos missions principales seront donc :**
			- La définition d’algorithmes de traitement automatique des données ;
			- Le développement informatique de vos algorithmes ;
			- La validation par tests de vos développements sur la base de données et sous forme de Sprint ;
			- La rédaction des rapports de tests et d’un rapport final incluant une notice utilisateurs des développements.

			**Statut du poste :** Stagiaire
			**Temps de travail :** Temps plein
			**Date de prise de poste envisagée :** Mars 2022
			**Qui êtes-vous ?** Vous êtes étudiant dans le cadre d’un Master 2 ou école d’ingénieur dans le domaine du
			développement informatique.
			**Localisation :** Poste basé à Valenciennes
			**Modalité de recrutement :**
			**Personne en charge du recrutement :** Lucille GUERROUMI - Responsable Ressources Humaines
			**Référence de l’offre :** VN-2021-44

			Merci d’envoyer votre candidature sur le lien suivant : https://myshortlist.co/apply/railenium/1/32/apply
			Tentez par le challenge ? Soyez notre talent de demain !

			**Durée du contrat :** 6 mois
			**Date de début prévue :** 01/03/2022
			**Type d'emploi :** Temps plein, Stage
			**Salaire :** Jusqu'à 750,00€ par mois
			**Horaires :** Du Lundi au Vendredi
			**Télétravail :** Temporairement en raison du COVID-19
			`,
		},
	]);

	/* ---- jobOfferDomain -------------------------- */
	await sequelize.models.jobOfferDomain.bulkCreate([
		{ job_offer_id: 1, job_domain_id: 1004 },
	]);

	/* ---- modules --------------------------------- */
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

	/* ---- user ------------------------------------ */
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

	/* ---- study ----------------------------------- */
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

	/* ---- jobs ------------------------------------ */
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

	/* ---- notes ----------------------------------- */
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

	/* ---- compta ---------------------------------- */
	await sequelize.models.compta.bulkCreate([
		{
			user_id: 2,
			payment_type: "Comptant",
			payment_due: 28750.56,
			paid: false,
			relance: true,
		},
	]);

	logger.log("Dummy data inserted");
}

export default setData;
