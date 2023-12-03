import { fileInputToLines } from "../lib/fileInputToLines";

export const main = async (inputPath = "input.txt") => {
  const lines = await fileInputToLines(inputPath);
  let lineIdx = 0;
  let pnPositions: PNPosition = {};
  let starPositionsPerLine: StarPosition = {};
  let gearRatio: number[] = [];
  for (let line of lines) {
    let charIdx = 0;
    for (const char of line) {
      if (!isNaN(+char)) {
        const lastNum = line.slice(charIdx).search(/[^0-9]/);
        const xEnd = charIdx + (lastNum === -1 ? line.length : lastNum - 1);

        const savedLine = pnPositions?.[lineIdx];
        if (!savedLine) {
          pnPositions[lineIdx] = [
            {
              xStart: charIdx,
              xEnd,
              lineIdx,
            },
          ];
        } else {
          // check if charIdx is between xStart and xEnd
          const pnAlreadySaved = savedLine.find((pn) => {
            return charIdx >= pn.xStart && charIdx <= pn.xEnd;
          });
          if (!pnAlreadySaved) {
            savedLine.push({
              xStart: charIdx,
              xEnd,
              lineIdx,
            });
          }
        }
      } else if (char === "*") {
        const savedLine = starPositionsPerLine?.[lineIdx];
        if (!savedLine) {
          starPositionsPerLine[lineIdx] = [
            {
              x: charIdx,
            },
          ];
        } else {
          savedLine.push({
            x: charIdx,
          });
        }
      }
      charIdx++;
    }
    lineIdx++;
  }
  for (const [lineIdx, positions] of Object.entries(starPositionsPerLine)) {
    for (const starPosition of positions) {
      const { x } = starPosition;
      const pnOnLeft = pnPositions[+lineIdx].find((pn) => pn.xEnd === x - 1);
      const pnOnRight = pnPositions[+lineIdx].find((pn) => pn.xStart === x + 1);
      const pnsOnTop = pnPositions[+lineIdx - 1].filter(
        (pn) => x >= pn.xStart - 1 && x <= pn.xEnd + 1
      );
      const pnsOnBottom = pnPositions[+lineIdx + 1].filter(
        (pn) => x >= pn.xStart - 1 && x <= pn.xEnd + 1
      );

      const amountOfAdjacentPns = [
        pnOnLeft,
        pnOnRight,
        ...pnsOnTop,
        ...pnsOnBottom,
      ].filter((pn) => pn).length;

      if (amountOfAdjacentPns === 2) {
        const [pn1, pn2] = [
          pnOnLeft,
          pnOnRight,
          ...pnsOnTop,
          ...pnsOnBottom,
        ].filter(Boolean);

        if (!pn1 || !pn2) {
          throw new Error("Oops");
        }
        const pn1Value = Number(
          lines[pn1.lineIdx].slice(pn1.xStart, pn1.xEnd + 1)
        );
        const pn2Value = Number(
          lines[pn2.lineIdx].slice(pn2.xStart, pn2.xEnd + 1)
        );

        gearRatio.push(pn1Value * pn2Value);
      }
    }
  }
  const sumGearRatio = gearRatio.reduce((acc, curr) => acc + curr, 0);
  console.log(`Day 3 Part 2 Answer: ${sumGearRatio}`);
};

main();

type PNPosition = Record<
  number, // lineIdx
  {
    xStart: number;
    xEnd: number;
    lineIdx: number;
  }[]
>;
type StarPosition = Record<
  number, // lineIdx
  {
    x: number;
  }[]
>;
