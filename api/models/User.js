import { DataTypes } from "sequelize";

const User = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	uuid: {
		type: DataTypes.UUID,
		// primaryKey: true,
		allowNull: false,
	},
	name: { type: DataTypes.STRING },
	email: { type: DataTypes.STRING },
	birth_date: { type: DataTypes.DATE },
};

export const define = (sequelize) => {
	sequelize.define("User", User);
};

export default User;
