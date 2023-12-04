import { describe, expect, it } from "bun:test";
import { main } from "./part2";

describe("day4 - Part 2", () => {
  it("golden number", async () => {
    expect(await main("test-input.txt")).toEqual(30);
  });
});
