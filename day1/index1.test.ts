import { describe, expect, it } from "bun:test";
import { getLineCalibrationValue } from "./index";

describe("day1/index1.ts", () => {
  it("should match overlapping numbers", () => {
    const input = "ninesevensrzxkzpmgz8kcjxsbdftwoner";
    const result = getLineCalibrationValue(input);
    expect(result).toEqual(91);
  });
});
