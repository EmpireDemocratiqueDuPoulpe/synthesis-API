import { DataTypes } from "sequelize";

const init = (sequelize, logger) => {
	logger.log(`Making associations ([${Object.keys(sequelize.models).join(", ")}])...`);

	/* ---- User ------------------------------------ */
	// Job * - 1 User
	sequelize.models.User.hasMany(sequelize.models.Job, {
		foreignKey: {
			name: "user_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	// Study 1 - 1 User
	sequelize.models.Study.hasOne(sequelize.models.User, {
		foreignKey: {
			name: "user_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	// Note * - 1 User
	sequelize.models.User.hasMany(sequelize.models.Note, {
		foreignKey: {
			name: "user_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	// Absence * - 1 User
	sequelize.models.User.hasMany(sequelize.models.Absence, {
		foreignKey: {
			name: "user_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	// Compta 1 - 1 User
	sequelize.models.User.hasOne(sequelize.models.Compta, {
		foreignKey: {
			name: "user_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	/* ---- Module ------------------------------------ */
	// Module 1 - * Note
	sequelize.models.Module.hasMany(sequelize.models.Note, {
		foreignKey: {
			name: "module_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	logger.log(`Completed associations of the ${Object.keys(sequelize.models).length} models`);
};

export default init;
