import { fileInputToLines } from "../lib/fileInputToLines";

export const main = async (inputPath = "part1-input.txt") => {
  const lines = await fileInputToLines(inputPath);
  const cards: Card[] = lines.map((line) => {
    const id = +line.split(":")[0].trim().replace("Card ", "");
    const winningNumbers = parseCards("winning", line);
    const playedNumbers = parseCards("played", line);
    const amountOfMatchingCards = playedNumbers.filter((x) =>
      winningNumbers.includes(x)
    ).length;
    return {
      id,
      winningNumbers,
      playedNumbers,
      amountOfMatchingCards,
    };
  });

  const calculatePoints = cards
    .map((card) =>
      card.amountOfMatchingCards === 0
        ? 0
        : Math.pow(2, card.amountOfMatchingCards - 1)
    )
    .reduce((acc, pow) => acc + pow, 0);

  console.log(`Day 4 / Part 1 Result: ${calculatePoints}`);
  return calculatePoints;
};

main();

type Card = {
  id: number;
  winningNumbers: number[];
  playedNumbers: number[];
  amountOfMatchingCards: number;
};

const parseCards = (kind: "winning" | "played", line: string) => {
  const numbers = line
    .split(":")[1]
    .split("|")
    [kind === "winning" ? 0 : 1].trim()
    .split(" ");
  return numbers.filter(Boolean).map((n) => +n);
};
