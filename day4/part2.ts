import { fileInputToLines } from "../lib/fileInputToLines";

export const main = async (inputPath = "part1-input.txt") => {
  const lines = await fileInputToLines(inputPath);
  let cards: Card[] = lines.map((line) => {
    const id = +line.split(":")[0].trim().replace("Card ", "");
    const winningNumbers = parseCards("winning", line);
    const playedNumbers = parseCards("played", line);
    const copyCardsWon = playedNumbers.filter((x) =>
      winningNumbers.includes(x)
    );
    return {
      id,
      winningNumbers,
      playedNumbers,
      copyCardsWon,
    };
  });

  let amountOfCards = cards.length;

  const redraw = () => {
    const oldCardsLength = cards.length;
    cards.push(
      ...cards.flatMap((card) =>
        card.copyCardsWon.map((copy) => {
          const originalIdx = cards.findIndex((c) => c.id === copy);
          return cards[originalIdx + 1];
        })
      )
    );
    const newCardsLength = cards.length;
    console.log({ oldCardsLength, newCardsLength, cards });
    amountOfCards = newCardsLength;
  };
  redraw();
  console.log(`Day 4 / Part 2 Result: ${amountOfCards}`);
  return amountOfCards;
};

main();

type CardId = number;

type Card = {
  id: CardId;
  winningNumbers: number[];
  playedNumbers: number[];
  copyCardsWon: CardId[];
};

const parseCards = (kind: "winning" | "played", line: string) => {
  const numbers = line
    .split(":")[1]
    .split("|")
    [kind === "winning" ? 0 : 1].trim()
    .split(" ");
  return numbers.filter(Boolean).map((n) => +n);
};
