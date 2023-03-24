import React from "react";

const Search = ({ search, searchInpunt, handleSearch }) => {
  return (
    <div className="Search">
      <input
        type="text"
        value={search}
        ref={searchInpunt}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
