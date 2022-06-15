/**
 * @module Compta
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
 * @typedef {Object} NewCompta
 *
 * @property {number} user_id
 * @property {string} payment_type
 * @property {number} payment_due
 * @property {boolean} paid
 * @property {boolean} relance
 */

/**
 * @typedef {Object} newAccounting
 *
 * @property {number} id
 * @property {number} student_id
 * @property {number} amount_due
 * @property {number} amount_paid
 * @property {number} percent_paid
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

	// Check if the new compta match the model
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

/**
 * Add a new compta from etl
 * @function
 * @async
 *
 * @param {newAccounting} newAccounting
 * @param {uuid} userId
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const addAccountings = async (newAccounting, userId) => {
	console.log(newAccounting, userId);
	const processAccounting = {
		payment_due: newAccounting.amount_due,
		paid: newAccounting.amount_paid,
		payment_type: "Comptant",
		user_id: userId,
	};

	// Add to the database
	const accounting = await models.compta.findOrCreate({
		where: {
			user_id: userId,
		},
		defaults: processAccounting});

	return { accountingID: accounting[0].compta_id };
};

/* ---- READ ------------------------------------ */
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

/**
 * Get user compta by its UUID
 * @function
 * @async
 *
 * @param {string} UUID
 * @throws {APIError}
 * @return {Promise<APIResp>}
 */
const getByUUID = async (UUID) => {
	const compta = await models.compta.findOne({
		include: [{
			model: models.user,
			as: "user",
			required: true,
			attributes: [],
			where: { uuid: UUID },
		}],
	});

	if (!compta) {
		throw new APIError(404, `L'utilisateur (${UUID}) n'a pas de comptabilité.`);
	}

	return new APIResp(200).setData({ compta });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const Compta = {
	add, addAccountings,	// CREATE
	getByID, getByUUID,	// READ
};
export default Compta;
