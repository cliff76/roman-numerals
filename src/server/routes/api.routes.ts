import {Router} from "express";
import {convert} from "../controllers/convert.controller.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     ConversionRequest:
 *       type: object
 *       required:
 *         - number
 *       properties:
 *         number:
 *           type: integer
 *           description: The number to convert to a Roman numeral.
 *           minimum: 1
 *           maximum: 3999
 *           example: 1994
 *     ConversionResponse:
 *       type: object
 *       properties:
 *         roman:
 *           type: string
 *           description: The Roman numeral representation of the number.
 *           example: "MCMXCIV"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Description of the error.
 */
class ApiRoutes {
    router = Router();

    constructor() {
        /**
         * @swagger
         * /convert:
         *   post:
         *     summary: Converts an integer to a Roman numeral.
         *     description: This (POST) request will process the number and return the Roman numeral. It is an idempotent operation.
         *     tags: [Converter]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/ConversionRequest'
         *     responses:
         *       200:
         *         description: Successful conversion.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ConversionResponse'
         *       400:
         *         description: Invalid input or number out of range.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ErrorResponse'
         *             examples:
         *               invalidInput:
         *                 summary: Invalid input type
         *                 value:
         *                   error: "Invalid input: 'number' must be a number."
         *               outOfRange:
         *                 summary: Number out-of-range
         *                 value:
         *                   error: "Number out of range (1-3999)."
         */
        this.router.post("/convert", convert);
    }
}

export default new ApiRoutes().router;
