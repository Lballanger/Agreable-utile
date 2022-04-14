import "./Header.scss";
import logo from "../../assets/img/logo.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <h1 className="header__title">L&apos;agréable Utile</h1>
      <ul className="header__login">
        <li className="header__login__item">
          <a href="#">Connexion</a>
        </li>
        <li className="header__login__item">
          <a href="#">Inscription</a>
        </li>
      </ul>
      <nav className="header__nav">
        <ul className="header__nav__menu">
          <li className="header__nav__menu__item">
            <a href="#">Accueil</a>
          </li>
          <li className="header__nav__menu__item">
            <a href="#">Mes réalisations</a>
          </li>
          <li className="header__nav__menu__item">
            <a href="#">Boutique</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
