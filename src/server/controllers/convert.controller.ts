import { Request, Response } from "express";
import RomanNumeralConverter from "../roman-numeral-converter.js";

/**
 * Converts an integer to a Roman numeral by routing the request data to an internal converter.
 * @param req
 * @param res
 */
export function convert(req: Request, res: Response): Response {
    const {number} = req.body;

    try {
        // The RomanNumeralConverter.convert method will validate if 'number' is an integer
        // and if it's within the acceptable range (0-3999).
        const romanNumeral = RomanNumeralConverter.convert(number);
        return res.json({ converted: romanNumeral });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message, input: number });
        }
        // Fallback for non-Error objects thrown
        return res.status(500).json({
            error: `An unknown validation error occurred from the given input number ${number}.`, input: number
        });
    }
}
