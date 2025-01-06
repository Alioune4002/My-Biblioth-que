import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookForm from "./BookForm";
import BookList from "./BookList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import './index.css';

const App = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/books/");
      setBooks(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des livres", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/books/${id}/`);
      console.log(response.data); 
      setBooks(books.filter((book) => book.id !== id)); 
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  useEffect(() => {
    fetchBooks(); 
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <main>
        <Routes>
          <Route
            path="/"
            element={<BookList books={books} deleteBook={deleteBook} />}
          />
          <Route path="/ajouter" element={<BookForm fetchBooks={fetchBooks} />} />
        </Routes>
        </main>
        <Footer />
        
      </div>
    </Router>
  );
};

export default App;