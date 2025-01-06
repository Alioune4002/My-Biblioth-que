import { useState } from "react";
import axios from "axios";

const BookForm = ({ fetchBooks }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [published_date, setPublishedDate] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("published_date", published_date);
    formData.append("image", image);

    try {
      await axios.post("http://127.0.0.1:8000/api/books/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchBooks(); // Rafraîchit la liste des livres
      setMessage(`Le livre "${title}" a bien été ajouté.`);
      setTitle("");
      setAuthor("");
      setDescription("");
      setPublishedDate("");
      setImage(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="book-form">
        <div>
          <label>Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Auteur</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Date de publication</label>
          <input
            type="date"
            value={published_date}
            onChange={(e) => setPublishedDate(e.target.value)}
          />
        </div>
        <div>
          <label>Ajouter une image de couverture ici</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit">Ajouter un livre</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default BookForm;