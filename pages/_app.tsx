import "../styles/globals.css";
import type { AppProps } from "next/app";
import algoliasearch from "algoliasearch";
import { InstantSearch } from "react-instantsearch-hooks-web";
import { history } from "instantsearch.js/es/lib/routers";

export default function App({ Component, pageProps }: AppProps) {
  const connectionAlgolia = {
    testSandBox: ["latency", "6be0576ff61c053d5f9a3225e2a90f76"],
    RC: ["testingTQPMT5OMMI", "10436c48afe09ab5081eaa865e13e8d1"],
  };

  const searchClient = algoliasearch(
    connectionAlgolia.testSandBox[0],
    connectionAlgolia.testSandBox[1]
  );

  const routing = {
    router: history(),
    stateMapping: {
      stateToRoute(uiState) {
        const indexUiState = uiState["movies"];
        console.log("indexUiState", indexUiState);

        return {
          q: indexUiState.query,
        };
      },
      routeToState(routeState) {
        console.log("routeState", routeState);
        return {
          ["movies"]: {
            query: routeState.q,
          },
        };
      },
    },
  };

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="movies"
      stalledSearchDelay={500}
      routing={routing}
    >
      <Component {...pageProps} />
    </InstantSearch>
  );
}
