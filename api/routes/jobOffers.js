/**
 * @module jobOffers
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import multer from "multer";
import mime from "mime";
import { v4 as UUIDV4 } from "uuid";
import { Logger, APIError } from "../../global/global.js";
import { JobOffer } from "../interfaces/interfaces.js";
import { API } from "../../config/config.js";

const route = AsyncRouter();
const logger = new Logger({ separator: ": " });

// Job offer attachements upload settings
const uploadJobOffer = multer({
	storage: multer.diskStorage({
		destination: API.uploads.jobOfferAttachement.folder,
		filename: (req, file, cb) => cb(null, `attachement-${Date.now()}-${UUIDV4()}.${mime.getExtension(file.mimetype)}`),
	}),
	limits: { fileSize: API.uploads.jobOfferAttachement.maxSize },
}).array(API.uploads.jobOfferAttachement.fieldName);

export default (router) => {
	router.use("/jobs/offers", route);

	/* ---- CREATE ---------------------------------- */
	/**
	 * POST /v1/jobs/offers
	 * @summary Add a job offer
	 * @security BearerAuth
	 * @tags JobOffers
	 *
	 * @param {NewJobOffer} request.body.required - Job offer info - application/json
	 *
	 * @return {SuccessResp} 200 - **Success**: the job offer is added - application/json
	 * @return {ErrorResp} 400 - **Bad request**: the provided data is invalid - application/json
	 *
	 * @example request - Add a job offer
	 * { "jobOffer": {
	 *  "job_domain_id": 1, "title": "Yo", "company_name": "Great Smog", "city": "S.A", "postal_code": "69420",
	 *  "content": "searchin' cops"
	 * }}
	 * @example response - 200 - Success response
	 * { "code": 200, "jobOfferID": 1 }
	 * @example response - 400 - Bad request response
	 * { "code": 400, "error": "Le titre ne peut pas être vide.", "fields": null }
	 */
	route.post("/", async (request, response) => {
		uploadJobOffer(request, response, async function(err) {
			if (err) {
				// TODO: Translate errors
				throw new APIError((err instanceof multer.MulterError ? 400 : 500), err.message, "attachements");
			}
			const { jobOffer } = request.body;

			const resp = await JobOffer.add(jobOffer, request.files);
			response.status(resp.code).json(resp.toJSON());

			logger.log("Add a new job offer", { ip: request.clientIP, params: {code: resp.code, title: jobOffer?.name} });
		});
	});

	/* ---- READ ------------------------------------ */
	/**
	 * GET /v1/jobs/offers/all
	 * @summary Get all job offers
	 * @security BearerAuth
	 * @tags JobOffers
	 *
	 * @return {SuccessResp} 200 - **Success**: the job offers are returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "jobOffers": [{
	 *  "job_offer_id": 1, "job_domain_id": 1, "title": "Yo", "company_name": "Great Smog", "city": "S.A", "postal_code": "69420",
	 *  "content": "searchin' cops"
	 * }]}
	 */
	route.get("/all", async (request, response) => {
		const resp = await JobOffer.getAll(request.query);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves all job offers", { ip: request.clientIP, params: {code: resp.code} });
	});

	/**
	 * GET /v1/jobs/offers/by-id/{jobOfferID}
	 * @summary Get a job offer by its id
	 * @security BearerAuth
	 * @tags JobOffers
	 *
	 * @param {number} jobOfferID.path.required - Job offer id
	 *
	 * @return {SuccessResp} 200 - **Success**: the job offer is returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "jobOffer": {
	 *  "job_offer_id": 1, "job_domain_id": 1, "title": "Yo", "company_name": "Great Smog", "city": "S.A", "postal_code": "69420",
	 *  "content": "searchin' cops"
	 * }}
	 */
	route.get("/by-id/:jobOfferID", async (request, response) => {
		const resp = await JobOffer.getByID(request.params.jobOfferID);
		response.status(resp.code).json(resp.toJSON());

		logger.log("Retrieves a job offer by its ID", { ip: request.clientIP, params: {code: resp.code, jobOfferID: request.params.jobOfferID} });
	});

	/* ---- UPDATE ---------------------------------- */
	/* ---- DELETE ---------------------------------- */
};
