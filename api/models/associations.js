/**
 * @module associations
 * @category Sequelize
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 *
 *   @requires Sequelize
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

	/* ---- attachement ----------------------------- */
	// attachement [* - 1] jobOffer
	sequelize.models.attachement.belongsTo(sequelize.models.jobOffer, {
		foreignKey: {
			name: "job_offer_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		sourceKey: "job_offer_id",
		constraints: false,
	});

	/* ---- campus ---------------------------------- */
	// campus [1 - *] user
	sequelize.models.campus.hasMany(sequelize.models.user, {
		foreignKey: {
			name: "campus_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	/* ---- jobOffer -------------------------------- */
	// jobOffer [* - *] jobDomain
	sequelize.models.jobOffer.belongsToMany(sequelize.models.jobDomain, {
		through: sequelize.models.jobOfferDomain,
		foreignKey: "job_offer_id",
	});

	// jobOffer [1 - *] attachement
	sequelize.models.jobOffer.hasMany(sequelize.models.attachement, {
		foreignKey: {
			name: "job_offer_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	/* ---- jobDomain ------------------------------- */
	// jobDomain [* - *] jobOffer
	sequelize.models.jobDomain.belongsToMany(sequelize.models.jobOffer, {
		through: sequelize.models.jobOfferDomain,
		foreignKey: "job_domain_id",
	});

	/* ---- module ---------------------------------- */
	// module [1 - *] note
	sequelize.models.module.hasMany(sequelize.models.note, {
		foreignKey: {
			name: "module_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	// module [* - *] user
	sequelize.models.module.belongsToMany(sequelize.models.user, {
		through: sequelize.models.userModules,
		foreignKey: "module_id",
	});

	/* ---- note ------------------------------------ */
	// note [* - 1] module
	sequelize.models.note.hasOne(sequelize.models.module, {
		foreignKey: {
			name: "module_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		sourceKey: "module_id",
		constraints: false,
	});

	/* ---- permission ------------------------------ */
	// permission [* - *] position
	sequelize.models.permission.belongsToMany(sequelize.models.position, {
		through: sequelize.models.positionPermissions,
		foreignKey: "permission_id",
	});

	/* ---- position -------------------------------- */
	// position [1 - *] user
	sequelize.models.position.hasMany(sequelize.models.user, {
		foreignKey: {
			name: "position_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	// position [* - *] permission
	sequelize.models.position.belongsToMany(sequelize.models.permission, {
		through: sequelize.models.positionPermissions,
		foreignKey: "position_id",
	});

	/* ---- user ------------------------------------ */
	// user [1 - *] absence
	sequelize.models.user.hasMany(sequelize.models.absence, {
		foreignKey: {
			name: "user_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	// user [* - 1] campus
	sequelize.models.user.belongsTo(sequelize.models.campus, {
		foreignKey: {
			name: "campus_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		sourceKey: "campus_id",
		constraints: false,
	});

	// user [1 - 1] compta
	sequelize.models.user.hasOne(sequelize.models.compta, {
		foreignKey: {
			name: "user_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	// user [1 - *] job
	sequelize.models.user.hasMany(sequelize.models.job, {
		foreignKey: {
			name: "user_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	// user [1 - *] note
	sequelize.models.user.hasMany(sequelize.models.note, {
		foreignKey: {
			name: "user_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	// user [* - *] module
	sequelize.models.user.belongsToMany(sequelize.models.module, {
		through: sequelize.models.userModules,
		foreignKey: "user_id",
	});

	// user [1 - 1] position
	sequelize.models.user.hasOne(sequelize.models.position, {
		foreignKey: {
			name: "position_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		sourceKey: "position_id",
		constraints: false,
	});

	// user [1 - *] positionPermissions
	sequelize.models.user.hasMany(sequelize.models.positionPermissions, {
		foreignKey: {
			name: "position_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		constraints: false,
	});

	// user [1 - {0-1}] study
	sequelize.models.user.hasOne(sequelize.models.study, {
		foreignKey: {
			name: "user_id",
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	});

	/* ---- planning ------------------------------------ */
	// module [1 - *] planning
	sequelize.models.module.hasMany(sequelize.models.planning, {
		foreignKey: {
			name: "module_id",
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	});

	// planning [* - 1] module
	sequelize.models.planning.belongsTo(sequelize.models.module, {
		foreignKey: {
			name: "planning_id",
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		constraints: false,
	});

	// user [1 - *] planning
	sequelize.models.user.hasMany(sequelize.models.planning, {
		foreignKey: {
			name: "user_id",
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	});

	// planning [* - 1] user
	sequelize.models.planning.belongsTo(sequelize.models.user, {
		foreignKey: {
			name: "planning_id",
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		constraints: false,
	});

	logger.log(`Completed associations of the ${Object.keys(sequelize.models).length} models`);
}

export default init;
