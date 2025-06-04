import { Request, Response } from "express";
import RomanNumeralConverter from "../roman-numeral-converter.js";

/**
 * Converts an integer to a Roman numeral by routing the request data to an internal converter.
 * @param req
 * @param res
 */
export function convert(req: Request, res: Response): Response {
    const {number} = req.body;

    if (typeof number !== 'number') {
        return res.status(400).json({error: "Invalid input: 'number' must be a number."});
    }

    if (number < 1 || number > 3999) {
        return res.status(400).json({error: "Number out of range (1-3999)."});
    }

    const romanNumeral = RomanNumeralConverter.convert(number);
    res.json({result: romanNumeral});
    return res.json({ converted: romanNumeral });
}