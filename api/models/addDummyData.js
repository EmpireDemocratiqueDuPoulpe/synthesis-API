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

	/*
	 In PostgreSQL, inserting rows with a specified ID does not change AUTO_INCREMENT.
	 To avoid this, the IDs are defined as 10000+ to avoid any conflict.
	*/
	/* ---- campus ---------------------------------- */
	await sequelize.models.campus.bulkCreate([
		{
			campus_id: 10000, name: "Caen",
			address_street: "123 rue des phalempins", address_city: "France", address_postal_code: "AZERTY",
		},
		{
			campus_id: 10001, name: "Distanciel",
			address_street: "123 rue des phalempins", address_city: "France", address_postal_code: "AZERTY",
		},
		{
			campus_id: 10002, name: "Lille",
			address_street: "123 rue des phalempins", address_city: "France", address_postal_code: "AZERTY",
		},
		{
			campus_id: 10003, name: "Lyon",
			address_street: "123 rue des phalempins", address_city: "France", address_postal_code: "AZERTY",
		},
		{
			campus_id: 10004, name: "Paris",
			address_street: "123 rue des phalempins", address_city: "France", address_postal_code: "AZERTY",
		},
		{
			campus_id: 10005, name: "Tours",
			address_street: "123 rue des phalempins", address_city: "France", address_postal_code: "AZERTY",
		},
		{
			campus_id: 10006, name: "Rennes",
			address_street: "123 rue des phalempins", address_city: "France", address_postal_code: "AZERTY",
		},
	]);

	/* ---- jobDomain ------------------------------- */
	await sequelize.models.jobDomain.bulkCreate([
		{ job_domain_id: 10000, name: "Système" },
		{ job_domain_id: 10001, name: "Réseaux" },
		{ job_domain_id: 10002, name: "Développement web (front-end)" },
		{ job_domain_id: 10003, name: "Développement web (back-end)" },
		{ job_domain_id: 10004, name: "Développement d'application" },
		{ job_domain_id: 10005, name: "Développement d'application mobile" },
	]);

	/* ---- jobOffer -------------------------------- */
	await sequelize.models.jobOffer.bulkCreate([
		{
			job_offer_id: 10000,
			type: "stage",
			title: "[21-44] Stage d’outils automatiques d’analyse données oculométriques",
			company_name: "Railenium",
			city: "Famars",
			postal_code: "59300",
			content: `**Qui sommes-nous ?**
 RAILENIUM, l’Institut de Recherche Technologique dédié au ferroviaire, pilote la réalisation de projets
 d’innovation collaborative en créant des partenariats entre les industriels et le monde de la recherche. Son
 ambition : devenir le référent mondial de la R&D ferroviaire.
 
 Basé dans les Hauts-de-France et en Région Parisienne, soutenu par l’État et la filière ferroviaire, RAILENIUM
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

**Télétravail :** Temporairement en raison du COVID-19`,
		},
		{
			job_offer_id: 10001,
			type: "alternance",
			title: "Full Stack Developer",
			company_name: "Frizbiz",
			city: "Lille",
			postal_code: "59300",
			content: `**L’entreprise :**
Connecter des personnes ayant besoin d’un coup de main pour aménager leur habitat avec des personnes disponibles
qui savent le faire. Nous sommes LA plateforme des services de l’aménagement et du bien-être chez soi. Grâce à
notre communauté de +100 000 jobbers qualifiés à travers la France, nous apportons un service réactif et fiable
aux millions de Français ayant besoin d’aide ponctuellement pour améliorer leur habitat.

Chez Frizbiz, nous souhaitons créer l’équipe la plus brillante et ambitieuse possible et ciblons des profils
audacieux et proactifs nous permettant de toujours garder une longueur d’avance !

Nous attachons une forte importance au wellbeing et à la qualité de vie au travail. Nous offrons à nos
collaborateurs un cadre de travail exceptionnel au sein de nos locaux à Euratechnologies. Nous œuvrons pour que
chacun puisse vivre une expérience inédite au quotidien en offrant des conditions de travail top !

**Contexte :**
Frizbiz souhaite renforcer son équipe technique autour d’une nouvelle stack technique (Typescript, node.js,
NestJS, Microservices, vue.js, Nuxt…) et d’une codebase toute fraîche, et ainsi construire une équipe IT
brillante et innovante ! Aujourd’hui composée d’une vingtaine de collaborateurs, nous recherchons des profils
enthousiastes et passionnés. L’équipe est ouverte aux nouvelles tendances et différentes stacks techniques nous
permettant de répondre de façon appropriée aux exigences métiers et d’atteindre l’excellence, en intégrant du
temps pour la veille, la R&D, POC, contribution open source, rédiger des articles techniques… Les challenges à
venir sont portés sur des sujets comme la réalité augmentée, l’IA, Big Data, Data Mining, Open Data et Open Api…

Nous recherchons un développeur javascript full stack senior avec de solides compétences techniques ainsi que de
bonnes notions d’UX et UI. Celui-ci doit être capable d’intervenir sur les phases de conception, réalisation,
mise en production et maintenance du back-end, de son APIs et des applications web et de leurs interfaces
utilisateurs qui l'interrogent. Il évolue sur une codebase et stack technique (Typescript, node.js, NestJS,
Microservices, vue.js, Nuxt…) qui vient progressivement remplacer la codebase existante (Ruby, Rails). Il
délivre en continue des features à haute valeur ajoutée pour nos utilisateurs, en écrivant du code de qualité,
maintenable et scalable.

**Tes missions :**
- Participer à l’évolution et la maintenance des projets backend / APIs et des projets webs.
- Création de maquettes sur Sketch sur la base des livrables de l’UX / UI si existants (Charte, Design système,
\tpréconisations...)
- Concevoir le modèle de données, de l’architecture technique et fonctionnelle, du découpage en micro-services,
\tdu design de l’API et de l’infrastructure.
- Fournir des préconisations et solutions techniques à destination de l’équipe produit et relire les
\tspécifications / US.
- Rédiger les tests unitaires, d’acceptances et end to end.
- S’assurer de la qualité du code grâce à des outils d’analyse du code automatique, à la relecture de code sur
\tl’ensemble des projets…
- Documenter l’API via swagger et Postman.
- Partager la veille et anticiper les nouvelles pratiques et opportunités techniques.
- Mentorer les autres développeurs, animer des démos, ateliers et rédiger des articles techniques.
- Participer aux travaux de R&D, POC, design sprint, contribution open source.

**Notre Stack :**
- Javascript, Typescript, node.js, NestJS, Fastify, Ruby, Rails
- TypeOrm, PostgreSQL, MySQL, MongoDB, Redis
- Architecture : microservices, API REST, Swagger
- Testing: Jest, cucumber, newman
- CI & CD : Gitlab CI
- Infra : AWS, Heroku
- Monitoring & logging : Elastic Cloud, elasticsearch, kibana
- Services externes: Stripe, Sendgrid, Google Places, Slack, S3…

**Notre équipe :**
Aujourd’hui composé d’une vingtaine de collaborateurs agréables et talentueux, tu évolueras au sein de l’équipe
IT composé de 6 personnes :

- 1 CTO
- 1 Product Owner (poste ouvert)
- 3 développeurs Full Stack (Javascript / TypeScript) (2 poste ouvert)
- 1 développeur Android (Kotlin)

**Ce que frizbiz peut t’apporter :**
- Une expérience professionnelle enrichissante sur des technos au top et avec des challenges ambitieux.
- Un salaire et des avantages compétitifs (mutuelle d’entreprise, parking, trajet domicile-travail, rtt,
\ttélétravail…)
- Un macbook pro ou la machine de ton choix a usage pro / perso.
- Un cadre de travail au top, avec un open space, 2 salles de réunions et un grand espace de pause.
- des conditions de travail top avec : conciergerie, panier de fruit, remote et un équilibre entre vie
\tprofessionnelle et vie privée préservé.
- Une équipe à taille humaine avec un esprit d’équipe, start-up et entrepreneurial.
- Possibilité d’assister à des conférences, d’animer des talks, de rédiger des articles tech… de t’épanouir et
\trenforcer ta présence dans le monde de la tech.
- Apéros, déjeuners, goûters, table de ping-pong, jeux de société, console de jeux vidéo…

**Ton profil :**
- Tu es issue d’une formation initiale en informatique, qui t’as permis d’acquérir de solides bases théoriques.
- Tu as 5 ans ou plus d'expérience dans le développement full stack et plus précisément sur javascript /
\ttypescript et Node.JS / Vue.js.
- Tu es passionné par l’univers du web et les nouvelles technologies.
- Tu aimes évoluer avec les méthodologies Agiles (Lean, Scrum, Kanban, TDD, DDD, BDD).

**Tes qualitées :**
- Esprit d’équipe, partage et humilité
- Organisation, rigueur, capacité d’analyse et de synthèse
- Force de proposition, Initiative et Pro-activité
- Capacité d’adaptation
- passionné

**Tes compétences techniques :**
- Maîtrise de javascript (plus si typescript), Node.js, mais également bonne connaissance dans d'autres langages
\tweb comme Ruby, Python..
- Maîtrise d’un frameworks back node.js idéalement NestJS et front Vue.js.
- Maîtrise des bases SQL (PostgreSQL) et NoSQL (MongoDB, elasticsearch) ainsi que de leur langage de requêtage.
- Maîtrise du langage de programmation HTML5, CSS3, javascript et des bonnes pratiques associées
- Maîtrise des normes W3C, des règles d’ergonomie, d’accessibilité, normes W3C, SEO, des concepts responsive
\tdesign, mobile first...
- Maîtrise des outils de tests (jest, cucumber), d’intégration et déploiement continue.
- Connaissance avancée des sujets UX / UI
- Connaissance avancée des architectures applicatives OOP, MVC, d’algorithmie, des design patterns, job
\tasynchrone, tâches cron, microservices, message broker (Redis), serverless…
- Bonne Connaissance des normes et spécifications REST, Open API, OAUTH, Gherkin, GraphQL
- Bonne connaissance devops et infrastructure (docker, kubernetes, API Gateway, AWS, Heroku…)

**Déroulement des entretiens :**
1. Première prise de contact téléphonique
2. Test technique d’une heure maximum en remote
3. Entretien avec notre CTO puis avec l’un des fondateurs`,
			expiration_date: new Date(Date.now() - ((3600 * 1000 * 24) * 2)),
		},
	]);

	/* ---- jobOfferDomain -------------------------- */
	await sequelize.models.jobOfferDomain.bulkCreate([
		{ job_offer_id: 10000, job_domain_id: 10004 },
		{ job_offer_id: 10001, job_domain_id: 10000 },
		{ job_offer_id: 10001, job_domain_id: 10002 },
		{ job_offer_id: 10001, job_domain_id: 10003 },
		{ job_offer_id: 10001, job_domain_id: 10005 },
	]);

	/* ---- attachements ---------------------------- */
	await sequelize.models.attachement.bulkCreate([
		{
			attachement_id: 10000, job_offer_id: 10000,
			name: "Elecheems",
			path: "attachements/job-offers/attachement-1651512233662-ab7c52b6-4e51-42cc-90dd-a00269dd2be0.jpg",
			size: "3072",
			type: "image/jpeg",
		},
	]);

	/* ---- modules --------------------------------- */
	await sequelize.models.module.bulkCreate([
		{ module_id: 10006, year: 1, name: "GRAP", long_name: null, ects: 2 },
		{ module_id: 10007, year: 1, name: "AWSP", long_name: null, ects: 3 },
		{ module_id: 10008, year: 1, name: "ALGO", long_name: null, ects: 1 },
		{ module_id: 10009, year: 1, name: "PMGT", long_name: null, ects: 2 },
		{ module_id: 10010, year: 1, name: "DVST", long_name: null, ects: 4 },
		{ module_id: 10011, year: 1, name: "PHPD", long_name: null, ects: 3 },
		{ module_id: 10012, year: 2, name: "UIXD", long_name: null, ects: 4 },
		{ module_id: 10013, year: 2, name: "AGIL", long_name: null, ects: 2 },
		{ module_id: 10014, year: 2, name: "DVSC", long_name: null, ects: 3 },
		{ module_id: 10015, year: 2, name: "VRAR", long_name: null, ects: 4 },
		{ module_id: 10016, year: 2, name: "BAEX", long_name: null, ects: 2 },
		{ module_id: 10017, year: 2, name: "MERN", long_name: null, ects: 4 },
		{ module_id: 10018, year: 3, name: "CCNA", long_name: null, ects: 3 },
		{ module_id: 10019, year: 3, name: "BOSS", long_name: null, ects: 3 },
		{ module_id: 10020, year: 3, name: "GDPR", long_name: null, ects: 3 },
		{ module_id: 10021, year: 3, name: "PENE", long_name: null, ects: 3 },
		{ module_id: 10022, year: 3, name: "DATA", long_name: null, ects: 3 },
		{ module_id: 10023, year: 3, name: "DOKR", long_name: null, ects: 3 },
		{ module_id: 10000, year: 4, name: "BOSS", long_name: "Business Owner", ects: 3 },
		{ module_id: 10001, year: 4, name: "WORK", long_name: null, ects: 3 },
		{ module_id: 10002, year: 4, name: "TEAM", long_name: null, ects: 2 },
		{ module_id: 10003, year: 4, name: "PROG", long_name: null, ects: 4 },
		{ module_id: 10004, year: 4, name: "PYTH", long_name: null, ects: 4 },
		{ module_id: 10005, year: 4, name: "O365", long_name: null, ects: 3 },
		{ module_id: 10024, year: 5, name: "KUBE", long_name: null, ects: 2 },
		{ module_id: 10025, year: 5, name: "DATA", long_name: null, ects: 2 },
		{ module_id: 10026, year: 5, name: "RBIG", long_name: null, ects: 3 },
		{ module_id: 10027, year: 5, name: "ENGL", long_name: null, ects: 4 },
		{ module_id: 10028, year: 5, name: "MDDP", long_name: null, ects: 4 },
		{ module_id: 10029, year: 5, name: "CCNA", long_name: null, ects: 3 },
		{ module_id: 10030, year: 5, name: "ITIL", long_name: null, ects: 4 },
	]);

	/* ---- permissions ----------------------------- */
	await sequelize.models.permission.bulkCreate([
		{ permission_id: 1, name: "READ_STUDENTS", name_localized: "" },
		{ permission_id: 2, name: "READ_OLD_STUDENTS", name_localized: "" },
		{ permission_id: 3, name: "READ_STUDENTS_JOBS", name_localized: "" },
		{ permission_id: 4, name: "READ_SCTS", name_localized: "" },
		{ permission_id: 5, name: "READ_PLANNINGS", name_localized: "" },
		{ permission_id: 6, name: "READ_CAMPUS", name_localized: "" },
		{ permission_id: 7, name: "READ_MODULES", name_localized: "" },
		{ permission_id: 8, name: "READ_ECTS", name_localized: "" },
		{ permission_id: 9, name: "READ_RESITS", name_localized: "" },
		{ permission_id: 10, name: "READ_INTERNSHIP_OFFERS", name_localized: "" },
		{ permission_id: 11, name: "READ_COMPTA", name_localized: "" },
		{ permission_id: 12, name: "EDIT_USERS", name_localized: "" },
		{ permission_id: 13, name: "EDIT_MODULES", name_localized: "" },
		{ permission_id: 14, name: "EDIT_ECTS", name_localized: "" },
		{ permission_id: 15, name: "EDIT_COMPTA", name_localized: "" },
		{ permission_id: 16, name: "EDIT_INTERNSHIP_OFFERS", name_localized: "" },
		{ permission_id: 17, name: "MANAGE_ABSENCES", name_localized: "" },
		{ permission_id: 18, name: "MANAGE_PARTNERSHIPS", name_localized: "" },
		{ permission_id: 19, name: "MANAGE_INTERNSHIP_CONTRACTS", name_localized: "" },
		{ permission_id: 20, name: "SYNC_DATA", name_localized: "" },
		{ permission_id: 21, name: "EXPORT_DATA", name_localized: "" },
	]);

	/* ---- position -------------------------------- */
	await sequelize.models.position.bulkCreate([
		{ position_id: 1, name: "Admin. plateforme" },
		{ position_id: 2, name: "Direction académique" },
		{ position_id: 3, name: "Administration" },
		{ position_id: 4, name: "Pédagogie" },
		{ position_id: 5, name: "Intervenant" },
		{ position_id: 6, name: "Étudiant" },
	]);

	/* ---- positionPermissions --------------------- */
	await sequelize.models.positionPermissions.bulkCreate([
		// Admin. plateforme
		{ position_id: 1, permission_id: 20 },
		{ position_id: 1, permission_id: 21 },

		// Direction académique
		{ position_id: 2, permission_id: 1 },
		{ position_id: 2, permission_id: 2 },
		{ position_id: 2, permission_id: 4 },
		{ position_id: 2, permission_id: 6 },
		{ position_id: 2, permission_id: 7 },
		{ position_id: 2, permission_id: 8 },
		{ position_id: 2, permission_id: 9 },

		// Administration
		{ position_id: 3, permission_id: 1 },
		{ position_id: 3, permission_id: 6 },
		{ position_id: 3, permission_id: 11 },
		{ position_id: 3, permission_id: 19 },

		// Pédagogie
		{ position_id: 4, permission_id: 1 },
		{ position_id: 4, permission_id: 3 },
		{ position_id: 4, permission_id: 4 },
		{ position_id: 4, permission_id: 5 },
		{ position_id: 4, permission_id: 6 },
		{ position_id: 4, permission_id: 7 },
		{ position_id: 4, permission_id: 8 },
		{ position_id: 4, permission_id: 9 },
		{ position_id: 4, permission_id: 10 },
		{ position_id: 4, permission_id: 17 },
		{ position_id: 4, permission_id: 16 },

		// Intervenant
		{ position_id: 5, permission_id: 1 },
		{ position_id: 5, permission_id: 5 },
		{ position_id: 5, permission_id: 7 },
		{ position_id: 5, permission_id: 14 },
		{ position_id: 5, permission_id: 17 },

		// Étudiant
		{ position_id: 6, permission_id: 4 },
		{ position_id: 6, permission_id: 5 },
		{ position_id: 6, permission_id: 7 },
		{ position_id: 6, permission_id: 8 },
		{ position_id: 6, permission_id: 10 },
		{ position_id: 6, permission_id: 11 },
	]);

	/* ---- user ------------------------------------ */
	await sequelize.models.user.bulkCreate([
		// Admin. plateforme
		{
			user_id: 10000, position_id: 1, campus_id: 10002,
			first_name: "Sir Edward", last_name: "Weak Ass",
			birth_date: "968-06-24", gender: "homme",
			email: "siredward.weakass@caramail.co.uk",
			password: "$2b$10$sbcqNmQi3DoIDQG1zbB9degN.toQN4hn2T562.yubcPvDra/RT46.", // "Mot De P4sse"
			address_street: "This is my street.", address_city: "London", address_postal_code: "45789",
			region: "UK",
		},
		// Direction académique
		{
			user_id: 10001, position_id: 2, campus_id: 10003,
			first_name: "Pony", last_name: "Sparks",
			birth_date: "1976-04-06", gender: "homme",
			email: "pony.sparks@weapo.ns",
			password: "$2b$10$sbcqNmQi3DoIDQG1zbB9degN.toQN4hn2T562.yubcPvDra/RT46.", // "Mot De P4sse"
			address_street: "Under the bridge", address_city: "NY", address_postal_code: "12345",
			region: "US",
		},
		// Administration
		{
			user_id: 10002, position_id: 3, campus_id: 10001,
			first_name: "Nem", last_name: "Ô",
			birth_date: "2003-11-26",
			email: "nem.o@fi.sh", gender: "homme",
			password: "$2b$10$sbcqNmQi3DoIDQG1zbB9degN.toQN4hn2T562.yubcPvDra/RT46.", // "Mot De P4sse"
			address_street: "Anémone n°457", address_city: "Océan", address_postal_code: "bloup",
			region: "Atlantique",
		},
		// Pédagogie
		{
			user_id: 10003, position_id: 4, campus_id: 10004,
			first_name: "Gorge W.", last_name: "Bouche",
			birth_date: "1946-07-06", gender: "homme",
			email: "gorge.w@bouc.he",
			password: "$2b$10$sbcqNmQi3DoIDQG1zbB9degN.toQN4hn2T562.yubcPvDra/RT46.", // "Mot De P4sse"
			address_street: "États-Unis du Corps", address_city: "Tête", address_postal_code: "00000",
			region: "Maestro Secret Room",
		},
		// Intervenant
		{
			user_id: 10004, position_id: 5, campus_id: 10003,
			first_name: "Space", last_name: "Odin",
			birth_date: "0001-01-01", gender: "homme",
			email: "space.odin@spacesh.ip",
			password: "$2b$10$sbcqNmQi3DoIDQG1zbB9degN.toQN4hn2T562.yubcPvDra/RT46.", // "Mot De P4sse"
			address_street: "Andromeda", address_city: "X4s-GA5", address_postal_code: "3,1415",
			region: "Espace de la confédération galactique",
		},
		// Étudiant
		{
			user_id: 10005, position_id: 6, campus_id: 10001,
			first_name: "Jay", last_name: "Raté Mon Année À L'Aide",
			birth_date: "2002-06-24", gender: "homme",
			email: "jay.rate@forni.te",
			password: "$2b$10$sbcqNmQi3DoIDQG1zbB9degN.toQN4hn2T562.yubcPvDra/RT46.", // "Mot De P4sse"
			address_street: "Tomato Plaza", address_city: "Map de frotnite", address_postal_code: "0000",
			region: "France",
		},
		{
			user_id: 10006, position_id: 6, campus_id: 10004,
			first_name: "Johnny", last_name: "Hotbody",
			birth_date: "2019-01-29", gender: "homme",
			email: "johnny.hotbody@bodylan.de",
			password: "$2b$10$sbcqNmQi3DoIDQG1zbB9degN.toQN4hn2T562.yubcPvDra/RT46.", // "Mot De P4sse"
			address_street: "Absville", address_city: "Bodylande", address_postal_code: "12345",
			region: "US",
		},
		{
			user_id: 10007, position_id: 6, campus_id: 10005,
			first_name: "yo", last_name: "mom",
			birth_date: "0001-01-01", gender: "femme",
			email: "yo.mom@so.fat",
			password: "$2b$10$sbcqNmQi3DoIDQG1zbB9degN.toQN4hn2T562.yubcPvDra/RT46.", // "Mot De P4sse"
			address_street: "Yo mom so fat", address_city: "She's a black hole", address_postal_code: "(haha)",
			region: "US",
		},
	]);

	/* ---- userModules ----------------------------- */
	await sequelize.models.userModules.bulkCreate([
		{ user_id: 10005, module_id: 10000 },
		{ user_id: 10005, module_id: 10001 },
		{ user_id: 10005, module_id: 10002 },
		{ user_id: 10005, module_id: 10003 },
		{ user_id: 10005, module_id: 10004 },
		{ user_id: 10005, module_id: 10005 },
		{ user_id: 10006, module_id: 10018 },
		{ user_id: 10006, module_id: 10019 },
		{ user_id: 10006, module_id: 10020 },
		{ user_id: 10005, module_id: 10021 },
		{ user_id: 10005, module_id: 10022 },
		{ user_id: 10005, module_id: 10023 },
		{ user_id: 10007, module_id: 10007 },
		{ user_id: 10007, module_id: 10008 },
		{ user_id: 10007, module_id: 10009 },
		{ user_id: 10007, module_id: 10010 },
		{ user_id: 10004, module_id: 10000 },
		{ user_id: 10004, module_id: 10005 },
		{ user_id: 10004, module_id: 10010 },
	]);

	/* ---- study ----------------------------------- */
	await sequelize.models.study.bulkCreate([
		{
			study_id: 10000, user_id: 10005,
			entry_level: 1, entry_date: "06/05/22 07:54:05",
			exit_level: null, exit_date: null,
			current_level: 4,
		},
		{
			study_id: 10001, user_id: 10006,
			entry_level: 1, entry_date: "2019-01-29",
			exit_level: null, exit_date: null,
			current_level: 3,
		},
		{
			study_id: 10002, user_id: 10007,
			entry_level: 1, entry_date: "06/01/22 04:11:05",
			exit_level: 5, exit_date: "06/01/22 04:11:05",
			current_level: 4,
		},
	]);

	/* ---- job ------------------------------------- */
	await sequelize.models.job.bulkCreate([
		{
			job_id: 10000, user_id: 10005,
			type: "contratpro",
			start_date: "06/01/21 04:11:05", end_date: "07/01/23 04:11:05",
			company_name: "Supfinfo",
		},
		{
			job_id: 10001, user_id: 10006,
			type: "stage",
			start_date: "06/01/22 04:11:05", end_date: "07/01/22 04:11:05",
			company_name: "Supfinfo",
		},
	]);

	/* ---- notes ----------------------------------- */
	await sequelize.models.note.bulkCreate([
		{ user_id: 10005, module_id: 10000, note: 14.5 },
		{ user_id: 10005, module_id: 10001, note: 14.5 },
		{ user_id: 10005, module_id: 10002, note: 14.5 },
		{ user_id: 10005, module_id: 10003, note: 14.5 },
		{ user_id: 10005, module_id: 10004, note: 8 },
		{ user_id: 10005, module_id: 10005, note: 14.5 },
		{ user_id: 10005, module_id: 10006, note: 14.5 },
		{ user_id: 10005, module_id: 10007, note: 14.5 },
		{ user_id: 10005, module_id: 10008, note: 0.1 },
		{ user_id: 10005, module_id: 10009, note: 14.5 },
		{ user_id: 10005, module_id: 10010, note: 14.5 },
		{ user_id: 10005, module_id: 10011, note: 14.5 },
		{ user_id: 10005, module_id: 10012, note: 14.5 },
		{ user_id: 10005, module_id: 10013, note: 14.5 },
		{ user_id: 10005, module_id: 10014, note: 14.5 },
		{ user_id: 10005, module_id: 10015, note: 14.5 },
		{ user_id: 10005, module_id: 10016, note: 14.5 },
		{ user_id: 10005, module_id: 10017, note: 14.5 },
		{ user_id: 10005, module_id: 10018, note: 14.5 },
		{ user_id: 10005, module_id: 10019, note: 14.5 },
		{ user_id: 10005, module_id: 10020, note: 14.5 },
		{ user_id: 10006, module_id: 10000, note: 14.5 },
		{ user_id: 10006, module_id: 10001, note: 14.5 },
		{ user_id: 10006, module_id: 10002, note: 14.5 },
		{ user_id: 10000, module_id: 10003, note: 14.5 },
		{ user_id: 10000, module_id: 10004, note: 14.5 },
		{ user_id: 10006, module_id: 10005, note: 14.5 },
		{ user_id: 10000, module_id: 10006, note: 14.5 },
		{ user_id: 10006, module_id: 10007, note: 14.5 },
		{ user_id: 10006, module_id: 10008, note: 14.5 },
		{ user_id: 10006, module_id: 10009, note: 14.5 },
		{ user_id: 10006, module_id: 10010, note: 14.5 },
		{ user_id: 10000, module_id: 10011, note: 14.5 },
		{ user_id: 10000, module_id: 10012, note: 14.5 },
		{ user_id: 10006, module_id: 10013, note: 14.5 },
		{ user_id: 10000, module_id: 10014, note: 14.5 },
		{ user_id: 10006, module_id: 10015, note: 14.5 },
		{ user_id: 10000, module_id: 10016, note: 14.5 },
		{ user_id: 10000, module_id: 10017, note: 14.5 },
		{ user_id: 10006, module_id: 10018, note: 14.5 },
		{ user_id: 10000, module_id: 10019, note: 14.5 },
		{ user_id: 10000, module_id: 10020, note: 14.5 },
	]);

	/* ---- compta ---------------------------------- */
	await sequelize.models.compta.bulkCreate([
		{
			compta_id: 10000, user_id: 10005,
			payment_type: "Comptant",
			payment_due: 28750.56,
			paid: 0, relance: true,
		},
	]);

	/* ---- planning ---------------------------------- */
	await sequelize.models.planning.bulkCreate([
		{
			planning_id: 10000, module_id: 10000, campus_id: 10001,
			start_date: "06/09/22 04:11:05",
			end_date: "06/09/22 05:11:05",
			event_name: "", event_type: "module",
			year: 4,
		},
		{
			planning_id: 10001, campus_id: 10001,
			start_date: "06/16/22 10:00:00",
			end_date: "06/16/22 15:00:00",
			event_name: "Job dating", event_type: "misc",
			year: 4,
		},
		{
			planning_id: 10002, module_id: 10005, campus_id: 10005,
			start_date: "06/16/22 13:00:00",
			end_date: "06/16/22 14:00:00",
			event_name: "", event_type: "module",
			year: 4,
		},
	]);

	/* ---- absences ---------------------------------- */
	await sequelize.models.absence.bulkCreate([
		{
			absence_id: 10000,
			start_date: "06/09/22 00:00:00",
			end_date: "06/09/22 23:59:59",
			user_id: 10006,
		},
		{
			absence_id: 10001,
			start_date: "06/15/22 00:00:00",
			end_date: "06/16/22 23:59:59",
			user_id: 10005,
		},
		{
			absence_id: 10002,
			start_date: "06/25/22 00:00:00",
			end_date: "06/25/22 23:59:59",
			user_id: 10005,
		},
		{
			absence_id: 10003,
			start_date: "06/30/22 00:00:00",
			end_date: "06/30/22 23:59:59",
			user_id: 10006,
		},
	]);

	logger.log("Dummy data inserted");
}

export default setData;
