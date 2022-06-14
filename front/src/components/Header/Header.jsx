import "./Header.scss";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Connexion from "../Connexion/Connexion";

import facebook from "../../assets/img/facebook.svg";
import instagram from "../../assets/img/instagram.svg";
import arrow from "../../assets/img/arrow.png";
import { setUserData } from "../../slices/userSlice";

function Header() {
  const { user } = useSelector((state) => state.userSlice);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handleCloseModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(setUserData(""));
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
            <Link to="/">
              <strong>L&apos;agréable Utile</strong>
            </Link>
          </h1>
          <h2 className="header__navigation__logo-container__subtitle">
            <Link to="/">Création de textiles fait main</Link>
          </h2>
        </div>
        <nav className="header__navigation__nav">
          {user ? (
            <>
              <ul className="header__navigation__nav__connected-menu">
                <li className="header__navigation__nav__connected-menu__item">
                  <Link
                    className="header__navigation__nav__connected-menu__item__profil-link"
                    to={`/account/${user.id}/profil`}
                  >
                    Mon compte
                    <div className="header__navigation__nav__connected-menu__item__profil-link__img-container">
                      <img
                        className="header__navigation__nav__connected-menu__item__profil-link__img-container__img"
                        src={arrow}
                        alt=""
                      />
                    </div>
                  </Link>
                </li>
              </ul>
              <ul className="header__navigation__nav__drop-menu">
                <li className="header__navigation__nav__drop-menu__item">
                  <Link
                    className="header__navigation__nav__drop-menu__item__link"
                    to={`/account/${user.id}/profil`}
                  >
                    Mes informations
                  </Link>
                </li>
                <li className="header__navigation__nav__drop-menu__item">
                  <Link
                    className="header__navigation__nav__drop-menu__item__link"
                    to={`/account/${user.id}/orders`}
                  >
                    Mes commandes
                  </Link>
                </li>
                <li className="header__navigation__nav__drop-menu__item">
                  <button
                    className="header__navigation__nav__drop-menu__item__link"
                    type="button"
                    onClick={handleLogout}
                  >
                    Déconnexion
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <ul className="header__navigation__nav__menu">
              <li className="header__navigation__nav__menu__item">
                <button
                  className="header__navigation__nav__menu__item__connection"
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                >
                  Connexion
                </button>
              </li>
              <li className="header__navigation__nav__menu__item">
                <Link
                  className="header__navigation__nav__menu__item__register"
                  to="/register"
                >
                  Inscription
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
      {isModalOpen && <Connexion handleCloseModal={handleCloseModal} />}
    </header>
  );
}

export default Header;