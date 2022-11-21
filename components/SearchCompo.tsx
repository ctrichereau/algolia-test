import { SearchBox } from "react-instantsearch-hooks-web";

export const HeaderCompo = () => {
  return (
    <header className="header">
      <SearchBox className="search-bar" />
    </header>
  );
};
