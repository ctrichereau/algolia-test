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

export default function Results(props: UseSearchBoxProps) {
  const { refine, query: algoliaQuery } = useSearchBox(props);
  /* const { query } = useRouter();

  useEffect(() => {
    console.log("query", query);
    if (query.search) {
      const words = query.search
        .toString()
        .split(" ")
        .filter((word) => word.length > 0);
      console.log("refine", words.join(" "));
      refine(words.join(" "));
    }
  }, []);
  */

  useEffect(() => {
    console.log("algoliaQuery", algoliaQuery);
  }, [algoliaQuery]);

  return (
    <div>
      <Hits hitComponent={Hit} />
    </div>
  );
}
