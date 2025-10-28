// import { useState } from "react";
// import "./SearchBar.css";

// function SearchBar({ onSearch }) {
//   const [query, setQuery] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch(query);
//   };

//   return (
//     <form className="search-form" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Search for books..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button type="submit">Search</button>
//     </form>
//   );
// }

// export default SearchBar;
import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a book title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
