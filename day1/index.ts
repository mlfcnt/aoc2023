import { fileInputToLines } from "../lib/fileInputToLines";

const main = async () => {
  const lines = await fileInputToLines("input.txt");

  const result = lines.reduce((acc, line) => {
    acc += getLineCalibrationValue(line);
    return acc;
  }, 0);
  console.log(`Day 1, second puzzle result : ${result}`);
  return null;
};

export const getLineCalibrationValue = (line: string) => {
  const results: number[] = [];

  for (let index = 0; index < line.length; index++) {
    const letter = line[index];
    if (letter.match(/[0-9]/)) {
      results.push(Number(letter));
    } else {
      const numbersThatStartWithLetter = getNumbersWithFirstLetter(letter);
      if (!numbersThatStartWithLetter.length) {
        continue;
      } else {
        for (const numberToMatch of numbersThatStartWithLetter) {
          const slicedString = line.slice(index, index + numberToMatch.length);

          if (slicedString === numberToMatch) {
            results.push(Number(spelledOutNumbers[slicedString]));
          } else {
            continue;
          }
        }
      }
    }
  }
  const firstNumber = results[0];
  const lastNumber = results[results.length - 1];
  const calibrationValue = Number(`${firstNumber}${lastNumber}`);
  if (isNaN(calibrationValue)) {
    throw new Error("calibrationValue is NaN");
  }
  return calibrationValue;
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

const getNumbersWithFirstLetter = (letter: string) => {
  return Object.entries(spelledOutNumbers)
    .filter(([key]) => key[0] === letter)
    .map((x) => x[0]);
};

main();
