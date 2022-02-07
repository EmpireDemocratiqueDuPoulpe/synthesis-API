import { DataTypes } from "sequelize";

const init = (sequelize, logger) => {
	logger.log(`Making associations ([${Object.keys(sequelize.models).join(", ")}])...`);

	/* ---- User ------------------------------------ */
	sequelize.models.Enterprise.belongsTo(sequelize.models.User, {
		foreignKey: {
			name: "user_id",
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	logger.log(`Completed associations of the ${Object.keys(sequelize.models).length} models`);
};

export default init;
