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
			address_street: "10 rue Alfred Kastler", address_city: "Caen", address_postal_code: "14000",
			geo_position: { type: "Point", coordinates: [49.202260, -0.3928056] },
		},
		{ campus_id: 10001, name: "Distanciel" },
		{
			campus_id: 10002, name: "Lille",
			address_street: "144 rue Nationale", address_city: "Lille", address_postal_code: "59000",
			geo_position: { type: "Point", coordinates: [50.633700, 3.0543615] },
		},
		{
			campus_id: 10003, name: "Lyon",
			address_street: "6 place Saint-Nizier", address_city: "Lyon", address_postal_code: "69002",
			geo_position: { type: "Point", coordinates: [45.764406, 4.8337653] },
		},
		{
			campus_id: 10004, name: "Paris",
			address_street: "28 rue des francs bourgeois", address_city: "Paris", address_postal_code: "75003",
			geo_position: { type: "Point", coordinates: [48.858268, 2.3603642] },
		},
		{
			campus_id: 10005, name: "Tours",
			address_street: "Le HQ Tours, 1 impasse du Palais", address_city: "Tours", address_postal_code: "37000",
			geo_position: { type: "Point", coordinates: [47.390490, 0.6881504] },
		},
		{
			campus_id: 10006, name: "Rennes",
			address_street: "28 Bd du Colombier", address_city: "France", address_postal_code: "35000",
			geo_position: { type: "Point", coordinates: [48.102981, -1.6776759] },
		},
	]);

	/* ---- jobDomain ------------------------------- */
	await sequelize.models.jobDomain.bulkCreate([
		{ job_domain_id: 10000, name: "Système" },
		{ job_domain_id: 10001, name: "Réseaux" },
		{ job_domain_id: 10002, name: "Développement web (front-end)" },
		{ job_domain_id: 10003, name: "Développement web (back-end)" },
		{ job_domain_id: 10004, name: "Développement d'application" },
		{ job_domain_id: 10005, name: "Gestion de projet" },
		{ job_domain_id: 10006, name: "Intelligence Artificielle" },
		{ job_domain_id: 10007, name: "Data Science" },
		{ job_domain_id: 10008, name: "Scripting/Automatisation" },
		{ job_domain_id: 10009, name: "Développement d'application mobile (iOS)" },
		{ job_domain_id: 10010, name: "Développement d'application mobile (Android)" },
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
		{
			job_offer_id: 10003,
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
préconisations...)
- Concevoir le modèle de données, de l’architecture technique et fonctionnelle, du découpage en micro-services,
du design de l’API et de l’infrastructure.
- Fournir des préconisations et solutions techniques à destination de l’équipe produit et relire les
spécifications / US.
- Rédiger les tests unitaires, d’acceptances et end to end.
- S’assurer de la qualité du code grâce à des outils d’analyse du code automatique, à la relecture de code sur
l’ensemble des projets…
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
télétravail…)
- Un macbook pro ou la machine de ton choix a usage pro / perso.
- Un cadre de travail au top, avec un open space, 2 salles de réunions et un grand espace de pause.
- des conditions de travail top avec : conciergerie, panier de fruit, remote et un équilibre entre vie
professionnelle et vie privée préservé.
- Une équipe à taille humaine avec un esprit d’équipe, start-up et entrepreneurial.
- Possibilité d’assister à des conférences, d’animer des talks, de rédiger des articles tech… de t’épanouir et
renforcer ta présence dans le monde de la tech.
- Apéros, déjeuners, goûters, table de ping-pong, jeux de société, console de jeux vidéo…

**Ton profil :**
- Tu es issue d’une formation initiale en informatique, qui t’as permis d’acquérir de solides bases théoriques.
- Tu as 5 ans ou plus d'expérience dans le développement full stack et plus précisément sur javascript /
typescript et Node.JS / Vue.js.
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
web comme Ruby, Python..
- Maîtrise d’un frameworks back node.js idéalement NestJS et front Vue.js.
- Maîtrise des bases SQL (PostgreSQL) et NoSQL (MongoDB, elasticsearch) ainsi que de leur langage de requêtage.
- Maîtrise du langage de programmation HTML5, CSS3, javascript et des bonnes pratiques associées
- Maîtrise des normes W3C, des règles d’ergonomie, d’accessibilité, normes W3C, SEO, des concepts responsive
design, mobile first...
- Maîtrise des outils de tests (jest, cucumber), d’intégration et déploiement continue.
- Connaissance avancée des sujets UX / UI
- Connaissance avancée des architectures applicatives OOP, MVC, d’algorithmie, des design patterns, job
asynchrone, tâches cron, microservices, message broker (Redis), serverless…
- Bonne Connaissance des normes et spécifications REST, Open API, OAUTH, Gherkin, GraphQL
- Bonne connaissance devops et infrastructure (docker, kubernetes, API Gateway, AWS, Heroku…)

**Déroulement des entretiens :**
1. Première prise de contact téléphonique
2. Test technique d’une heure maximum en remote
3. Entretien avec notre CTO puis avec l’un des fondateurs`,
		},
		{
			job_offer_id: 10004,
			type: "stage",
			title: "Chef de projet SI (H/F) - IT Project Manager",
			company_name: "Decathlon",
			city: "Lille",
			postal_code: "59000",
			content: `DECATHLON accélère sa transformation digitale avec pour ambition de devenir LA plateforme numérique
du sportif qui permettra aux utilisateurs d'accéder à toutl'univers du sport en un clic (matériel, installations, cours….).
Notre but est de créer un écosystème ouvert afin de connecter de nombreux 
acteur.trices et services tiers, de manière sûre et performante.

Nos équipes digitales basées à Lille, Paris, Nantes, Lyon, Montréal (et bien d’autres…) regroupant plus de 1500 
collaborateurs sont unies pour construire et faire grandir des produits numériques 
dans le but de toujours offrir la meilleure valeur à nos utilisateurs

Au cœur de la direction financière du groupe Decathlon et du réseau IT United, nos équipes IT Finance (>60 coéquipiers) 
assurent la conception, la mise en place et le bon fonctionnement de solutions informatiques (50 outils). Ces solutions 
permettent:

Aux financiers d’assurer leur métier de manière optimisée (clôture comptable, gestion des achats, pilotage économique, …)
Accompagner la transformation digitale de la Finance chez Decathlon en étant force de proposition sur les nouvelles technologies.
(automatisation, RPA, API, Data-centric, IA, Dématérialisation, …)

Votre Mission :

Vous pilotez et portez la responsabilité informatique des projets au service de la direction financière du groupe.

Vous prenez en charge des projets variés : intégration de solutions SAAS, animation de développement de solutions homemade, 
entre autres...

Vous serez amené.es à interagir avec différentes parties prenantes: software engineers, Chef de projet métier, sponsors, 
architectes IT,.. dans un contexte international.

Vous adaptez l’organisation des projets et l’animation selon les besoins pour faire vivre la transformation digitale au 
service de la performance de nos collaborateurs.

Cadrage des enjeux et objectifs au service des utilisateurs
Construction et coordination de l’équipe projet informatique
Gestion de la relation fournisseur
Organisation et pilotage du delivery
Garant de la qualité, du délai et de l’économique
Communication et conduite du changement au sein des équipes

Votre mission “au quotidien”:

25% animation du projet : coproj, copil, synchro d'équipe, priorisation
25% cadrage des activités et spécification, puis validation des delivery
20% réalisation et/ou contribution sur différents lots du projets
10% collaboration avec les intervenants extérieurs au projet
10% alignement cross-périmètres avec les stratégies IT et Finance
10% développement des compétences des collaborateurs

PROFIL DE CANDIDAT- E RECHERCHÉ- E
Votre profil :

Vous disposez d’une expérience d’au moins 5 années sur le métier de chef.fe de projet informatique / digital
Vous savez fédérer vos coéquipier.e.s autour d'objectifs communs (management fonctionnel, communication, ..)
Une appétence et compréhension technologique qui vous permet d’interagir au quotidien avec des profils variés :
développeurs, administrateurs cloud, équipes progiciels et Saas.
Rejoindre une entreprise qui a pour mission de "Rendre accessible le sport au plus grand nombre" fait sens pour vous
Vous maîtrisez l'anglais (écrit & parlé)

Compétence idéales :

Une expérience significative dans la conduite de projets IT au service de la transformation digitale de direction financière

Ce que nous offrons :

2 jours de télétravail par semaine (jours libres)
Liberté de choix de l'outil de travail (Mac, Windows, Chromebooks)
Montée en compétence (diversité de projets, langages et technologies, certifications, events, mentorat)
Devenir membre d’une communauté mondiale, unie par l'amour du sport, par des valeurs communes et par une passion pour la tech.
Participer à des événements « Tech » externes (DevFest, AWS summit, FIC) et à nos événements internes 
(Meetups, All hands, podcasts internes).
Évoluer professionnellement grâce aux nombreuses opportunités offertes par la mobilité interne.
Partager votre passion grâce à nos programmes de réduction Decathlon, un bon annuel pour vos activités sportives,
un accès à nos communautés et événements sportifs. Que vous soyez débutant ou athlète de haut niveau, les Décathlonien
ne
s se feront un plaisir de vous faire découvrir de nouvelles activités.

Decathlon est engagé dans l'inclusion et la non-discrimination, et agit ainsi quotidiennement en faveur du handicap,
des séniors, de la mixité sociale, de l'égalité entre les femmes et les hommes. Nous recrutons avant tout des personnalités,
et la diversité au sein de nos équipes est un enjeu majeur car elle est source d’innovation et de performance.

Si vous souhaitez en savoir plus sur nos engagements, vous pouvez consulter ce lien.`,
			expiration_date: new Date(Date.now() + ((3600 * 1000 * 24) * 30)),
		},
		{
			job_offer_id: 10005,
			type: "alternance",
			title: "Chef de projet data produit (F/H)",
			company_name: "Castorama",
			city: "Templemars",
			postal_code: "59175",
			content: `Ce qu'on apprécie chez toi
Ta première expérience sur un métier similaire, avec une dimension gestion de projet transversale.
Ta curiosité, ton sens du client, ton attention aux détails et ton orientation business.
Ta connaissance d’un outil de référentiel produit (PIM/DAM).
Ta maitrise complète du Pack Office, et notamment Excel.
Ta maitrise de l’anglais (écrit au minimum).
Ton excellent relationnel, tu es disponible et facilitateur/facilitatrice.
Ta réactivité.
Ton appétence pour le travail sur informatique et adaptation aux différents outils.
Ce qui rythme tes journées

Tu pilotes la production des Contenus de l’offre produit, pour cela tu :
Associes, sensibilises et coordonnes les différents services autour de tes enjeux liés aux données des produits.
Coordonnes le lancement des gammes, des opérations commerciales, les rattrapages et les corrections des enseignes en lien 
avec les équipes Marketing, Trading et Supply chain.
Elabores une planification prévisionnelle d'activité et de répartition des charges.
Es garant(e) de la bonne collecte et du suivi des caractéristiques produits nécessaire pour compléter les éléments de la 
nomenclature produits du groupe, par le biais de sources externes ou du Groupe Kingfisher (équipes data acquisition, 
supply chain, qualité…).
Optimises les méthodes et la gestion de la production des contenus.
Assures l’enrichissement et la mise en conformité des contenus produits dans le PIM.
Es garant de la conformité de publication des produits sur le site et l’outil collaborateur (.com+).
Assures le reporting de l’activité.
Suis des process mis en place et contribues à leur amélioration.
T'assures que l’ensemble des équipes œuvrent pour la bonne mise en marché de l’offre.
Suis la publication des équipes. Lèves les points bloquants la publication (visuel, texte, statuts, routes…).
Vérifies l’ensemble des éléments permettant de s’assurer que le produit soit visible et achetable sur le site web.
Les petits plus...

Sur le site de Templemars, tu bénéficies d’avantages tels que : mutuelle et prévoyance, restaurant et snack d’entreprise, 
espaces verts de détente, ainsi que d’offres du Comité Social et Economique.

Au-delà de trois mois de présence, tu profiteras également de tickets restaurant et d’une carte de réduction sur les 
produits vendus en magasin.`,
			expiration_date: new Date(Date.now() + ((3600 * 1000 * 24) * 15)),
		},
	]);

	/* ---- jobOfferDomain -------------------------- */
	await sequelize.models.jobOfferDomain.bulkCreate([
		{ job_offer_id: 10000, job_domain_id: 10004 },
		{ job_offer_id: 10001, job_domain_id: 10000 },
		{ job_offer_id: 10001, job_domain_id: 10002 },
		{ job_offer_id: 10001, job_domain_id: 10003 },
		{ job_offer_id: 10001, job_domain_id: 10010 },
		{ job_offer_id: 10002, job_domain_id: 10005 },
		{ job_offer_id: 10002, job_domain_id: 10002 },
		{ job_offer_id: 10003, job_domain_id: 10005 },
		{ job_offer_id: 10003, job_domain_id: 10004 },
		{ job_offer_id: 10004, job_domain_id: 10005 },
		{ job_offer_id: 10004, job_domain_id: 10007 },
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
			user_id: 10005, position_id: 6, campus_id: 10002,
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
		{
			planning_id: 10004, module_id: 10022, campus_id: 10000,
			start_date: "1/19/22 9:00:00",
			end_date: "1/26/22 17:00:00",
			event_name: "", event_type: "module",
			year: 5,
		},
		{
			planning_id: 10005, module_id: 10012, campus_id: 10004,
			start_date: "8/14/22 9:00:00",
			end_date: "8/26/22 17:00:00",
			event_name: "", event_type: "module",
			year: 4,
		},
		{
			planning_id: 10006, module_id: 10023, campus_id: 10002,
			start_date: "11/28/22 9:00:00",
			end_date: "12/6/22 17:00:00",
			event_name: "", event_type: "module",
			year: 3,
		},
		{
			planning_id: 10007, module_id: 10029, campus_id: 10003,
			start_date: "6/2/22 9:00:00",
			end_date: "11/5/22 17:00:00",
			event_name: "", event_type: "module",
			year: 5,
		},
		{
			planning_id: 10008, module_id: 10029, campus_id: 10005,
			start_date: "9/14/22 9:00:00",
			end_date: "2/14/22 17:00:00",
			event_name: "", event_type: "module",
			year: 1,
		},
		{
			planning_id: 10009, module_id: 10004, campus_id: 10000,
			start_date: "12/25/22 9:00:00",
			end_date: "2/11/22 17:00:00",
			event_name: "", event_type: "module",
			year: 2,
		},
		{
			planning_id: 10010, module_id: 10006, campus_id: 10005,
			start_date: "6/5/22 9:00:00",
			end_date: "12/8/22 17:00:00",
			event_name: "", event_type: "module",
			year: 2,
		},
		{
			planning_id: 10011, module_id: 10023, campus_id: 10001,
			start_date: "1/8/22 9:00:00",
			end_date: "4/12/22 17:00:00",
			event_name: "", event_type: "module",
			year: 1,
		},
		{
			planning_id: 10012, module_id: 10030, campus_id: 10001,
			start_date: "7/24/22 9:00:00",
			end_date: "7/24/22 17:00:00",
			event_name: "", event_type: "module",
			year: 4,
		},
		{
			planning_id: 10013, module_id: 10007, campus_id: 10002,
			start_date: "2/7/22 9:00:00",
			end_date: "11/28/22 17:00:00",
			event_name: "", event_type: "module",
			year: 1,
		},
		{
			planning_id: 10014, module_id: 10028, campus_id: 10000,
			start_date: "8/23/22 9:00:00",
			end_date: "4/7/22 17:00:00",
			event_name: "", event_type: "module",
			year: 1,
		},
		{
			planning_id: 10015, module_id: 10007, campus_id: 10002,
			start_date: "9/25/22 9:00:00",
			end_date: "2/10/22 17:00:00",
			event_name: "", event_type: "module",
			year: 5,
		},
		{
			planning_id: 10016, module_id: 10017, campus_id: 10001,
			start_date: "12/20/22 9:00:00",
			end_date: "8/6/22 17:00:00",
			event_name: "", event_type: "module",
			year: 4,
		},
		{
			planning_id: 10017, module_id: 10020, campus_id: 10001,
			start_date: "12/12/22 9:00:00",
			end_date: "2/17/22 17:00:00",
			event_name: "", event_type: "module",
			year: 2,
		},
		{
			planning_id: 10018, module_id: 10018, campus_id: 10001,
			start_date: "1/8/22 9:00:00",
			end_date: "9/24/22 17:00:00",
			event_name: "", event_type: "module",
			year: 4,
		},
		{
			planning_id: 10019, module_id: 10017, campus_id: 10000,
			start_date: "5/8/22 9:00:00",
			end_date: "5/1/22 17:00:00",
			event_name: "", event_type: "module",
			year: 3,
		},
		{
			planning_id: 10020, module_id: 10016, campus_id: 10005,
			start_date: "3/8/22 9:00:00",
			end_date: "10/14/22 17:00:00",
			event_name: "", event_type: "module",
			year: 5,
		},
		{
			planning_id: 10021, module_id: 10010, campus_id: 10003,
			start_date: "9/16/22 9:00:00",
			end_date: "12/19/22 17:00:00",
			event_name: "", event_type: "module",
			year: 4,
		},
		{
			planning_id: 10022, module_id: 10005, campus_id: 10002,
			start_date: "12/21/22 9:00:00",
			end_date: "10/13/22 17:00:00",
			event_name: "", event_type: "module",
			year: 3,
		},
		{
			planning_id: 10023, module_id: 10019, campus_id: 10004,
			start_date: "7/21/22 9:00:00",
			end_date: "6/12/22 17:00:00",
			event_name: "", event_type: "module",
			year: 3,
		},
		{
			planning_id: 10024, module_id: 10019, campus_id: 10001,
			start_date: "8/24/22 9:00:00",
			end_date: "11/17/22 17:00:00",
			event_name: "", event_type: "module",
			year: 2,
		},
		{
			planning_id: 10025, module_id: 10020, campus_id: 10003,
			start_date: "11/21/22 9:00:00",
			end_date: "7/3/22 17:00:00",
			event_name: "", event_type: "module",
			year: 5,
		},
		{
			planning_id: 10026, module_id: 10012, campus_id: 10002,
			start_date: "8/28/22 9:00:00",
			end_date: "11/18/22 17:00:00",
			event_name: "", event_type: "module",
			year: 1,
		},
		{
			planning_id: 10027, module_id: 10006, campus_id: 10005,
			start_date: "7/23/22 9:00:00",
			end_date: "7/9/22 17:00:00",
			event_name: "", event_type: "module",
			year: 2,
		},
		{
			planning_id: 10028, module_id: 10006, campus_id: 10002,
			start_date: "10/9/22 9:00:00",
			end_date: "2/17/22 17:00:00",
			event_name: "", event_type: "module",
			year: 3,
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
