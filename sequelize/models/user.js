import { DataTypes } from "sequelize";

const User = {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
	},
	uuid: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
	},
	name: {type: DataTypes.STRING},
	email: {type: DataTypes.STRING},
	birth_date: {type: DataTypes.DATE},
};

export default User;
