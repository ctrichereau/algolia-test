import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  Hits,
  useSearchBox,
  UseSearchBoxProps,
} from "react-instantsearch-hooks-web";

function Hit({ hit }) {
  return (
    <article>
      <img src={hit.image} />
      <h1>{hit.title}</h1>
      <p>{hit.year}</p>
    </article>
  );
}

export default function Resultats(props: UseSearchBoxProps) {
  const { refine, query: algoliaQuery } = useSearchBox(props);

  useEffect(() => {
    console.log("algoliaQuery", algoliaQuery);
  }, [algoliaQuery]);

  return (
    <div>
      <Hits hitComponent={Hit} />
    </div>
  );
}
