import { DataTypes } from "sequelize";

const Note = {
	note_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	note: { type: DataTypes.DECIMAL(6, 2) },
};

export const define = (sequelize) => {
	sequelize.define("Note", Note);
};

export default Note;
