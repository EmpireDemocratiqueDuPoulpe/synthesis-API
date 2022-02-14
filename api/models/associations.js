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

	/* ---- Module ---------------------------------- */
	// Note [* - 1] Module
	sequelize.models.Module.hasMany(sequelize.models.Note, {
		foreignKey: {
			name: "module_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	/* ---- Permission ------------------------------ */
	// Permission [* - *] Position
	sequelize.models.Permission.belongsToMany(sequelize.models.Position, {
		through: sequelize.models.PositionPermissions,
		foreignKey: "permission_id",
	});

	/* ---- Position -------------------------------- */
	// Position [1 - *] User
	sequelize.models.Position.hasMany(sequelize.models.User, {
		foreignKey: {
			name: "position_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	// Position [* - *] Permission
	sequelize.models.Position.belongsToMany(sequelize.models.Permission, {
		through: sequelize.models.PositionPermissions,
		foreignKey: "position_id",
	});

	/* ---- User ------------------------------------ */
	// User [1 - {0-1}] Study
	sequelize.models.User.hasOne(sequelize.models.Study, {
		foreignKey: {
			name: "user_id",
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	});

	// User [1 - *] Job
	sequelize.models.User.hasMany(sequelize.models.Job, {
		foreignKey: {
			name: "user_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	// User [1 - *] Note
	sequelize.models.User.hasMany(sequelize.models.Note, {
		foreignKey: {
			name: "user_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	// User [1 - *] Absence
	sequelize.models.User.hasMany(sequelize.models.Absence, {
		foreignKey: {
			name: "user_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	// User [1 - 1] Compta
	sequelize.models.User.hasOne(sequelize.models.Compta, {
		foreignKey: {
			name: "user_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	logger.log(`Completed associations of the ${Object.keys(sequelize.models).length} models`);
};

export default init;
