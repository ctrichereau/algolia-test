import Resultats from "../components/resultats";
import {
  InstantSearch,
  InstantSearchServerState,
  InstantSearchSSRProvider,
} from "react-instantsearch-hooks-web";
import { renderToString } from "react-dom/server";
import algoliasearch from "algoliasearch";
import { history } from "instantsearch.js/es/lib/routers";
import { getServerState } from "react-instantsearch-hooks-server";

type ResultsProps = {
  serverState?: InstantSearchServerState;
  url?: string;
};

export const Results = (props: ResultsProps) => {
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
          return new URL(props.url!) as unknown as Location;
        }

        return window.location;
      },
    }),
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
    <InstantSearchSSRProvider>
      <InstantSearch
        searchClient={searchClient}
        indexName="movies"
        stalledSearchDelay={500}
        routing={routing}
      >
        <Resultats />
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
};

export async function getServerSideProps({ req }) {
  const protocol = req.headers.referer?.split("://")[0] || "https";
  const serverUrl = `${protocol}://${req.headers.host}${req.url}`;
  const serverState = await getServerState(<Results url={serverUrl} />, {
    renderToString,
  });

  return {
    props: {
      serverState,
      serverUrl,
    },
  };
}

export default Results;
