import algoliasearch from "algoliasearch";
import { InstantSearch } from "react-instantsearch-dom";
import { HeaderCompo } from "../components/SearchCompo";
import { HitsList } from "../components/HitsList";

const connectionAlgolia = {
  testSandBox: ["latency", "6be0576ff61c053d5f9a3225e2a90f76"],
  RC: ["testingTQPMT5OMMI", "10436c48afe09ab5081eaa865e13e8d1"],
};

const searchClient = algoliasearch(
  connectionAlgolia.testSandBox[0],
  connectionAlgolia.testSandBox[1]
);

export default function Home() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="movies"
      stalledSearchDelay={500}
    >
      <HeaderCompo />
      <div className="body-content">
        <HitsList />
      </div>
    </InstantSearch>
  );
}
