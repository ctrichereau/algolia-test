import { SearchBox } from "react-instantsearch-dom";

export const HeaderCompo = () => {
  return (
    <header className="header">
      <SearchBox
        className="search-bar"
        translations={{ placeholder: "Search for Movies" }}
      />
    </header>
  );
};
