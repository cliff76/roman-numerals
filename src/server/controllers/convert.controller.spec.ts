import { Request, Response } from 'express';
import { convert } from './convert.controller';
import RomanNumeralConverter from '../roman-numeral-converter.js';

// Mock the RomanNumeralConverter
jest.mock('../roman-numeral-converter.js');

describe('Convert Controller', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let responseJson: any;
    let responseStatus: number;

    beforeEach(() => {
        responseJson = {};
        responseStatus = 0;
        mockRequest = {
            body: {},
        };
        mockResponse = {
            json: jest.fn().mockImplementation((result) => {
                responseJson = result;
                return mockResponse as Response;
            }),
            status: jest.fn().mockImplementation((status) => {
                responseStatus = status;
                return mockResponse as Response;
            }),
        };
        // Reset mocks before each test
        (RomanNumeralConverter.convert as jest.Mock).mockClear();
    });

    test('should return a Roman numeral for a valid number', () => {
        mockRequest.body = { number: 10 };
        (RomanNumeralConverter.convert as jest.Mock).mockReturnValue('X');

        convert(mockRequest as Request, mockResponse as Response);

        expect(RomanNumeralConverter.convert).toHaveBeenCalledWith(10);
        expect(mockResponse.json).toHaveBeenCalledWith({ converted: 'X' });
        expect(responseJson).toEqual({ converted: 'X' });
    });

    test('should return 400 if number is not an integer', () => {
        mockRequest.body = { number: 10.5 };
        const errorMessage = 'Input must be an integer.';
        (RomanNumeralConverter.convert as jest.Mock).mockImplementation(() => {
            throw new Error(errorMessage);
        });

        convert(mockRequest as Request, mockResponse as Response);

        expect(RomanNumeralConverter.convert).toHaveBeenCalledWith(10.5);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage, input: 10.5 });
        expect(responseStatus).toBe(400);
        expect(responseJson).toEqual({ error: errorMessage, input: 10.5 });
    });

    test('should return 400 if number is out of range (e.g., negative)', () => {
        mockRequest.body = { number: -1 };
        const errorMessage = 'Input number out of range (must be 0-3999).';
        (RomanNumeralConverter.convert as jest.Mock).mockImplementation(() => {
            throw new Error(errorMessage);
        });

        convert(mockRequest as Request, mockResponse as Response);

        expect(RomanNumeralConverter.convert).toHaveBeenCalledWith(-1);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage, input: -1 });
        expect(responseStatus).toBe(400);
        expect(responseJson).toEqual({ error: errorMessage, input: -1 });
    });

    test('should return 400 if number is out of range (e.g., > 3999)', () => {
        mockRequest.body = { number: 4000 };
        const errorMessage = 'Input number out of range (must be 0-3999).';
        (RomanNumeralConverter.convert as jest.Mock).mockImplementation(() => {
            throw new Error(errorMessage);
        });

        convert(mockRequest as Request, mockResponse as Response);

        expect(RomanNumeralConverter.convert).toHaveBeenCalledWith(4000);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage, input: 4000 });
        expect(responseStatus).toBe(400);
        expect(responseJson).toEqual({ error: errorMessage, input: 4000 });
    });
    
    test('should return 500 for an unknown error during conversion', () => {
        mockRequest.body = { number: 5 };
        // Simulate a non-Error object being thrown
        (RomanNumeralConverter.convert as jest.Mock).mockImplementation(() => {
            throw 'Unknown error';
        });

        convert(mockRequest as Request, mockResponse as Response);

        expect(RomanNumeralConverter.convert).toHaveBeenCalledWith(5);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: `An unknown validation error occurred from the given input number 5.`, input: 5
        });
        expect(responseStatus).toBe(500);
        expect(responseJson).toEqual({
            error: `An unknown validation error occurred from the given input number 5.`, input: 5
        });
    });
});
