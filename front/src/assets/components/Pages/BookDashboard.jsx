import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiMenuFold2Line } from "react-icons/ri";
import TableWrapper from "./TableWrapper";

const BookDashboard = () => {
  const [books, setBooks] = useState([]); // Original data
  const [filteredBooks, setFilteredBooks] = useState([]); // Data displayed in the table
  const [searchText, setSearchText] = useState(""); // Search input value
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/book-store/books"
      );
      setBooks(response.data.books);
      setFilteredBooks(response.data.books); // Initialize filteredBooks with fetched data
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch books.");
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchText(query); // Update search input value
    if (query.trim() === "") {
      setFilteredBooks(books); // Restore original data if search is cleared
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8000/api/book-store/books/search`,
        {
          params: { q: query },
        }
      );
      setFilteredBooks(response.data.books); // Update filteredBooks with search results
    } catch (err) {
      setError("Failed to search books.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col gap-10 p-5 w-full">
      <h1 className="text-3xl text-gray-500 font-light text-center">
        Books Dashboard
      </h1>
      <div className="border border-gray-400 px-10 py-8 mx-4 my-4 h-[calc(100vh-160px)]">
        <TableWrapper
          data={filteredBooks} // Pass filteredBooks to TableWrapper
          searchText={searchText} // Pass search text to TableWrapper
          onSearch={handleSearch} // Handle search
          action={[
            {
              icon: <RiMenuFold2Line className="4xl text-primary" />,
              navigate: {
                link: `manageBooks`,
                variable: ["_id"],
              },
              dataTip: "Manage Books",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default BookDashboard;
