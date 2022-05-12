import "./Header.scss";

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
          <a href="https://www.facebook.com/lagreablutile/">
            <img src={facebook} alt="facebook" />
          </a>
        </div>
        <div className="header__social-container__instagram">
          <a href="https://www.instagram.com/l_agreable_utile">
            <img src={instagram} alt="instagram" />
          </a>
        </div>
      </div>
      <div className="header__navigation">
        <nav className="header__navigation__nav">
          <ul className="header__navigation__nav__menu">
            <li className="header__navigation__nav__menu__item">
              <a href="/">Accueil</a>
            </li>
            <li className="header__navigation__nav__menu__item">
              <a href="/achievements">Mes réalisations</a>
            </li>
            <li className="header__navigation__nav__menu__item">
              <a href="/shop">Boutique </a>
            </li>
          </ul>
        </nav>
        <div className="header__navigation__logo-container">
          <h1 className="header__navigation__logo-container__title">
            <a href="/">L&apos;agréable Utile</a>
          </h1>
          <h2 className="header__navigation__logo-container__subtitle">
            <a href="/">Création de textiles fait main</a>
          </h2>
        </div>
        <nav className="header__navigation__nav">
          <ul className="header__navigation__nav__menu">
            <li className="header__navigation__nav__menu__item">
              <a onClick={() => setIsModalOpen(true)} href="#">
                Connexion
              </a>
            </li>
            <li className="header__navigation__nav__menu__item">
              <a href="/register">Inscription</a>
            </li>
          </ul>
        </nav>
      </div>
      {isModalOpen && <Connexion handleCloseModal={handleCloseModal} />}
    </header>
  );
}

export default Header;
