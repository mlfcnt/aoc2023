import { fileInputToLines } from "../lib/fileInputToLines";

export const main = async (inputPath = "input.txt") => {
  const lines = await fileInputToLines(inputPath);
  let lineIdx = 0;
  let pnPositions: PNPosition = {};
  let symbolPositions: SymbolPosition = {};
  let partNumbers: number[] = [];
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
            });
          }
        }
      } else if (char !== ".") {
        const savedLine = symbolPositions?.[lineIdx];
        if (!savedLine) {
          symbolPositions[lineIdx] = [
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

  // console.log(pnPositions[106]);

  for (const [lineIdx, positions] of Object.entries(pnPositions)) {
    for (const pnPosition of positions) {
      const { xStart, xEnd } = pnPosition;
      const pn = Number(lines[+lineIdx].slice(xStart, xEnd + 1));

      const isAdjacentToSymbolLeft = symbolPositions?.[+lineIdx]?.find(
        (symbol) => {
          return symbol.x === xStart - 1;
        }
      );

      if (isAdjacentToSymbolLeft) {
        partNumbers.push(pn);
        continue;
      }
      const isAdjacentToSymbolRight = symbolPositions?.[+lineIdx]?.find(
        (symbol) => {
          return symbol.x === xEnd + 1 || xEnd === lines[+lineIdx].length - 1;
        }
      );
      if (isAdjacentToSymbolRight) {
        partNumbers.push(pn);
        continue;
      }
      const isAdjacentToSymbolTop = symbolPositions?.[+lineIdx - 1]?.find(
        (symbol) => {
          // on the line above, check if there is a symbol at the same x (with diagonal)
          return symbol.x >= xStart - 1 && symbol.x <= xEnd + 1;
        }
      );
      if (isAdjacentToSymbolTop) {
        partNumbers.push(pn);
        continue;
      }
      const isAdjacentToSymbolBottom = symbolPositions?.[+lineIdx + 1]?.find(
        (symbol) => {
          // same as top
          return symbol.x >= xStart - 1 && symbol.x <= xEnd + 1;
        }
      );
      if (isAdjacentToSymbolBottom) {
        partNumbers.push(pn);
        continue;
      }
    }
  }
  const sumOfPns = partNumbers.reduce((acc, pn) => (acc += pn), 0);
  console.log(partNumbers);
  console.log(`Day 3, first part result : ${sumOfPns}`);
  return sumOfPns;
};

main();

type PNPosition = Record<
  number, // lineIdx
  {
    xStart: number;
    xEnd: number;
  }[]
>;
type SymbolPosition = Record<
  number, // lineIdx
  {
    x: number;
  }[]
>;
