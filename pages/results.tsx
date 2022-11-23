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
import { AlgoliaProvider } from "../components/AlgoliaProvider";

type ResultsProps = {
  serverState?: InstantSearchServerState;
  url: string;
};

export const Results = (props: ResultsProps) => {
  return (
    <AlgoliaProvider url={props.url}>
      <Resultats />
    </AlgoliaProvider>
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
