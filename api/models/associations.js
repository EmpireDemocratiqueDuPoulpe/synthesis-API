import { DataTypes } from "sequelize";

const init = (sequelize, logger) => {
	logger.log(`Making associations ([${Object.keys(sequelize.models).join(", ")}])...`);

	/* ---- User ------------------------------------ */
	sequelize.models.User.belongsTo(sequelize.models.Enterprise, {
		foreignKey: {
			name: "user_uuid",
			type: DataTypes.UUID,
			allowNull: false,
		},
	});

	logger.log(`Completed associations of the ${Object.keys(sequelize.models).length} models`);
};

export default init;
