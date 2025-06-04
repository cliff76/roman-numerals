export default class RomanNumeralConverter {
    static convert(num: number): string {
        if (!Number.isInteger(num)) {
            throw new Error('Input must be an integer.');
        }

        if (num < 0 || num > 3999) {
            throw new Error('Input number out of range (must be 0-3999).');
        }

        const romanSymbols: [string, number][] = [
            ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400], ['C', 100],
            ['XC', 90], ['L', 50], ['XL', 40], ['X', 10], ['IX', 9],
            ['V', 5], ['IV', 4], ['I', 1]
        ];
        let result = '';

        for (const [symbol, value] of romanSymbols) {

            while (num >= value) {
                result += symbol;
                num -= value;
            }
        }

        return result;

    }
}
