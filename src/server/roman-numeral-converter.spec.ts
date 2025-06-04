import {expect} from "vitest";
import RomanNumeralConverter from "./roman-numeral-converter.js";

describe('RomanNumeralConverter', () => {
    it('should convert 1000 to roman numerals', () => {
        expect(RomanNumeralConverter.convert(0)).toEqual('');
        expect(RomanNumeralConverter.convert(1000)).toEqual('M');
        expect(RomanNumeralConverter.convert(2000)).toEqual('MM');
        expect(RomanNumeralConverter.convert(3000)).toEqual('MMM');
    });

    it('should convert 100s and hundreds to roman numerals', () => {
        expect(RomanNumeralConverter.convert(100)).toEqual('C');
        expect(RomanNumeralConverter.convert(200)).toEqual('CC');
        expect(RomanNumeralConverter.convert(300)).toEqual('CCC');
        expect(RomanNumeralConverter.convert(400)).toEqual('CD');
    });

    it('should convert 500s and hundreds to roman numerals', () => {
        expect(RomanNumeralConverter.convert(500)).toEqual('D');
        expect(RomanNumeralConverter.convert(600)).toEqual('DC');
        expect(RomanNumeralConverter.convert(700)).toEqual('DCC');
        expect(RomanNumeralConverter.convert(800)).toEqual('DCCC');
        expect(RomanNumeralConverter.convert(900)).toEqual('CM');
    });

    it('should convert integers to roman numerals', () => {
        expect(RomanNumeralConverter.convert(4)).toEqual('IV');
        expect(RomanNumeralConverter.convert(5)).toEqual('V');
        expect(RomanNumeralConverter.convert(6)).toEqual('VI');
        expect(RomanNumeralConverter.convert(9)).toEqual('IX');
        expect(RomanNumeralConverter.convert(10)).toEqual('X');
        expect(RomanNumeralConverter.convert(11)).toEqual('XI');
        expect(RomanNumeralConverter.convert(3999)).toEqual('MMMCMXCIX');
    });

    describe('RomanNumeralConverter error handling for invalid inputs', () => {
        it('should throw an error for numbers less than 0', () => {
            expect(() => RomanNumeralConverter.convert(-1)).toThrowError('Input number out of range (must be 0-3999).');
            expect(() => RomanNumeralConverter.convert(-100)).toThrowError('Input number out of range (must be 0-3999).');
        });

        it('should throw an error for numbers greater than 3999', () => {
            expect(() => RomanNumeralConverter.convert(4000)).toThrowError('Input number out of range (must be 0-3999).');
            expect(() => RomanNumeralConverter.convert(10000)).toThrowError('Input number out of range (must be 0-3999).');
        });

        it('should throw an error for fractional numbers', () => {
            expect(() => RomanNumeralConverter.convert(3.14)).toThrowError('Input must be an integer.');
            expect(() => RomanNumeralConverter.convert(0.5)).toThrowError('Input must be an integer.');
            expect(() => RomanNumeralConverter.convert(199.99)).toThrowError('Input must be an integer.');
        });
    });
});
