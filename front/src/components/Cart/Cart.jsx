import "./Cart.scss";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  changeTheCartQuantity,
} from "../../slices/articlesSlice";

function Cart() {
  const dispatch = useDispatch();

  const subtotal = useSelector((state) => state.articlesSlice.subtotal);
  const articlesInCart = useSelector((state) => state.articlesSlice.cart);

  const handleClick = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleChange = (id, e) => {
    dispatch(changeTheCartQuantity({ id, value: e.target.value }));
  };

  return (
    <div className="cart">
      {articlesInCart.length > 0 ? (
        <div className="cart__cart-container">
          <div className="cart__cart-container__articles-container">
            <div className="cart__cart-container__articles-container__title-container">
              <h2 className="cart__cart-container__articles-container__title-container__title">
                Mon panier ( {articlesInCart.length} article
                {articlesInCart.length > 1 ? "s" : ""} )
              </h2>
            </div>

            {articlesInCart.map((article) => (
              <div
                className="cart__cart-container__articles-container__product-container"
                key={article.id}
              >
                <div className="cart__cart-container__articles-container__product-container__img-container">
                  <img
                    className="cart__cart-container__articles-container__product-container__img-container__img"
                    src={`/src/assets/img/shop/articles/${article.image}`}
                    alt={article.name}
                  />
                </div>
                <div className="cart__cart-container__articles-container__product-container__infos">
                  <div className="cart__cart-container__articles-container__product-container__infos__description">
                    <div className="cart__cart-container__articles-container__product-container__infos__description__title-container">
                      <h2 className="cart__cart-container__articles-container__product-container__infos__description__title-container__title">
                        {article.name}
                      </h2>
                    </div>
                    <div className="cart__cart-container__articles-container__product-container__infos__description__color-container">
                      <div className="cart__cart-container__articles-container__product-container__infos__description__color-container__color">
                        Couleur : Bleu
                      </div>
                    </div>
                    <div className="cart__cart-container__articles-container__product-container__infos__description__size-container">
                      <div className="cart__cart-container__articles-container__product-container__infos__description__size-container__size">
                        Taille : S
                      </div>
                    </div>
                  </div>
                  <div className="cart__cart-container__articles-container__product-container__infos__quantity-container">
                    <select
                      className="cart__cart-container__articles-container__product-container__infos__quantity-container__quantity"
                      value={article.quantity}
                      onChange={(e) => handleChange(article.id, e)}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                  <div className="cart__cart-container__articles-container__product-container__infos__content-bottom">
                    <div className="cart__cart-container__articles-container__product-container__infos__content-bottom__delete-container">
                      <div className="cart__cart-container__articles-container__product-container__infos__content-bottom__delete-container__img-container">
                        <img
                          className="cart__cart-container__articles-container__product-container__infos__content-bottom__delete-container__img-container__img"
                          src="https://api.iconify.design/fluent:delete-20-regular.svg"
                          alt=""
                          srcSet=""
                        />
                      </div>
                      <div className="cart__cart-container__articles-container__product-container__infos__content-bottom__delete-container__button-container">
                        <button
                          className="cart__cart-container__articles-container__product-container__infos__content-bottom__delete-container__button-container__button"
                          type="button"
                          onClick={() => handleClick(article.id)}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                    <div className="cart__cart-container__articles-container__product-container__infos__content-bottom__price-container">
                      {(article.price_wt * article.quantity)
                        .toFixed(2)
                        .replace(".", ",")}{" "}
                      €
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart__cart-container__summary">
            <div className="cart__cart-container__summary__title-container">
              <h2 className="cart__cart-container__summary__title-container__title">
                Total
              </h2>
            </div>

            <div className="cart__cart-container__summary__detail-container">
              <div className="cart__cart-container__summary__detail-container__subtotal-container">
                <p className="cart__cart-container__summary__detail-container__subtotal-container__subtotal">
                  Sous-total
                </p>
                <p className="cart__cart-container__summary__detail-container__subtotal-container__price">
                  {subtotal.toFixed(2).toString().replace(".", ",")} €
                </p>
              </div>
              <div className="cart__cart-container__summary__detail-container__delivery-container">
                <p className="cart__cart-container__summary__detail-container__delivery-container__delivery">
                  Livraison
                </p>
                <p className="cart__cart-container__summary__detail-container__delivery-container__price">
                  0,00 €
                </p>
              </div>
              <div className="cart__cart-container__summary__detail-container__total-container">
                <p className="cart__cart-container__summary__detail-container__total-container__total">
                  Total (TVA incluse)
                </p>
                <p className="cart__cart-container__summary__detail-container__total-container__price">
                  {subtotal.toFixed(2).toString().replace(".", ",")} €
                </p>
              </div>
              <div className="cart__cart-container__summary__detail-container__submit-container">
                <Link to="/place-order">
                  <button
                    className="cart__cart-container__summary__detail-container__submit-container__button"
                    type="button"
                  >
                    COMMANDER
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>Votre panier est vide</div>
          <Link to="/shop">Visiter la boutique</Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
