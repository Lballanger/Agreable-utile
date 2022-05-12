import "./Header.scss";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Connexion from "../Connexion/Connexion";

import facebook from "../../assets/img/facebook.svg";
import instagram from "../../assets/img/instagram.svg";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <header className="header">
      <div className="header__social-container">
        <div className="header__social-container__facebook">
          <a
            target="_blank"
            href="https://www.facebook.com/lagreablutile/"
            rel="noreferrer"
          >
            <img src={facebook} alt="facebook" />
          </a>
        </div>
        <div className="header__social-container__instagram">
          <a
            target="_blank"
            href="https://www.instagram.com/l_agreable_utile"
            rel="noreferrer"
          >
            <img src={instagram} alt="instagram" />
          </a>
        </div>
      </div>
      <div className="header__navigation">
        <nav className="header__navigation__nav">
          <ul className="header__navigation__nav__menu">
            <li className="header__navigation__nav__menu__item">
              <Link to="/">Accueil</Link>
            </li>
            <li className="header__navigation__nav__menu__item">
              <Link to="/achievements">Mes réalisations</Link>
            </li>
            <li className="header__navigation__nav__menu__item">
              <Link to="/shop">Boutique</Link>
            </li>
          </ul>
        </nav>
        <div className="header__navigation__logo-container">
          <h1 className="header__navigation__logo-container__title">
            <Link to="/">L&apos;agréable Utile</Link>
          </h1>
          <h2 className="header__navigation__logo-container__subtitle">
            <Link to="/">Création de textiles fait main</Link>
          </h2>
        </div>
        <nav className="header__navigation__nav">
          <ul className="header__navigation__nav__menu">
            <li className="header__navigation__nav__menu__item">
              <button type="button" onClick={() => setIsModalOpen(true)}>
                Connexion
              </button>
            </li>
            <li className="header__navigation__nav__menu__item">
              <Link to="/register">Inscription</Link>
            </li>
          </ul>
        </nav>
      </div>
      {isModalOpen && <Connexion handleCloseModal={handleCloseModal} />}
    </header>
  );
}

export default Header;
