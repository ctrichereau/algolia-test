import { HeaderCompo } from "../components/SearchCompo";
import { HitsList } from "../components/HitsList";
import { renderToString } from "react-dom/server";
import Link from "next/link";
import {
  InstantSearch,
  InstantSearchServerState,
  InstantSearchSSRProvider,
} from "react-instantsearch-hooks-web";
import algoliasearch from "algoliasearch";
import { history } from "instantsearch.js/es/lib/routers";
import { getServerState } from "react-instantsearch-hooks-server";

type HomeProps = {
  serverState?: InstantSearchServerState;
  url?: string;
};

export default function Home(props: HomeProps) {
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
        <HeaderCompo />
        <Link href={{ pathname: "/results", query: { q: "france" } }}>
          {/* <Link href="/results?search=france">  > */}
          <button>Valider</button>
        </Link>
        <div className="body-content">
          <HitsList />
        </div>
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
}

export async function getServerSideProps({ req }) {
  const protocol = req.headers.referer?.split("://")[0] || "https";
  const serverUrl = `${protocol}://${req.headers.host}${req.url}`;
  const serverState = await getServerState(<Home url={serverUrl} />, {
    renderToString,
  });

  return {
    props: {
      serverState,
      serverUrl,
    },
  };
}
