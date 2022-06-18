/**
 * @module Note
 * @category API
 * @subcategory Interfaces
 * @author Maxence P. <maxence.pawlowski@supinfo.com>
 */

import sequelize from "../sequelizeLoader.js";
import { APIResp, APIError } from "../../global/global.js";

/**
 * Sequelize models
 * @const
 * @name models
 * @type {Object<Sequelize.models>}
 */
const { models } = sequelize;

/**
 * @typedef {Object} NewNote
 *
 * @property {number} user_id
 * @property {number} module_id
 * @property {number} note
 */

/*****************************************************
 * Functions
 *****************************************************/

/*****************************************************
 * CRUD Methods
 *****************************************************/

/* ---- CREATE ---------------------------------- */
/**
 * Add a new note
 * @function
 * @async
 *
 * @param {NewNote} newNote
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const add = async (newNote) => {
	const note = await models.note.create(newNote);
	return new APIResp(200).setData({ noteID: note.note_id });
};

/* ---- READ ------------------------------------ */
/**
 * Get one note by its id
 * @function
 * @async
 *
 * @param {number} noteID
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const getByID = async (noteID) => {
	const note = await models.note.findOne({
		where: { note_id: noteID },
	});

	if (!note) {
		throw new APIError(404, `Cette note (${noteID}) n'existe pas.`);
	}

	return new APIResp(200).setData({ note });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const Note = {
	add,					// CREATE
	getByID,						// READ
};
export default Note;
