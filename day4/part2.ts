import { fileInputToLines } from "../lib/fileInputToLines";

export const main = async (inputPath: string) => {
  const lines = await fileInputToLines(inputPath);
  let cardsDic: CardDic = {};
  for (let i = 1; i < lines.length + 1; i++) {
    cardsDic[i] = {
      id: i,
      winningNumbers: [],
      playedNumbers: [],
      totalAmount: 1,
    };
  }
  lines.map((line) => {
    const id = +line.split(":")[0].trim().replace("Card ", "");
    const winningNumbers = parseCards("winning", line);
    const playedNumbers = parseCards("played", line);

    cardsDic[id].winningNumbers = winningNumbers;
    cardsDic[id].playedNumbers = playedNumbers;
    const matches = winningNumbers.filter((x) =>
      playedNumbers.includes(x)
    ).length;

    if (matches === 0) return;
    for (let i = 1; i <= matches; i++) {
      console.log("adding one copy of card", id + i, "from card", id);
      if (!cardsDic[id + i]) break;
      cardsDic[id + i].totalAmount += cardsDic[id].totalAmount;
    }
  });

  const totalAmountOfCards = Object.values(cardsDic).reduce(
    (acc, card) => acc + card.totalAmount,
    0
  );
  console.log(`Day 4 / Part 2 Result: ${totalAmountOfCards} different cards`);
  return totalAmountOfCards;
};

main("input.txt");

type CardId = number;

type CardDic = Record<
  CardId,
  {
    id: CardId;
    winningNumbers: number[];
    playedNumbers: number[];
    totalAmount: number;
  }
>;

const parseCards = (kind: "winning" | "played", line: string) => {
  const numbers = line
    .split(":")[1]
    .split("|")
    [kind === "winning" ? 0 : 1].trim()
    .split(" ");
  return numbers.filter(Boolean).map((n) => +n);
};
