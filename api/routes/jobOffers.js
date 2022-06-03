/**
 * @module jobOffers
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import AsyncRouter from "express-promise-router";
import multer from "multer";
import mime from "mime";
import { v4 as UUIDV4 } from "uuid";
import { authenticator } from "../middlewares/middlewares.js";
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
	 * @param {string} brokilone.header.required - Auth header
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
	route.post("/", authenticator, async (request, response, next) => {
		if (await request.user.hasAllPermissions("MANAGE_INTERNSHIP_OFFERS")) {
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
		} else next(new APIError(403, "Permission denied: couldn't access this endpoint."));
	});

	/* ---- READ ------------------------------------ */
	/**
	 * GET /v1/jobs/offers/all
	 * @summary Get all job offers
	 * @security BearerAuth
	 * @tags JobOffers
	 *
	 * @param {string} brokilone.header.required - Auth header
	 * @param {string} expired.query - Get expired job offers?
	 *
	 * @return {SuccessResp} 200 - **Success**: the job offers are returned - application/json
	 *
	 * @example response - 200 - Success response
	 * { "code": 200, "jobOffers": [{
	 *  "job_offer_id": 1, "job_domain_id": 1, "title": "Yo", "company_name": "Great Smog", "city": "S.A", "postal_code": "69420",
	 *  "content": "searchin' cops"
	 * }]}
	 */
	route.get("/all", authenticator, async (request, response, next) => {
		if (await request.user.hasAllPermissions("READ_INTERNSHIP_OFFERS")) {
			const resp = await JobOffer.getAll(request.query);
			response.status(resp.code).json(resp.toJSON());

			logger.log("Retrieves all job offers", { ip: request.clientIP, params: {code: resp.code, ...request.query} });
		} else next(new APIError(403, "Permission denied: couldn't access this endpoint."));
	});

	/**
	 * GET /v1/jobs/offers/by-id/{jobOfferID}
	 * @summary Get a job offer by its id
	 * @security BearerAuth
	 * @tags JobOffers
	 *
	 * @param {string} brokilone.header.required - Auth header
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
	route.get("/by-id/:jobOfferID", authenticator, async (request, response, next) => {
		if (await request.user.hasAllPermissions("READ_INTERNSHIP_OFFERS")) {
			const resp = await JobOffer.getByID(request.params.jobOfferID);
			response.status(resp.code).json(resp.toJSON());

			logger.log("Retrieves a job offer by its ID", { ip: request.clientIP, params: {code: resp.code, jobOfferID: request.params.jobOfferID} });
		} else next(new APIError(403, "Permission denied: couldn't access this endpoint."));
	});

	/* ---- UPDATE ---------------------------------- */
	/**
	 * PUT /v1/jobs/offers
	 * @summary Update a job offer by its id
	 * @security BearerAuth
	 * @tags JobOffers
	 *
	 * @param {string} brokilone.header.required - Auth header
	 * @param {number} request.body.required - Job offer - application/json
	 *
	 * @return {SuccessResp} 200 - **Success**: the job offer is updated - application/json
	 * @return {ErrorResp} 400 - **Bad request**: the job offer id is invalid - application/json
	 *
	 * @example request - Update a job offer
	 * { "jobOfferID": 1, "content": "on prend plus les moches" }
	 * @example response - 200 - Success response
	 * { "code": 200, "jobOfferID": 1 }
	 * @example response - 400 - Bad request response
	 * { "code": 400, "error": "", "fields": null }
	 */
	route.put("/", authenticator, async (request, response, next) => {
		if (await request.user.hasAllPermissions("MANAGE_INTERNSHIP_OFFERS")) {
			const resp = await JobOffer.update(request.body.jobOffer);
			response.status(resp.code).json(resp.toJSON());

			logger.log("Update a job offer by its ID", { ip: request.clientIP, params: {code: resp.code, jobOffer: request.body.jobOffer.job_offer_id} });
		} else next(new APIError(403, "Permission denied: couldn't access this endpoint."));
	});

	/* ---- DELETE ---------------------------------- */
	/**
	 * DELETE /v1/jobs/offers/delete
	 * @summary Delete a job offer by its id
	 * @security BearerAuth
	 * @tags JobOffers
	 *
	 * @param {string} brokilone.header.required - Auth header
	 * @param {number} request.body.required - Job offer id - application/json
	 *
	 * @return {SuccessResp} 200 - **Success**: the job offer is deleted - application/json
	 * @return {ErrorResp} 400 - **Bad request**: the job offer id is invalid - application/json
	 *
	 * @example request - Delete a job offer
	 * { "jobOfferID": 1 }
	 * @example response - 200 - Success response
	 * { "code": 200 }
	 * @example response - 400 - Bad request response
	 * { "code": 400, "error": "", "fields": null }
	 */
	route.delete("/delete", authenticator, async (request, response, next) => {
		if (await request.user.hasAllPermissions("MANAGE_INTERNSHIP_OFFERS")) {
			const resp = await JobOffer.delete(request.body.jobOfferID);
			response.status(resp.code).json(resp.toJSON());

			logger.log("Deletes a job offer by its ID", { ip: request.clientIP, params: {code: resp.code, jobOfferID: request.body.jobOfferID} });
		} else next(new APIError(403, "Permission denied: couldn't access this endpoint."));
	});
};
