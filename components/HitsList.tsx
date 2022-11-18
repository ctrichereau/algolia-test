import { Stats, SortBy, Hits, Pagination } from "react-instantsearch-dom";
import { HitCompo } from "../components/HitCompo";

export const HitsList = () => {
  return (
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
      <Hits hitComponent={HitCompo} />
      <div>
        <Pagination />
      </div>
    </main>
  );
};
