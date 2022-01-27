import { APIResp, APIError } from "../../global/global.js";

/*****************************************************
 * Functions
 *****************************************************/

/*const isValid = async (db, demoId) => {
	if (!demoId) return false;
	const demo = await db.query("SELECT demo_id FROM demo WHERE id = $1", [demoId]);
	return !!demo.rows.length;
};*/

/*****************************************************
 * CRUD Methods
 *****************************************************/

/* ---- CREATE ---------------------------------- */
/* ---- READ ------------------------------------ */
const get = async (db, params) => {
	const demo = await db.query("SELECT * FROM demo");

	if (!demo.rows.length) {
		throw new APIError(404, "Y'a rien en fait");
	}

	return new APIResp(200).setData({ demo: demo.rows });
};

/* ---- UPDATE ---------------------------------- */
/* ---- DELETE ---------------------------------- */

/*****************************************************
 * Export
 *****************************************************/

const Demo = { get };
export default Demo;
