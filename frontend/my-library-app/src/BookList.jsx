import React, { useState, useEffect } from "react"; 
import axios from "axios";

const BookList = ({ books, deleteBook }) => {
  const [message, setMessage] = useState(""); 

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(""); 
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="book-list">
      
      {message && <p style={{ color: "green" }}>{message}</p>}
      
      <h2>Liste des livres</h2>

      <div className="book-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            {book.image && (
              <img
                src={`http://127.0.0.1:8000${book.image}`}
                alt={book.title}
                className="book-image"
              />
            )}
            <h3>{book.title}</h3>
            <h5>{book.author}</h5>
            <p>{book.description}</p>
            <p >{book.published_date}</p>
            <button onClick={() => deleteBook(book.id, book.title)}>
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;