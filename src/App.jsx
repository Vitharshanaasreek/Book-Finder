import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Function to fetch books (used for both initial load & search)
  const fetchBooks = async (query = "bestsellers") => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      if (!response.ok) throw new Error("Network error");

      const data = await response.json();
      if (data.docs.length === 0) {
        setError("No results found.");
        setBooks([]);
      } else {
        setBooks(data.docs.slice(0, 20)); // limit to 20
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Load default books when page opens
  useEffect(() => {
    fetchBooks(); // fetch "bestsellers" by default
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">📚 Book Finder</h1>
      <SearchBar onSearch={fetchBooks} />

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="books-container">
        {books.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </div>
  );
};

export default App;



// import { useState } from "react";
// import "./App.css";
// import SearchBar from "./components/SearchBar";
// import BookCard from "./components/BookCard";

// function App() {
//   const [books, setBooks] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async (query) => {
//     if (!query.trim()) return;

//     setLoading(true);
//     setError("");
//     setBooks([]);

//     try {
//       const response = await fetch(
//         `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`
//       );
//       const data = await response.json();

//       if (data.docs.length === 0) {
//         setError("No books found for your search.");
//         return;
//       }

//       const formattedBooks = data.docs.slice(0, 12).map((book) => ({
//         title: book.title,
//         author: book.author_name ? book.author_name[0] : "Unknown Author",
//         cover: book.cover_i
//           ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
//           : null,
//       }));

//       setBooks(formattedBooks);
//     } catch (err) {
//       setError("Failed to fetch books. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h1 className="title">📚 Book Finder</h1>
//       <SearchBar onSearch={handleSearch} />

//       {loading && <p>Loading books...</p>}
//       {error && <p className="error">{error}</p>}

//       <div className="book-list">
//         {books.map((book, i) => (
//           <BookCard key={i} book={book} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
