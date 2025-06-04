import {expect} from "vitest";
import RomanNumeralConverter from "./roman-numeral-converter.js";

describe('RomanNumeralConverter', () => {
    it('should convert 1000 to roman numerals', () => {
        expect(RomanNumeralConverter.convert(0)).toEqual('');
        expect(RomanNumeralConverter.convert(1000)).toEqual('M');
        expect(RomanNumeralConverter.convert(2000)).toEqual('MM');
        expect(RomanNumeralConverter.convert(3000)).toEqual('MMM');
        expect(RomanNumeralConverter.convert(4000)).toEqual('CM');
    });

    it('should convert 100s and hundreds to roman numerals', () => {
        expect(RomanNumeralConverter.convert(100)).toEqual('C');
        expect(RomanNumeralConverter.convert(200)).toEqual('CC');
        expect(RomanNumeralConverter.convert(300)).toEqual('CCC');
        expect(RomanNumeralConverter.convert(400)).toEqual('CD');
    });
});