import Head from "next/head";
import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Stats,
  SortBy,
  Pagination,
} from "react-instantsearch-dom";
import Image from "next/image";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

export default function Home() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="movies"
      stalledSearchDelay={500}
    >
      <Header />
      <div className="body-content">
        <Content />
      </div>
    </InstantSearch>
  );
}
const Header = () => (
  <header className="header">
    <SearchBox
      className="search-bar"
      translations={{ placeholder: "Search for Movies" }}
    />
  </header>
);
const Hit = ({ hit }: { hit: any }) => (
  <a href={"/"}>
    <div className="card">
      <div className="card-image">
        <Image
          src={hit.image}
          width="80"
          height="100"
          alt={hit.name}
          className="image"
        />
      </div>
      <div className="card-contents">
        <Highlight attribute="title" hit={hit} className="card-title" />
        <Highlight attribute="year" hit={hit} className="card-year" />
        <div className="card-rating">Rating: {hit.rating}</div>
        <div className="card-genre">
          <span>{hit.genre[0]}</span> <span>{hit.genre[1]}</span>
        </div>
      </div>
    </div>
  </a>
);

const Content = () => (
  <main>
    <div className="information">
      <div className="stats">
        <Stats />
      </div>
      <div className="">
        <SortBy
          defaultRefinement="movies"
          items={[{ value: "movies", label: "Most Relevant" }]}
        />
      </div>
    </div>
    <Hits hitComponent={Hit} />
    <div>
      <Pagination />
    </div>
  </main>
);
