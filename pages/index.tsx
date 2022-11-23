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
import { AlgoliaProvider } from "../components/AlgoliaProvider";

type HomeProps = {
  serverState?: InstantSearchServerState;
  url: string;
};

export default function Home(props: HomeProps) {
  return (
    <AlgoliaProvider url={props.url} routing={false}>
      <HeaderCompo />
      <Link href={{ pathname: "/results", query: { q: "france" } }}>
        {/* <Link href="/results?search=france">  > */}
        <button>Valider</button>
      </Link>
      <div className="body-content">
        <HitsList />
      </div>
    </AlgoliaProvider>
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
