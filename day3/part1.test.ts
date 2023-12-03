import { describe, expect, it } from "bun:test";
import { main } from "./part1";

describe("day3 - Part 1", () => {
  it("golden number", async () => {
    expect(await main("p1testInput.txt")).toEqual(4361);
  });
});
