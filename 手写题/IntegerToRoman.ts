const dict = [
  { value: 1000, symbol: "M" },
  { value: 900, symbol: "CM" },
  { value: 500, symbol: "D" },
  { value: 400, symbol: "CD" },
  { value: 100, symbol: "C" },
  { value: 90, symbol: "XC" },
  { value: 50, symbol: "L" },
  { value: 40, symbol: "XL" },
  { value: 10, symbol: "X" },
  { value: 9, symbol: "IX" },
  { value: 5, symbol: "V" },
  { value: 4, symbol: "IV" },
  { value: 1, symbol: "I" },
];
function integerToRoman(num: number, res: string = ""): string {
  if (num > 0) {
    const { symbol, value } = dict.find(({ value }) => num >= value)!;
    return integerToRoman(num - value, res + symbol);
  }
  return res;
}
