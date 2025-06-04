export default class RomanNumeralConverter {
    static convert(num: number): string {
        const thousands = Math.floor(num / 1000);

        let numerator = thousands > 0 ? num % (thousands*1000) : num;

        const hundreds = numerator / 100

        const m = thousands > 3 ? 'CM' : 'M'.repeat(thousands);
        const c = hundreds === 4 ? 'CD' : 'C'.repeat(hundreds)

        return '' + m + c;
    }
}