/**
 * @module Compta
 * @author Maxence P. <maxence.pawlowski@supinfo.com>
 */

import sequelize from "../sequelizeLoader.js";
import { APIResp, APIError } from "../../global/global.js";

const { models } = sequelize;

/**
 * @typedef {Object} NewCompta
 *
 * @property {number} user_id
 * @property {string} payment_type
 * @property {number} payment_due
 * @property {boolean} paid
 * @property {boolean} relance
 */

/*****************************************************
 * Functions
 *****************************************************/


/*****************************************************
 * CRUD Methods
 *****************************************************/

/* ---- CREATE ---------------------------------- */
/**
 * Add a new compta
 * @function
 * @async
 *
 * @param {NewCompta} newCompta
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const add = async (newCompta) => {
	const processedCompta = newCompta;

	// Check if the new user match the model
	const model = models.compta.build(processedCompta);

	try {
		await model.validate({ skip: ["compta_id"] });
	} catch (err) {
		// TODO: Adapt the system
		throw new APIError(400, "error", Object.values(err));
	}

	// Add to the database
	const compta = await models.compta.create(processedCompta);

	return new APIResp(200).setData({ comptaID: compta.compta_id });
};

/* ---- READ ------------------------------------ */
/**
 * Get all comptas
 * @function
 * @async
 *
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const getAll = async () => {
	const comptas = await models.compta.findAll();

	return new APIResp(200).setData({ comptas });
};

/**
 * Get one compta by its id
 * @function
 * @async
 *
 * @param {number} comptaID
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const getByID = async (comptaID) => {
	const compta = await models.compta.findOne({
		where: { compta_id: comptaID },
	});

	if (!compta) {
		throw new APIError(404, `La compta (${comptaID}) n'existe pas.`);
	}

	return new APIResp(200).setData({ compta });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const Compta = {
	add,							// CREATE
	getAll, getByID,	// READ
};
export default Compta;
