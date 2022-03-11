/**
 * @module Attachement
 * @category API
 * @subcategory Interfaces
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { isArray } from "lodash-es";
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
 * @typedef {Object} NewAttachement
 *
 * @property {number} ressource_id - This ID must be named after the relation between the attachement and its parent.
 * @property {string} name
 * @property {string} path
 * @property {number} size
 * @property {string} type
 */

/**
 * @typedef {Object} MulterFile
 *
 * @property {string} fieldname - Field name specified in the form.
 * @property {string} originalname - Name of the file on the user's computer.
 * @property {string} encoding - Encoding type of the file.
 * @property {number} mimetype - Mime type of the file.
 * @property {string} size - Size of the file in bytes.
 * @property {string} destination - The folder to which the file has been saved.
 * @property {string} filename - The name of the file within the `destination`.
 * @property {string} path - The full path to the uploaded file.
 * @property {string} buffer - A `Buffer` of the entire file.
 *
 * @see {@link https://www.npmjs.com/package/multer}
 */

/*****************************************************
 * Functions
 *****************************************************/

/*****************************************************
 * CRUD Methods
 *****************************************************/

/* ---- CREATE ---------------------------------- */
/**
 * Add new attachements
 * @function
 * @async
 *
 * @param {{ name: string, value: number }} parentKey - Key name/value of the parent primary key
 * @param {MulterFile|Array<MulterFile>} newAttachements
 * @param {Transaction} [transaction]
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const add = async (parentKey, newAttachements, transaction) => {
	const attachements = isArray(newAttachements) ? newAttachements : [newAttachements];

	const insertQueries = attachements.map((fileInfo) => {
		const attachement = {
			[parentKey.name]: parentKey.value,
			name: fileInfo.originalname,
			path: fileInfo.path.replace(/^uploads\\/, ""),
			size: fileInfo.size,
			type: fileInfo.mimetype,
		};

		return models.attachement.build(attachement).validate({ skip: ["attachement_id"] })
			.then(() => {
				return models.attachement.create(attachement, { transaction: (transaction ?? undefined )})
					.then((insertedAttachement) => insertedAttachement.attachement_id);
			})
			.catch(err => { throw new APIError(400, "error", Object.values(err)); });
	});

	const attachementsIDs = await Promise.all(insertQueries);
	return new APIResp(200).setData({ attachementsIDs });
};

/* ---- READ ------------------------------------ */
/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const Attachement = {
	add,	// CREATE
};
export default Attachement;
