import {
  InstantSearch,
  InstantSearchSSRProvider,
} from "react-instantsearch-hooks-web";
import algoliasearch from "algoliasearch";
import { history } from "instantsearch.js/es/lib/routers";

interface AlgoliaProviderProps {
  children: React.ReactNode;
  url: string;
  routing: boolean;
}

export const AlgoliaProvider = (props: AlgoliaProviderProps) => {
  const connectionAlgolia = {
    testSandBox: ["latency", "6be0576ff61c053d5f9a3225e2a90f76"],
    RC: ["testingTQPMT5OMMI", "10436c48afe09ab5081eaa865e13e8d1"],
  };

  const searchClient = algoliasearch(
    connectionAlgolia.testSandBox[0],
    connectionAlgolia.testSandBox[1]
  );

  const routing = {
    router: history({
      getLocation() {
        if (typeof window === "undefined") {
          return new URL(props.url) as unknown as Location;
        }

        return window.location;
      },
    }),
    stateMapping: {
      stateToRoute(uiState) {
        const indexUiState = uiState["movies"];
        return {
          q: indexUiState.query,
        };
      },
      routeToState(routeState) {
        return {
          ["movies"]: {
            query: routeState.q,
          },
        };
      },
    },
  };

  return (
    <InstantSearchSSRProvider>
      <InstantSearch
        searchClient={searchClient}
        indexName="movies"
        stalledSearchDelay={500}
        routing={props.routing ? routing : false}
      >
        {props.children}
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
};
