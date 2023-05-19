import React, { useState } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

import { useSelector } from "react-redux";
import { IconBurger, IconTimes } from "../assets/icons";
import Logo from "../assets/img/Logo";
import Button from "./Button";
import ShoppingCart from "../assets/icons/ShoppingCart";
import Account from "../assets/icons/Account";

function MobileNavbar({ menuItems = [], setIsModalOpen }) {
  const cart = useSelector((state) => state.articlesSlice.cart);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="mobile-nav__burger">
        <Button buttonType="text" onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? (
            <IconTimes width="54" height="54" color="rgb(247, 114, 136)" />
          ) : (
            <IconBurger width="40" height="40" color="rgb(247, 114, 136)" />
          )}
        </Button>
      </div>
      <div
        className="navigation__logo-container"
        style={{
          position: "absolute",
          top: "-30%",
          left: "50%",
          transform: "translate(-50%, 0)",
        }}
      >
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="cart__item">
        <div className="cart__item__img-container">
          <Button buttonType="text" onClick={() => setIsModalOpen(true)}>
            <Account width="23" height="23" color="black" />
          </Button>
        </div>
        <div className="cart__item__img-container">
          <Link to="/cart">
            <ShoppingCart width="23" height="23" />
            <span className="cart__item__img-container__cart-counter">
              {cart.length === 0 ? "" : `${cart.length}`}
            </span>
          </Link>
        </div>
      </div>
      {isOpen && (
        <nav className="mobile-nav__nav">
          <ul className="mobile-nav__nav__menu">
            {menuItems.map((item) => (
              <li key={item.id} className="navigation__list__item">
                <Link to={item.path} onClick={() => setIsOpen((prev) => !prev)}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}

export default MobileNavbar;

MobileNavbar.propTypes = {
  menuItems: propTypes.arrayOf(propTypes.object.isRequired),
  setIsModalOpen: propTypes.func.isRequired,
};

MobileNavbar.defaultProps = {
  menuItems: [],
};
