import { fileInputToLines } from "../lib/fileInputToLines";

const main = async () => {
  const games = await fileInputToLines("input.txt");
  const minCubsPerGame: ColoredCubesPerGame = {};
  for (const game of games) {
    const gameId = Number(game.split(":")[0].replace("Game ", ""));
    minCubsPerGame[gameId] = {
      red: 0,
      blue: 0,
      green: 0,
    };
    const sets = game.replace(`Game ${gameId}: `, "").split(";");
    for (const set of sets) {
      const redCubes = getColoredCubesFromSet(set, "red");
      if (redCubes) {
        if (minCubsPerGame[gameId].red < Number(redCubes)) {
          minCubsPerGame[gameId].red = Number(redCubes);
        }
      }
      const blueCubes = getColoredCubesFromSet(set, "blue");
      if (blueCubes) {
        if (minCubsPerGame[gameId].blue < Number(blueCubes)) {
          minCubsPerGame[gameId].blue = Number(blueCubes);
        }
      }
      const greenCubes = getColoredCubesFromSet(set, "green");
      if (greenCubes) {
        if (minCubsPerGame[gameId].green < Number(greenCubes)) {
          minCubsPerGame[gameId].green = Number(greenCubes);
        }
      }
    }
  }

  // add power to minCubsPerGame dic
  for (const [gameId, cubes] of Object.entries(minCubsPerGame)) {
    const { red, blue, green } = cubes;
    const power = red * blue * green;
    minCubsPerGame[Number(gameId)].power = power;
  }

  const result = Object.values(minCubsPerGame).reduce(
    (acc, curr) => acc + curr.power!,
    0
  );
  console.log(`Day 2 - Part 2: ${result}`);
};

const getColoredCubesFromSet = (
  set: string,
  color: "blue" | "green" | "red"
) => {
  const splitIntoColors = set.split(",");
  return splitIntoColors
    .find((split) => split.includes(color))
    ?.replace(color, "")
    .trim();
};

main();

type GameId = number;
type ColoredCubesPerGame = Record<
  GameId,
  {
    red: number;
    blue: number;
    green: number;
    power?: number;
  }
>;
