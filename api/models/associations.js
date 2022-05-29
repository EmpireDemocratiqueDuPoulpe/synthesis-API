/**
 * @module associations
 * @category Sequelize
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 *
 * @requires Sequelize
 */

import { DataTypes } from "sequelize";

/**
 * Make associations between the models
 * @function
 *
 * @param {Sequelize} sequelize
 * @param {module:Logger|Console} logger
 */
function init(sequelize, logger) {
	logger.log(`Making associations ([${Object.keys(sequelize.models).join(", ")}])...`);

	/* ---- One jobOffer has [multiple] attachements -----------------------------
			---- and one attachement has one jobOffer -------------------------------- */
	sequelize.models.attachement.belongsTo(sequelize.models.jobOffer, {
		as: "jobOffers",
		foreignKey: { name: "job_offer_id", type: DataTypes.INTEGER, allowNull: false },
	});

	sequelize.models.jobOffer.hasMany(sequelize.models.attachement, {
		as: "attachements",
		foreignKey: { name: "job_offer_id", type: DataTypes.INTEGER, allowNull: false },
	});

	/* ---- One jobOffer has [multiple] jobDomain --------------------------------
			---- and one jobDomain has [multiple] jobOffer --------------------------- */
	sequelize.models.jobOffer.belongsToMany(sequelize.models.jobDomain, {
		as: "jobDomains",
		foreignKey: { name: "job_offer_id", type: DataTypes.INTEGER, allowNull: false },
		through: sequelize.models.jobOfferDomain,
	});

	sequelize.models.jobDomain.belongsToMany(sequelize.models.jobOffer, {
		as: "jobOffers",
		foreignKey: { name: "job_domain_id", type: DataTypes.INTEGER, allowNull: false },
		through: sequelize.models.jobOfferDomain,
	});

	/* ---- One module has [multiple] notes --------------------------------------
			---- and one note has one module ----------------------------------------- */
	sequelize.models.note.belongsTo(sequelize.models.module, {
		as: "module",
		foreignKey: { name: "module_id", type: DataTypes.INTEGER, allowNull: false },
	});

	sequelize.models.module.hasMany(sequelize.models.note, {
		as: "notes",
		foreignKey: { name: "module_id", type: DataTypes.INTEGER, allowNull: false },
	});

	/* ---- One user has [multiple] modules --------------------------------------
			---- and one module has [multiple] users --------------------------------- */
	sequelize.models.user.belongsToMany(sequelize.models.module, {
		as: "modules",
		foreignKey: { name: "user_id", type: DataTypes.INTEGER, allowNull: false },
		through: sequelize.models.userModules,
	});

	sequelize.models.module.belongsToMany(sequelize.models.user, {
		as: "users",
		foreignKey: { name: "module_id", type: DataTypes.INTEGER, allowNull: false },
		through: sequelize.models.userModules,
	});

	/* ---- One user has [multiple] notes ----------------------------------------
			---- and one note has one user ------------------------------------------- */
	sequelize.models.note.belongsTo(sequelize.models.user, {
		as: "user",
		foreignKey: { name: "user_id", type: DataTypes.INTEGER, allowNull: false },
	});

	sequelize.models.user.hasMany(sequelize.models.note, {
		as: "notes",
		foreignKey: { name: "user_id", type: DataTypes.INTEGER, allowNull: false },
	});

	/* ---- One user has [one] campus --------------------------------------------
			---- and one campus has [multiple] users --------------------------------- */
	sequelize.models.user.belongsTo(sequelize.models.campus, {
		as: "campus",
		foreignKey: { name: "campus_id", type: DataTypes.INTEGER, allowNull: true },
	});

	sequelize.models.campus.hasMany(sequelize.models.user, {
		as: "users",
		foreignKey: { name: "campus_id", type: DataTypes.INTEGER, allowNull: true },
	});

	/* ---- One user has [multiple] jobs -----------------------------------------
			---- and one job has one user -------------------------------------------- */
	sequelize.models.job.belongsTo(sequelize.models.user, {
		as: "user",
		foreignKey: { name: "user_id", type: DataTypes.INTEGER, allowNull: false },
	});

	sequelize.models.user.hasMany(sequelize.models.job, {
		as: "jobs",
		foreignKey: { name: "user_id", type: DataTypes.INTEGER, allowNull: false },
	});

	/* ---- One user has [multiple] absences -------------------------------------
			---- and one absence has one user ---------------------------------------- */
	sequelize.models.absence.belongsTo(sequelize.models.user, {
		as: "user",
		foreignKey: { name: "user_id", type: DataTypes.INTEGER, allowNull: false },
	});

	sequelize.models.user.hasMany(sequelize.models.absence, {
		as: "absences",
		foreignKey: { name: "user_id", type: DataTypes.INTEGER, allowNull: false },
	});

	/* ---- One user has [one] compta --------------------------------------------
			---- and one compta has one user ----------------------------------------- */
	sequelize.models.compta.belongsTo(sequelize.models.user, {
		as: "user",
		foreignKey: { name: "user_id", type: DataTypes.INTEGER, allowNull: false },
	});

	sequelize.models.user.hasOne(sequelize.models.compta, {
		as: "compta",
		foreignKey: { name: "user_id", type: DataTypes.INTEGER, allowNull: true },
	});

	/* ---- One user has [one] study ---------------------------------------------
			---- and one study has one user ------------------------------------------ */
	sequelize.models.study.belongsTo(sequelize.models.user, {
		as: "user",
		foreignKey: { name: "user_id", type: DataTypes.INTEGER, allowNull: false },
	});

	sequelize.models.user.hasOne(sequelize.models.study, {
		as: "study",
		foreignKey: { name: "user_id", type: DataTypes.INTEGER, allowNull: true },
	});

	/* ---- One position has [multiple] users ------------------------------------
			---- and one user has one position --------------------------------------- */
	sequelize.models.user.belongsTo(sequelize.models.position, {
		as: "position",
		foreignKey: { name: "position_id", type: DataTypes.INTEGER, allowNull: false },
	});

	sequelize.models.position.hasMany(sequelize.models.user, {
		as: "users",
		foreignKey: { name: "position_id", type: DataTypes.INTEGER, allowNull: false },
	});

	/* ---- One position has [multiple] permissions ------------------------------
			---- and one permission has [multiple] positions ------------------------- */
	sequelize.models.permission.belongsToMany(sequelize.models.position, {
		as: "positions",
		foreignKey: { name: "permission_id", type: DataTypes.INTEGER, allowNull: false },
		through: sequelize.models.positionPermissions,
	});

	sequelize.models.position.belongsToMany(sequelize.models.permission, {
		as: "permissions",
		foreignKey: { name: "position_id", type: DataTypes.INTEGER, allowNull: false },
		through: sequelize.models.positionPermissions,
	});

	/* ---- One module has [multiple] planning items -----------------------------
			---- and one planning item has [one] module ------------------------------ */
	sequelize.models.planning.belongsTo(sequelize.models.module, {
		as: "module",
		foreignKey: { name: "module_id", type: DataTypes.INTEGER, allowNull: true },
	});

	sequelize.models.module.hasMany(sequelize.models.planning, {
		as: "planningItems",
		foreignKey: { name: "module_id", type: DataTypes.INTEGER, allowNull: false },
	});

	/* ---- One user has [multiple] planning items -------------------------------
			---- and one planning item has [multiple] users -------------------------- */
	sequelize.models.user.belongsToMany(sequelize.models.planning, {
		as: "planningItems",
		foreignKey: { name: "user_id", type: DataTypes.INTEGER, allowNull: false },
		through: sequelize.models.userPlanning,
	});

	sequelize.models.planning.belongsToMany(sequelize.models.user, {
		as: "users",
		foreignKey: { name: "planning_id", type: DataTypes.INTEGER, allowNull: false },
		through: sequelize.models.userPlanning,
	});

	/*
		sequelize.models.user.hasMany(sequelize.models.positionPermissions, {
			foreignKey: {
				name: "position_id",
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			constraints: false,
		});
	 */

	logger.log(`Completed associations of the ${Object.keys(sequelize.models).length} models`);
}

export default init;
