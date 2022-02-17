/**
 * @module associations
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { DataTypes } from "sequelize";

/**
 * Make associations between the models
 * @function
 *
 * @param {Sequelize} sequelize
 * @param {Logger|Console} logger
 */
const init = (sequelize, logger) => {
	logger.log(`Making associations ([${Object.keys(sequelize.models).join(", ")}])...`);

	/* ---- module ---------------------------------- */
	// note [* - 1] module
	sequelize.models.module.hasMany(sequelize.models.note, {
		foreignKey: {
			name: "module_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
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

	logger.log(`Completed associations of the ${Object.keys(sequelize.models).length} models`);
};

export default init;
