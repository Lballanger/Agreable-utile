import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

import BottomArrow from "../assets/icons/BottomArrow";
import Button from "./Button";
import CartDropDown from "./CartDropDown";
import Logo from "../assets/img/Logo";

function Navbar({
  menuItems,
  connectedMenuItems,
  setIsModalOpen,
  handleLogout,
}) {
  const token = useSelector((state) => state.userSlice.token);
  const userData = useSelector((state) => state.userSlice.userData);
  const cart = useSelector((state) => state.articlesSlice.cart);
  const subtotal = useSelector((state) => state.articlesSlice.subtotal);

  return (
    <>
      <nav className="navigation">
        <div className="navigation__logo-container">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <ul className="navigation__list">
          {menuItems.map((item) => (
            <li key={item.id} className="navigation__list__item">
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {/** ********************** CONNECTED ******************* */}

      <nav className="navigation  right-container">
        {token && userData ? (
          <div>
            <nav className="navigation">
              <ul className="navigation__list">
                <li className="dropdown">
                  <Link to={`/account/${userData.id}/profil`}>
                    Mon compte
                    <BottomArrow width="2rem" height="2rem" />
                  </Link>
                  <div className="dropdown__item">
                    <ul className="navigation__list">
                      {connectedMenuItems.map((item) => (
                        <li key={item.id} className="navigation__list__item">
                          <Link to={item.path}>{item.name}</Link>
                        </li>
                      ))}
                      <li className="navigation__list__item">
                        <Button onClick={handleLogout} buttonType="text">
                          Déconnexion
                        </Button>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          /** ********************** NOT CONNECTED ******************* */
          <nav className="navigation">
            <ul className="navigation__list">
              <li className="navigation__list__item">
                <Button onClick={() => setIsModalOpen(true)} buttonType="text">
                  Connexion
                </Button>
              </li>
              <li className="navigation__list__item">
                <Link to="/register">Inscription</Link>
              </li>
            </ul>
          </nav>
        )}
        {/** ********************** DROPDOWN CART ******************* */}
        <CartDropDown cart={cart} subtotal={subtotal} />
      </nav>
    </>
  );
}

export default Navbar;

Navbar.propTypes = {
  menuItems: propTypes.arrayOf(propTypes.object.isRequired),
  connectedMenuItems: propTypes.arrayOf(propTypes.object.isRequired),
  setIsModalOpen: propTypes.func.isRequired,
  handleLogout: propTypes.func.isRequired,
};

Navbar.defaultProps = {
  menuItems: [],
  connectedMenuItems: [],
};
