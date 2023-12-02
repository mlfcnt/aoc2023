import { fileInputToLines } from "../lib/readInput";

const main = async () => {
  const lines = await fileInputToLines("input.txt");

  const result = lines.reduce((acc, line) => {
    acc += getLineCalibrationValue(line);
    return acc;
  }, 0);
  console.log(result);
  return null;
};

const getLineCalibrationValue = (line: string) => {
  const numbers = line.match(spelledOutNumbersRegex);
  if (!numbers) {
    throw new Error("No numbers found in line");
  }
  const firstNumber = isNaN(+numbers[0])
    ? spelledOutNumbers[numbers[0]]
    : +numbers[0];

  // Use numbers.slice(-1)[0] instead of numbers[numbers.length - 1]
  const lastNumber = isNaN(+numbers.slice(-1)[0])
    ? spelledOutNumbers[numbers.slice(-1)[0]]
    : numbers.slice(-1)[0];

  console.log(
    line,
    firstNumber,
    lastNumber,
    `${firstNumber}${lastNumber}`,
    numbers
  );

  return Number(`${firstNumber}${lastNumber}`);
};

const spelledOutNumbers: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

// Add a lookahead assertion for each spelled out number
const spelledOutNumbersRegex = new RegExp(
  Object.keys(spelledOutNumbers)
    .map((key) => key + "(?![a-z])")
    .join("|") + "|[1-9]",
  "g"
);
main();
