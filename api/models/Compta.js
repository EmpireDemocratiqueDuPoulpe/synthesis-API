import { DataTypes } from "sequelize";

const Compta = {
	compta_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	payment_type: {
		type: DataTypes.ENUM,
		values: ["OPCA", "Comptant", "Echelonnemt"],
	},
	payment_due: { type: DataTypes.FLOAT },
	paid: { type: DataTypes.BOOLEAN },
	relance: { type: DataTypes.BOOLEAN },
};

export const define = (sequelize) => {
	sequelize.define("Compta", Compta);
};

export default Compta;
