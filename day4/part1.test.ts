import { describe, expect, it } from "bun:test";
import { main } from "./part1";

describe("day4 - Part 1", () => {
  it("golden number", async () => {
    expect(await main("test-input.txt")).toEqual(13);
  });
});
