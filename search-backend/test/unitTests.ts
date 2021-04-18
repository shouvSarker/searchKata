import { describe } from "mocha";
import { expect } from "chai";
import { getMatches, searchEngineOutcomes } from "../src/search";

describe("Lambda helper functions", () => {
  it("should get matches", async () => {
    const testRegex = new RegExp("https://www.infotrack.com.au", "g");
    const outcome = await getMatches(
      "https://infotrack-tests.infotrack.com.au/Google",
      ["div.rc, li.ads-fr"],
      1,
      testRegex,
      0,
      50,
      []
    );

    expect(outcome).to.deep.equal([1, 11]);
  });

  it("should return search engine outcomes", async () => {
    const outcome = await searchEngineOutcomes(
      "https://www.infotrack.com.au",
      "google",
      50
    );

    expect(outcome).to.deep.equal([1, 11]);
  });
});
