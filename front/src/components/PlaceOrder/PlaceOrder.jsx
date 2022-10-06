import "./PlaceOrder.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../slices/userSlice";
import { createAddress } from "../../slices/orderSlice";

import Field from "../Shared/Field/Field";
import AddressControl from "../Shared/AddressControl/AddressControl";
import Connexion from "../Connexion/Connexion";

import athome from "../../assets/img/athome.png";
import workshop from "../../assets/img/workshop.png";
import inpoint from "../../assets/img/inpoint.png";
import marketplace from "../../assets/img/marketplace.jpg";

function PlaceOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userSlice.userData);
  const cart = useSelector((state) => state.articlesSlice.cart);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!cart.length) navigate("/cart", { replace: true });

  const initialErrors = {
    email: {
      error: false,
      message: "",
    },
    firstname: {
      error: false,
      message: "",
    },
    lastname: {
      error: false,
      message: "",
    },
    postalCode: {
      error: false,
      message: "",
    },
  };

  const [errors, setErrors] = useState(initialErrors);

  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState(
    user?.firstname ? user.firstname : "",
  );
  const [lastname, setLastName] = useState(user?.lastname ? user.lastname : "");
  const [country, setCountry] = useState("France");
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
  const [delivery, setDelivery] = useState("at-home");

  const emailRule =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const phoneRule = /^([+]\d{2})?\d{10}$/;

  const postalCodeRule =
    /(?:0[1-9]|[13-8][0-9]|2[ab1-9]|9[0-5])(?:[0-9]{3})?|9[78][1-9](?:[0-9]{2})?/;

  const passwordRule =
    /^.*(?=.{6,120})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,\<\>\/\?\;\:\'\"\\\|\[\]\{\}]).*$/;

  useEffect(() => {
    if (user) {
      setFirstname(user?.firstname);
      if (firstname) delete errors.firstname;
      setLastName(user?.lastname);
      if (lastname) delete errors.lastname;

      delete errors.email;
    }
  }, [user]);

  useEffect(() => {
    if (createAccount) {
      setErrors((state) => {
        return {
          ...state,
          password: { error: false, message: "" },
          passwordConfirm: { error: false, message: "" },
        };
      });
      setDisabled(true);
    } else {
      delete errors.password;
      delete errors.passwordConfirm;
      if (!Object.keys(errors).length) setDisabled(false);
    }
  }, [createAccount]);

  useEffect(() => {
    if (Object.keys(errors).length && !disabled) setDisabled(true);
  }, [errors]);

  const handleCloseModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const error = Object.values(errors);

    if (error.length === 0) {
      // In the case of account creation
      if (createAccount) {
        await dispatch(
          register({
            civility: "Mr",
            firstname,
            lastname,
            email,
            password,
            // The user wishes to create an account
            registred: true,
          }),
        )
          .unwrap()
          .then((data) => {
            dispatch(
              createAddress({
                country,
                address,
                city,
                postalCode,
                additionalInfo: addressInformation,
                email: data.email,
              }),
            );
            navigate("/payment");
          })
          .catch((error) => {
            console.error(error);
            if (error === "User already exists") {
              setErrors((state) => {
                return {
                  ...state,
                  email: {
                    error: true,
                    message:
                      "L'adresse e-mail est déjà utilisée, merci de vous connecter ou de créer un compte.",
                  },
                };
              });
            }
          });
        // In the case of a user already logged in
      } else if (user) {
        navigate("/payment");
      } else {
        dispatch(
          register({
            civility: "Mr",
            firstname,
            lastname,
            email,
            password,
            // The user does not wish to create an account
            registred: false,
          }),
        )
          .unwrap()
          .then((data) => {
            dispatch(
              createAddress({
                country,
                address,
                city,
                postalCode,
                additionalInfo: addressInformation,
                email,
                userId: data.id,
              }),
            );
            navigate("/payment");
          });
      }
    }
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
              email: {
                error: true,
                message: `L'e-mail saisi n'est pas valide`,
              },
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
              firstname: {
                error: true,
                message: `Votre prénom doit contenir au minimum 2 caractères`,
              },
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
              lastname: {
                error: true,
                message: `Votre nom doit contenir au minimum 2 caractères`,
              },
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
              postalCode: {
                error: true,
                message: `Le code postal saisi n'est pas valide`,
              },
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
              phone: {
                error: true,
                message: `Le numéro de téléphone saisi n'est pas valide`,
              },
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
              password: {
                error: true,
                message: `Votre mot de passe doit doit avoir au minimum 6 caractères
              contenir au moins une lettre minuscule, une lettre majuscule, un
              chiffre et un caractère spécial`,
              },
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
              passwordConfirm: {
                error: true,
                message: `Les mots de passe ne correspondent pas`,
              },
            };
          });
        } else delete errors.passwordConfirm;
        break;

      case "at-home":
        setDelivery(event.target.value);
        break;

      case "on-site":
        setDelivery(event.target.value);
        break;

      case "relay-point":
        setDelivery(event.target.value);
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

    delete errors.postalCode;
  };

  return (
    <div className="place-order">
      {isModalOpen && <Connexion handleCloseModal={handleCloseModal} />}
      {user ? (
        <>
          <div className="place-order__delivery-container">
            <h2 className="place-order__delivery-container__title">
              Mode de livraison
            </h2>
            <div
              className="place-order__delivery-container__at-home-container"
              onClick={() => setDelivery("at-home")}
            >
              <div className="place-order__delivery-container__at-home-container__icon-container">
                <img
                  className="place-order__delivery-container__at-home-container__icon-container__icon"
                  src={athome}
                  alt=""
                />
              </div>
              <div className="place-order__delivery-container__at-home-container__content-container">
                À domicile
              </div>
              <div className="place-order__delivery-container__at-home-container__input-container">
                <input
                  className="place-order__delivery-container__at-home-container__input-container__input"
                  name="at-home"
                  type="radio"
                  value="at-home"
                  checked={delivery === "at-home"}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div
              className="place-order__delivery-container__at-home-container"
              onClick={() => setDelivery("relay-point")}
            >
              <div className="place-order__delivery-container__at-home-container__icon-container">
                <img
                  className="place-order__delivery-container__at-home-container__icon-container__icon"
                  src={inpoint}
                  alt=""
                />
              </div>
              <div className="place-order__delivery-container__at-home-container__content-container">
                Point relais
              </div>
              <div className="place-order__delivery-container__at-home-container__input-container">
                <input
                  className="place-order__delivery-container__at-home-container__input-container__input"
                  name="relay-point"
                  type="radio"
                  value="relay-point"
                  checked={delivery === "relay-point"}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div
              className="place-order__delivery-container__on-site-container"
              onClick={() => setDelivery("on-site")}
            >
              <div className="place-order__delivery-container__on-site-container__icon-container">
                <img
                  className="place-order__delivery-container__on-site-container__icon-container__icon"
                  src={workshop}
                  alt=""
                />
              </div>
              <div className="place-order__delivery-container__on-site-container__content-container">
                Récupérer en atelier
              </div>
              <div className="place-order__delivery-container__on-site-container__input-container">
                <input
                  className="place-order__delivery-container__on-site-container__input-container__input"
                  name="on-site"
                  type="radio"
                  value="on-site"
                  checked={delivery === "on-site"}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div
              className="place-order__delivery-container__at-home-container"
              onClick={() => setDelivery("marketplace")}
            >
              <div className="place-order__delivery-container__at-home-container__icon-container">
                <img
                  className="place-order__delivery-container__at-home-container__icon-container__icon"
                  src={marketplace}
                  alt=""
                />
              </div>
              <div className="place-order__delivery-container__at-home-container__content-container">
                Récupérer au marché
              </div>
              <div className="place-order__delivery-container__at-home-container__input-container">
                <input
                  className="place-order__delivery-container__at-home-container__input-container__input"
                  name="marketplace"
                  type="radio"
                  value="marketplace"
                  checked={delivery === "marketplace"}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {delivery === "at-home" && (
            <div className="place-order__addresses-container">
              <h2 className="place-order__addresses-container__title">
                Mes adresses sauvegardées
              </h2>
              <div className="place-order__addresses-container__list-container">
                {user.addresses?.map((addressSaved) => (
                  <div className="place-order__addresses-container__list-container__content-container">
                    <div
                      className="place-order__addresses-container__list-container__content-container__address"
                      key={addressSaved.id}
                    >
                      <div className="place-order__addresses-container__list-container__content-container__address__identity">
                        {user.firstname} {user.lastname}
                      </div>
                      <div className="place-order__addresses-container__list-container__content-container__address__street">
                        {addressSaved.address}
                      </div>
                      <div className="place-order__addresses-container__list-container__content-container__address__city">
                        {addressSaved.city} - {addressSaved.postal_code}
                      </div>
                    </div>
                    <div className="place-order__addresses-container__list-container__content-container__button-container">
                      <Link
                        to="/payment"
                        className="place-order__addresses-container__list-container__content-container__button-container__button"
                        type="button"
                      >
                        Choisir
                      </Link>
                    </div>
                  </div>
                ))}
                <div className="place-order__addresses-container__add-address">
                  <button
                    className="place-order__addresses-container__add-address__button"
                    type="button"
                  >
                    Ajouter une adresse
                  </button>
                </div>
              </div>
            </div>
          )}
          {delivery === "on-site" && (
            <div className="place-order__addresses-container">
              <h2 className="place-order__addresses-container__title">
                Informations
              </h2>
              <div className="place-order__addresses-container__list-container">
                <div className="">
                  Je vous contacterai lorsque votre commande sera prête pour que
                  nous convenions ensemble d'un rendez-vous.
                </div>
                <div className="place-order__addresses-container__add-address">
                  <button
                    className="place-order__addresses-container__add-address__button"
                    type="button"
                  >
                    Ajouter une adresse
                  </button>
                </div>
              </div>
            </div>
          )}
          {delivery === "relay-point" && (
            <div className="place-order__addresses-container">
              <h2 className="place-order__addresses-container__title">
                Choix du point relais
              </h2>
              <div className="place-order__addresses-container__list-container">
                <div className="">TEST</div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="place-order__address-container">
            {!user ? (
              <div className="place-order__info-container__connexion">
                <p className="place-order__info-container__connexion__paragraph">
                  Vous possédez déjà un compte ?
                </p>
                <button
                  className="place-order__info-container__connexion__button"
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                >
                  Se connecter
                </button>
              </div>
            ) : (
              ""
            )}
            <div className="place-order__address-container__existing-address" />
          </div>
          <div className="place-order__info-container">
            <div className="place-order__info-container__form-container">
              <form
                className="place-order__info-container__form-container__form"
                onSubmit={handleSubmit}
              >
                <legend className="place-order__info-container__form-container__form__legend">
                  Coordonnées
                </legend>
                {!user ? (
                  <Field
                    id="email-order"
                    label="Adresse e-mail"
                    type="email"
                    onChange={handleChange}
                    value={email}
                    error={errors.email}
                  />
                ) : (
                  ""
                )}

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
                  label="Téléphone ( optionnel )"
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
        </>
      )}
    </div>
  );
}

export default PlaceOrder;
