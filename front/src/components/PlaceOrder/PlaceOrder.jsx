import "./PlaceOrder.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Field from "../Shared/Field/Field";
import AddressControl from "../Shared/AddressControl/AddressControl";

function PlaceOrder() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.userSlice.user);
  const cart = useSelector((state) => state.articlesSlice.cart);

  if (!cart.length) navigate("/cart", { replace: true });

  const initialErrors = {
    email: null,
    firstname: null,
    lastname: null,
    phone: null,
    postalCode: null,
  };

  const [errors, setErrors] = useState(initialErrors);

  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [suggestion, setSuggestion] = useState(false);
  const [addressInformation, setAddressInformation] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [createAccount, setCreateAccount] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [disabled, setDisabled] = useState(true);

  const emailRule =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const phoneRule = /^([+]\d{2})?\d{10}$/;

  const postalCodeRule =
    /(?:0[1-9]|[13-8][0-9]|2[ab1-9]|9[0-5])(?:[0-9]{3})?|9[78][1-9](?:[0-9]{2})?/;

  const passwordRule =
    /^.*(?=.{6,120})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,\<\>\/\?\;\:\'\"\\\|\[\]\{\}]).*$/;

  useEffect(() => {
    if (createAccount) {
      setErrors((state) => {
        return {
          ...state,
          password: false,
          passwordConfirm: false,
        };
      });
      setDisabled(true);
    }
  }, [createAccount]);

  useEffect(() => {
    if (Object.keys(errors).length && !disabled) setDisabled(true);
  }, [errors]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "email-order":
        setEmail(event.target.value);
        if (
          !emailRule.test(event.target.value) &&
          event.target.value.length > 0
        ) {
          setErrors((state) => {
            return {
              ...state,
              email: true,
            };
          });
        } else {
          delete errors.email;
        }
        break;
      case "firstname":
        setFirstname(event.target.value);
        if (
          event.target.value.trim().length < 2 &&
          event.target.value.length > 0
        ) {
          setErrors((state) => {
            return {
              ...state,
              firstname: true,
            };
          });
        } else delete errors.firstname;
        break;
      case "lastname":
        setLastName(event.target.value);
        if (
          event.target.value.trim().length < 2 &&
          event.target.value.length > 0
        ) {
          setErrors((state) => {
            return {
              ...state,
              lastname: true,
            };
          });
        } else delete errors.lastname;
        break;
      case "country":
        setCountry(event.target.value);
        break;
      case "delivery-address":
        setAddress(event.target.value);
        break;
      case "address-information":
        setAddressInformation(event.target.value);
        break;
      case "city":
        setCity(event.target.value);
        break;
      case "postal-code":
        setPostalCode(event.target.value);
        if (
          !postalCodeRule.test(event.target.value) &&
          event.target.value.length > 0
        ) {
          setErrors((state) => {
            return {
              ...state,
              postalCode: true,
            };
          });
        } else {
          delete errors.postalCode;
        }
        break;
      case "phone":
        setPhone(event.target.value);
        if (
          !phoneRule.test(event.target.value) &&
          event.target.value.length > 0
        ) {
          setErrors((state) => {
            return {
              ...state,
              phone: true,
            };
          });
        } else {
          delete errors.phone;
        }
        break;
      case "password":
        setPassword(event.target.value);
        if (!passwordRule.test(event.target.value)) {
          setErrors((state) => {
            return {
              ...state,
              password: true,
            };
          });
        } else delete errors.password;
        break;

      case "password-confirm":
        setPasswordConfirm(event.target.value);
        if (event.target.value !== password) {
          setErrors((state) => {
            return {
              ...state,
              passwordConfirm: true,
            };
          });
        } else delete errors.passwordConfirm;
        break;
      default:
        break;
    }
    if (!Object.keys(errors).length) setDisabled(false);
  };

  const setCitySuggest = (data) => {
    setAddress(`${data.housenumber} ${data.street}`);
    setCity(data.city);
    setPostalCode(data.postcode);
  };

  return (
    <div className="place-order">
      <div className="place-order__info-container">
        <div className="place-order__info-container__form-container">
          <form
            className="place-order__info-container__form-container__form"
            onSubmit={handleSubmit}
          >
            {!user ? (
              <>
                <legend className="place-order__info-container__form-container__form__legend">
                  Coordonnées
                </legend>
                <Field
                  id="email-order"
                  label="Adresse e-mail"
                  type="email"
                  onChange={handleChange}
                  value={email}
                  error={errors.email}
                />

                <div className="place-order__info-container__form-container__form__half">
                  <div className="place-order__info-container__form-container__form__half__wrapper">
                    <Field
                      id="firstname"
                      label="Prénom"
                      type="text"
                      onChange={handleChange}
                      value={firstname}
                      error={errors.firstname}
                    />
                  </div>
                  <div className="place-order__info-container__form-container__form__half__wrapper">
                    <Field
                      id="lastname"
                      label="Nom"
                      type="text"
                      onChange={handleChange}
                      value={lastname}
                      error={errors.lastname}
                    />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            <legend className="place-order__info-container__form-container__form__legend">
              Adresse de livraison
            </legend>
            <label
              className="place-order__info-container__form-container__form__label"
              htmlFor="country"
            >
              Pays
              <select
                className="place-order__info-container__form-container__form__label__select"
                name="country"
                id="country"
                value={country}
                onChange={handleChange}
              >
                <option data-code="DE" value="Germany">
                  Allemagne
                </option>
                <option data-code="AT" value="Austria">
                  Autriche
                </option>
                <option data-code="BE" value="Belgium">
                  Belgique
                </option>
                <option data-code="DK" value="Denmark">
                  Danemark
                </option>
                <option data-code="ES" value="Spain">
                  Espagne
                </option>
                <option data-code="FR" value="France">
                  France
                </option>
                <option data-code="IE" value="Ireland">
                  Irlande
                </option>
                <option data-code="IT" value="Italy">
                  Italie
                </option>
                <option data-code="LU" value="Luxembourg">
                  Luxembourg
                </option>
                <option data-code="NL" value="Netherlands">
                  Pays-Bas
                </option>
                <option data-code="PT" value="Portugal">
                  Portugal
                </option>
                <option data-code="GB" value="United Kingdom">
                  Royaume-Uni
                </option>
                <option data-code="SE" value="Sweden">
                  Suède
                </option>
                <option data-code="CH" value="Switzerland">
                  Suisse
                </option>
              </select>
            </label>
            <div className="place-order__info-container__form-container__form__address-container">
              <Field
                id="delivery-address"
                label="Adresse de livraison"
                type="text"
                value={address}
                onChange={handleChange}
                onFocus={() => setSuggestion(true)}
                onBlur={() => suggestion}
              />
              <AddressControl
                setCitySuggest={setCitySuggest}
                inputValue={address}
                setFocus={suggestion}
                setSuggestionFocus={setSuggestion}
              />
            </div>
            <Field
              id="address-information"
              label="Appartement, étage, code d'accès (facultatif)"
              type="text"
              value={addressInformation}
              onChange={handleChange}
            />
            <div className="place-order__info-container__form-container__form__half">
              <div className="place-order__info-container__form-container__form__half__wrapper">
                <Field
                  id="city"
                  label="Ville"
                  type="text"
                  value={city}
                  onChange={handleChange}
                />
              </div>
              <div className="place-order__info-container__form-container__form__half__wrapper">
                <Field
                  id="postal-code"
                  label="Code postal"
                  type="text"
                  value={postalCode}
                  onChange={handleChange}
                  error={errors.postalCode}
                />
              </div>
            </div>
            <Field
              id="phone"
              label="Téléphone"
              type="text"
              value={phone}
              onChange={handleChange}
              error={errors.phone}
            />
            {!user ? (
              <div className="place-order__info-container__create-account">
                <label
                  className="place-order__info-container__create-account__label"
                  htmlFor="create-account"
                >
                  <input
                    className="place-order__info-container__create-account__label__input"
                    type="checkbox"
                    name="create-account"
                    id="create-account"
                    onClick={() => setCreateAccount(!createAccount)}
                  />
                  Créer un compte ?
                </label>
                {createAccount ? (
                  <div className="place-order__info-container__create-account__password-container">
                    <Field
                      id="password"
                      label="Mot de passe"
                      type="password"
                      onChange={handleChange}
                      value={password}
                      error={errors.password}
                    />
                    <Field
                      id="password-confirm"
                      label="Confirmation du mot de passe"
                      type="password"
                      onChange={handleChange}
                      value={passwordConfirm}
                      error={errors.passwordConfirm}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            <button
              className={
                !disabled
                  ? "place-order__info-container__form-container__form__button"
                  : "place-order__info-container__form-container__form__button place-order__info-container__form-container__form__button--disabled"
              }
              type="submit"
              disabled={disabled}
            >
              Continuer
            </button>
          </form>
        </div>
      </div>
      <div className="place-order__cart-container">
        <h2>Résumé de votre panier</h2>
        {cart.map((article) => (
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
                <p>Quantité : {article.quantity}</p>
              </div>
              <div className="cart__cart-container__articles-container__product-container__infos__content-bottom">
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
    </div>
  );
}

export default PlaceOrder;
