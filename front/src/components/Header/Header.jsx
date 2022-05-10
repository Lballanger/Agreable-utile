import "./Header.scss";
import logo from "../../assets/img/logo.svg";
import facebook from "../../assets/img/facebook.svg";
import instagram from "../../assets/img/instagram.svg";

function Header() {
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
              <a href="/realisations">Mes réalisations</a>
            </li>
            <li className="header__navigation__nav__menu__item">
              <a href="/shop">Boutique </a>
            </li>
          </ul>
        </nav>
        <div className="header__navigation__logo-container">
          <a className="header__navigation__logo-container__link" href="/">
            <img
              className="header__navigation__logo-container__link__logo"
              src={logo}
              alt="logo"
            />
          </a>
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
              <a href="#">Connexion</a>
            </li>
            <li className="header__navigation__nav__menu__item">
              <a href="#">Inscription</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
