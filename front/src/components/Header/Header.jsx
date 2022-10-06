import "./Header.scss";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Connexion from "../Connexion/Connexion";

import facebook from "../../assets/img/facebook.svg";
import instagram from "../../assets/img/instagram.svg";
import arrow from "../../assets/img/arrow.png";
import { signOut } from "../../slices/userSlice";

function Header() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userSlice.token);
  const userData = useSelector((state) => state.userSlice.userData);
  const cart = useSelector((state) => state.articlesSlice.cart);
  const subtotal = useSelector((state) => state.articlesSlice.subtotal);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [small, setSmall] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => setSmall(window.scrollY >= 120));
    }
  }, []);

  const handleCloseModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <header className={`header ${small ? "small" : ""}`}>
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
              <Link
                className="header__navigation__nav__menu__item__link"
                to="/"
              >
                Accueil
              </Link>
            </li>
            <li className="header__navigation__nav__menu__item">
              <Link
                className="header__navigation__nav__menu__item__link"
                to="/shop"
              >
                Boutique
              </Link>
            </li>
            <li className="header__navigation__nav__menu__item">
              <Link
                className="header__navigation__nav__menu__item__link"
                to="/sewing"
              >
                Couture
              </Link>
            </li>
            <li className="header__navigation__nav__menu__item">
              <Link
                className="header__navigation__nav__menu__item__link"
                to="/sewing"
              >
                Tissues
              </Link>
            </li>
          </ul>
        </nav>
        <div className="header__navigation__logo-container">
          <h1 className="header__navigation__logo-container__title">
            <Link className="header__navigation__logo-container__title" to="/">
              <strong>L&apos;agréable Utile</strong>
            </Link>
          </h1>
        </div>
        <nav className="header__navigation__nav">
          {token && userData ? (
            <ul className="header__navigation__nav__connected-menu">
              <li className="header__navigation__nav__connected-menu__item">
                <Link
                  className="header__navigation__nav__connected-menu__item__profil-link"
                  to={`/account/${userData.id}/profil`}
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

              <li className="header__navigation__nav__connected-menu__list">
                <div className="header__navigation__nav__connected-menu__list__link-container">
                  <Link
                    className="header__navigation__nav__connected-menu__list__link-container__link"
                    to={`/account/${userData.id}/profil`}
                  >
                    Mes informations
                  </Link>
                </div>

                <div className="header__navigation__nav__connected-menu__list__link-container">
                  <Link
                    className="header__navigation__nav__connected-menu__list__link-container__link"
                    to={`/account/${userData.id}/orders`}
                  >
                    Mes commandes
                  </Link>
                </div>
                <div className="header__navigation__nav__connected-menu__list__link-container">
                  <button
                    className="header__navigation__nav__connected-menu__list__link-container__link"
                    type="button"
                    onClick={handleLogout}
                  >
                    Déconnexion
                  </button>
                </div>
              </li>
            </ul>
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
          <ul className="header__navigation__nav__cart">
            <li className="header__navigation__nav__cart__item">
              <Link to="/cart">
                <div className="header__navigation__nav__cart__item__img-container">
                  <img
                    className="header__navigation__nav__cart__item__img-container__img"
                    src="https://api.iconify.design/ri:shopping-cart-2-fill.svg"
                    alt=""
                    srcSet=""
                  />
                  <p className="header__navigation__nav__cart__item__img-container__cart-counter">
                    {cart.length === 0 ? "" : `${cart.length}`}
                  </p>
                </div>
              </Link>
              <div className="header__navigation__nav__cart__item__cart-container">
                <div className="header__navigation__nav__cart__item__cart-container__title">
                  <Link
                    className="header__navigation__nav__cart__item__cart-container__title__link"
                    to="/cart"
                  >
                    MON PANIER
                  </Link>
                </div>
                <div className="header__navigation__nav__cart__item__cart-container__articles-container">
                  <div className="header__navigation__nav__cart__item__cart-container__articles-container__articles">
                    {cart.length > 0
                      ? cart.map((article) => (
                          <Link to={`/shop/${article.id}`} key={article.id}>
                            <div className="header__navigation__nav__cart__item__cart-container__articles-container__articles__product">
                              <div className="header__navigation__nav__cart__item__cart-container__articles-container__articles__product__img-container">
                                <img
                                  className="header__navigation__nav__cart__item__cart-container__articles-container__articles__product__img-container__img"
                                  src={`/src/assets/img/shop/articles/${article.image[0]}`}
                                  alt={article.name}
                                  srcSet=""
                                />
                              </div>
                              <div className="header__navigation__nav__cart__item__cart-container__articles-container__articles__product__info-container">
                                <div className="header__navigation__nav__cart__item__cart-container__articles-container__articles__product__info-container__infos">
                                  <p className="header__navigation__nav__cart__item__cart-container__articles-container__articles__product__info-container__infos__title">
                                    {article.name}
                                  </p>
                                </div>
                                <div className="header__navigation__nav__cart__item__cart-container__articles-container__articles__product__info-container__quantity-container">
                                  <span className="header__navigation__nav__cart__item__cart-container__articles-container__articles__product__info-container__quantity-container__quantity">
                                    Quantité : {article.quantity}
                                  </span>
                                  <p className="header__navigation__nav__cart__item__cart-container__articles-container__articles__product__info-container__quantity-container__price">
                                    {(article.price_wt * article.quantity)
                                      .toFixed(2)
                                      .replace(".", ",")}{" "}
                                    €
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))
                      : ""}
                  </div>
                  <div className="header__navigation__nav__cart__item__cart-container__subtotal-container">
                    <p className="header__navigation__nav__cart__item__cart-container__subtotal-container__subtotal">
                      Total (TVA incluse)
                    </p>
                    <p className="header__navigation__nav__cart__item__cart-container__subtotal-container__price">
                      {subtotal.toFixed(2).toString().replace(".", ",")} €
                    </p>
                  </div>
                  <div className="header__navigation__nav__cart__item__cart-container__footer">
                    <div className="header__navigation__nav__cart__item__cart-container__footer__button-container">
                      <Link
                        className="header__navigation__nav__cart__item__cart-container__footer__button-container__button"
                        to="/cart"
                      >
                        MON PANIER {`(${cart.length})`}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      {isModalOpen && <Connexion handleCloseModal={handleCloseModal} />}
    </header>
  );
}

export default Header;
