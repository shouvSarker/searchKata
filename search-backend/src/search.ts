import serverless from "serverless-http";
import express, { Request, Response } from "express";
import got from "got";
import { JSDOM } from "jsdom";

const app = express();
app.use(express.json());

/**
 *
 * @param engineUrl The url of the search engine.
 * @param pageNumber The page number of the search results to scan.
 * @param lookupStringRegex The regex for the string to scan for.
 * @param totalSoFar Total results scanned so far.
 * @param maxResults Maximum number of search results to scan.
 * @param matchedResults List of matched instances.
 *
 * @returns Matches of query string.
 */
export const getMatches = async (
  engineUrl: string,
  relevantClasses: string[],
  pageNumber: number,
  lookupStringRegex: RegExp,
  totalSoFar: number,
  maxResults: number,
  matchedResults: number[]
) => {
  console.log(engineUrl);
  console.log(totalSoFar);
  const getOutcome: { total: number; matched: number[] } = await got(
    `${engineUrl}/Page${pageNumber.toLocaleString("en-US", {
      // Make 1 as 01 ... 9 as 09 as per provided url.
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}.html`
  ).then((response) => {
    const dom = new JSDOM(response.body);
    const allNodes = dom.window.document.querySelectorAll(
      relevantClasses[0],
      relevantClasses[1]
    );

    const matches = [...allNodes].map((element: { innerHTML: any }) => {
      return element.innerHTML.match(lookupStringRegex)
        ? // Increment index to get actual serial.
          Array.prototype.indexOf.call(allNodes, element) + 1
        : 0;
    });

    return {
      total: matches.length + totalSoFar,
      matched: matches
        // Filter out no matches.
        .filter((element) => element !== 0)
        // Get actual serial of the element.
        .map((element) => element + totalSoFar)
        .concat(matchedResults),
    };
  });

  // If we have not reached maximum number of search results to scan yet,
  // We will call this function recursively with incremented values.
  if (getOutcome.total < maxResults) {
    const updatedOutcome: any = await getMatches(
      engineUrl,
      relevantClasses,
      pageNumber + 1,
      lookupStringRegex,
      getOutcome.total,
      maxResults,
      getOutcome.matched
    );

    return updatedOutcome;
  }

  // Remove if there is a match beyond 50
  return getOutcome.matched.filter((element) => element <= maxResults).sort();
};

export const searchEngineOutcomes = async (
  lookupString: string,
  searchEngine: string,
  maxResults: number
) => {
  const isGoogle = searchEngine === "google";
  // Sets the url according to search engine name.
  // More engines can be added by transforming this to a switch statement.
  const engineUrl = isGoogle
    ? "https://infotrack-tests.infotrack.com.au/Google"
    : "https://infotrack-tests.infotrack.com.au/Bing";

  // Class of each search result element.
  // Includes advertisements.
  const relevantClasses = isGoogle
    ? ["div.rc, li.ads-fr"]
    : ["li.b_algo", "b_adLastChild"];

  // prepares a regex to find supplied string
  const lookupStringRegex = new RegExp(lookupString, "g");

  const matches = await getMatches(
    engineUrl,
    relevantClasses,
    // Starts looking for matches from page 1.
    1,
    lookupStringRegex,
    // Initially, starting with 0 encountered results.
    0,
    maxResults,
    // We start with zero matches.
    []
  );

  return matches;
};

app.post("/search", async (req: Request, res: Response) => {
  const searchKeyword = req.body.searchKeyword;
  const lookupString = req.body.lookupString;
  const searchEngine = req.body.searchEngine;
  const maxResults = parseInt(req.body.maxResults);

  console.log(
    `${searchKeyword} has been passed but using default pages instead.`
  );

  const outcome = await searchEngineOutcomes(
    lookupString,
    searchEngine,
    maxResults
  );

  res.send({
    outcome, //`This is message post route ${searchKeyword} ${lookupString} ${searchEngine} ${JSON.stringify(outcome)}`,
  });
});

app.use((req: Request, res: Response) => {
  res.send({ message: "Server is running" });
});

export const hello: serverless.Handler = serverless(app);
