import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1>Ma Bibliothèque</h1>
        <nav className="nav-links">
          <Link to="/">Accueil</Link>
          <Link to="/ajouter">Ajouter Livre</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;