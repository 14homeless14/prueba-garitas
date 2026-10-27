import { describe, it, expect } from "vitest";
import { trafficLevel } from "./traffic-light";

describe("trafficLevel", () => {
  it.each([
    [null, "unknown"],
    [0, "green"],
    [29, "green"],
    [30, "yellow"],
    [90, "yellow"],
    [91, "red"],
  ])("%s min -> %s", (m, expected) => {
    expect(trafficLevel(m as number | null)).toBe(expected);
  });
});
