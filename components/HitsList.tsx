import { Hits, Pagination } from "react-instantsearch-hooks-web";
import { HitCompo } from "../components/HitCompo";

export const HitsList = () => {
  return (
    <main>
      <Hits hitComponent={HitCompo} />
      <div>
        <Pagination />
      </div>
    </main>
  );
};
