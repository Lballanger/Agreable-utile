import propTypes from "prop-types";

import {
  AdvancedImage,
  lazyload,
  placeholder,
  responsive,
} from "@cloudinary/react";
import { Link } from "react-router-dom";
import { fill } from "@cloudinary/url-gen/actions/resize";

import cloudinary from "../lib/cloudinary";

import ShoppingCart from "../assets/icons/ShoppingCart";

function CartDropDown({ cart, subtotal }) {
  return (
    <div className="cart-dropdown">
      <div className="cart-dropdown__item">
        <Link to="/cart">
          <div className="cart-dropdown__item__img-container">
            <ShoppingCart width="1.5rem" height="1.5rem" />
            <span className="cart-dropdown__item__img-container__cart-counter">
              {cart.length === 0 ? "" : `${cart.length}`}
            </span>
          </div>
        </Link>
        <div className="cart-dropdown__item__cart-container">
          <div className="cart-dropdown__item__cart-container__title">
            <Link
              className="cart-dropdown__item__cart-container__title__link"
              to="/cart"
            >
              MON PANIER
            </Link>
          </div>
          <div className="cart-dropdown__item__cart-container__articles-container">
            <div className="cart-dropdown-container__articles-container__articles">
              {cart.length > 0 ? (
                cart.map((article) => (
                  <Link to={`/shop/${article.id}`} key={article.id}>
                    <div className="cart-dropdown__item__cart-container__articles-container__articles__product">
                      <div className="cart-dropdown__item__cart-container__articles-container__articles__product__img-container">
                        <AdvancedImage
                          style={{
                            width: "100%",
                            height: "120px",
                            objectFit: "cover",
                          }}
                          cldImg={cloudinary
                            .image(article.image[0])
                            .resize(fill())}
                          plugins={[
                            responsive({ steps: 700 }),
                            lazyload(),
                            placeholder("blur"),
                          ]}
                        />
                      </div>
                      <div className="cart-dropdown__item__cart-container__articles-container__articles__product__info-container">
                        <div className="cart-dropdown__item__cart-container__articles-container__articles__product__info-container__infos">
                          <p className="cart-dropdown__item__cart-container__articles-container__articles__product__info-container__infos__title">
                            {article.name}
                          </p>
                        </div>
                        <div className="cart-dropdown__item__cart-container__articles-container__articles__product__info-container__quantity-container">
                          <span className="cart-dropdown__item__cart-container__articles-container__articles__product__info-container__quantity-container__quantity">
                            Quantité : {article.quantity}
                          </span>
                          <p className="cart-dropdown__item__cart-container__articles-container__articles__product__info-container__quantity-container__price">
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
              ) : (
                <div className="cart-dropdown__item__cart-container__articles-container__articles__product">
                  <p>Votre panier est vide</p>
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="cart-dropdown__item__cart-container__subtotal-container">
                <p className="cart-dropdown__item__cart-container__subtotal-container__subtotal">
                  Total (TVA incluse)
                </p>
                <p className="cart-dropdown__item__cart-container__subtotal-container__price">
                  {subtotal.toFixed(2).toString().replace(".", ",")} €
                </p>
              </div>
            )}
            <div className="cart-dropdown__item__cart-container__footer">
              <div className="cart-dropdown__item__cart-container__footer__button-container">
                <Link
                  className="cart-dropdown__item__cart-container__footer__button-container__button"
                  to="/cart"
                >
                  MON PANIER {`(${cart.length})`}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDropDown;

CartDropDown.propTypes = {
  cart: propTypes.arrayOf(propTypes.object.isRequired),
  subtotal: propTypes.number.isRequired,
};

CartDropDown.defaultProps = {
  cart: [],
};
