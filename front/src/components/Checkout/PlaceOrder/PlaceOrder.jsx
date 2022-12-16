import "./PlaceOrder.scss";

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  register,
  createAddress,
  fetchAddressesByUserId,
} from "../../../slices/userSlice";

import Field from "../../Shared/Field/Field";
import AddressControl from "../../Shared/AddressControl/AddressControl";
import Connexion from "../../Connexion/Connexion";
import AddAddress from "../../Shared/Modal/AddAddress/AddAddress";

import athome from "../../../assets/img/athome.svg";
import workshop from "../../../assets/img/workshop.svg";
import inpoint from "../../../assets/img/inpoint.svg";
import marketplace from "../../../assets/img/marketplace.svg";
import { deliverySelected } from "../../../slices/cartSlice";

function PlaceOrder({ steps, setSteps, setActiveStep }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userSlice.userData);
  const cart = useSelector((state) => state.articlesSlice.cart);
  const addresses = useSelector((state) => state.userSlice.addresses);
  const token = useSelector((state) => state.userSlice.token);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addAddressModalOpen, setAddAddressModalOpen] = useState(false);

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
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
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
  const [delivery, setDelivery] = useState("atHome");

  const emailRule =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const phoneRule = /^([+]\d{2})?\d{10}$/;

  const postalCodeRule =
    /(?:0[1-9]|[13-8][0-9]|2[ab1-9]|9[0-5])(?:[0-9]{3})?|9[78][1-9](?:[0-9]{2})?/;

  const passwordRule =
    /^.*(?=.{6,120})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,\<\>\/\?\;\:\'\"\\\|\[\]\{\}]).*$/;

  useEffect(() => {
    if (!addresses.length && token) {
      dispatch(fetchAddressesByUserId());
    }
  }, [addresses, token]);

  useEffect(() => {
    if (!token && !steps.guest) {
      setSteps((state) => {
        return {
          ...state,
          placeOrder: false,
        };
      });
      setActiveStep("logon");
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

  const handleCloseAddAddressModal = (event) => {
    event.stopPropagation();
    setAddAddressModalOpen(false);
  };

  const handleClick = (address) => {
    if ((delivery === "marketplace" || delivery === "onSite") && !phone) {
      setErrors((state) => {
        return {
          ...state,
          phone: {
            error: true,
            message: `Merci de renseigner un numéro afin de vous contacter lorsque votre commande sera prête.`,
          },
        };
      });
      return;
    }

    if (
      (delivery === "marketplace" || delivery === "onSite") &&
      phone &&
      !errors.phone
    ) {
      dispatch(deliverySelected({ delivery, phone }));
      setSteps((state) => {
        return {
          ...state,
          placeOrder: true,
        };
      });
      setActiveStep("payment");
    }

    if (delivery === "atHome") {
      dispatch(deliverySelected({ delivery, address }));
      setSteps((state) => {
        return {
          ...state,
          placeOrder: true,
        };
      });
      setActiveStep("payment");
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
      {addAddressModalOpen && (
        <AddAddress handleCloseAddAddressModal={handleCloseAddAddressModal} />
      )}
      <div className="place-order__delivery-container">
        <h2 className="place-order__delivery-container__title">
          Mode de livraison
        </h2>
        <div
          className="place-order__delivery-container__at-home-container"
          onClick={() => setDelivery("atHome")}
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
              name="atHome"
              type="radio"
              value="atHome"
              checked={delivery === "atHome"}
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
          onClick={() => setDelivery("onSite")}
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
              name="onSite"
              type="radio"
              value="onSite"
              checked={delivery === "onSite"}
              onChange={handleChange}
            />
          </div>
        </div>
        <div
          className="place-order__delivery-container__marketplace-container"
          onClick={() => setDelivery("marketplace")}
        >
          <div className="place-order__delivery-container__marketplace-container__icon-container">
            <img
              className="place-order__delivery-container__marketplace-container__icon-container__icon"
              src={marketplace}
              alt=""
            />
          </div>
          <div className="place-order__delivery-container__marketplace-container__content-container">
            Récupérer au marché
          </div>
          <div className="place-order__delivery-container__marketplace-container__input-container">
            <input
              className="place-order__delivery-container__marketplace-container__input-container__input"
              name="marketplace"
              type="radio"
              value="marketplace"
              checked={delivery === "marketplace"}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      {delivery === "atHome" && (
        <div className="place-order__addresses-container">
          <h2 className="place-order__addresses-container__title">
            Mes adresses sauvegardées
          </h2>
          {addresses.length > 0 ? (
            <div className="place-order__addresses-container__list-container">
              {addresses.map((addressSaved) => (
                <div
                  className="place-order__addresses-container__list-container__content-container"
                  key={addressSaved.id}
                >
                  <div className="place-order__addresses-container__list-container__content-container__address">
                    <div className="place-order__addresses-container__list-container__content-container__address__identity">
                      {addressSaved.firstname} {addressSaved.lastname}
                    </div>
                    <div className="place-order__addresses-container__list-container__content-container__address__street">
                      {addressSaved.address}
                    </div>
                    <div className="place-order__addresses-container__list-container__content-container__address__city">
                      {addressSaved.city}
                    </div>
                    <div className="place-order__addresses-container__list-container__content-container__address__postal-code">
                      {addressSaved.postal_code}
                    </div>
                    <div className="place-order__addresses-container__list-container__content-container__address__postal-code">
                      {addressSaved.phone}
                    </div>
                    <div className="place-order__addresses-container__list-container__content-container__address__country">
                      France
                    </div>
                  </div>
                  <div className="place-order__addresses-container__list-container__content-container__button-container">
                    <button
                      onClick={() => handleClick(addressSaved)}
                      className="place-order__addresses-container__list-container__content-container__button-container__button"
                      type="button"
                    >
                      Choisir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="">Vous n'avez pas d'adresse de sauvegardée.</div>
          )}

          <div className="place-order__addresses-container__add-address">
            <button
              className="place-order__addresses-container__add-address__button"
              type="button"
              onClick={() => setAddAddressModalOpen(true)}
            >
              Ajouter une adresse
            </button>
          </div>
        </div>
      )}
      {delivery === "onSite" && (
        <div className="place-order__information">
          <h2 className="place-order__information__title">
            Informations atelier
          </h2>
          <div className="place-order__information__list-container">
            <div className="place-order__information__list-container__description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. In
              repellat earum ea voluptates vel, vitae qui hic. Fugiat modi, nam
              iste expedita ex autem, eveniet, maiores ad unde dicta molestias!
              Modi facere quasi laboriosam ad alias reprehenderit fugiat
              eligendi laborum vel dignissimos eius, corporis vitae odit aut
              blanditiis praesentium neque sequi. Numquam nisi nobis ipsam amet
              modi molestiae beatae. Facilis.
            </div>
            <div className="place-order__information__button-container">
              <Field
                id="phone"
                label="Téléphone (requis)"
                type="text"
                value={phone}
                onChange={handleChange}
                error={errors.phone}
              />
              <button
                onClick={() => handleClick(delivery)}
                className="place-order__information__button-container__button"
                type="button"
              >
                Suivant
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
            <div className="place-order__information__list-container__description">
              TEST
            </div>
          </div>
        </div>
      )}
      {delivery === "marketplace" && (
        <div className="place-order__information">
          <h2 className="place-order__information__title">
            Informations marché
          </h2>
          <div className="place-order__information__list-container">
            <div className="place-order__information__list-container__description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. In
              repellat earum ea voluptates vel, vitae qui hic. Fugiat modi, nam
              iste expedita ex autem, eveniet, maiores ad unde dicta molestias!
              Modi facere quasi laboriosam ad alias reprehenderit fugiat
              eligendi laborum vel dignissimos eius, corporis vitae odit aut
              blanditiis praesentium neque sequi. Numquam nisi nobis ipsam amet
              modi molestiae beatae. Facilis.
            </div>
            <div className="place-order__information__button-container">
              <Field
                id="phone"
                label="Téléphone (requis)"
                type="text"
                value={phone}
                onChange={handleChange}
                error={errors.phone}
              />
              <button
                onClick={() => handleClick(delivery)}
                className="place-order__information__button-container__button"
                type="button"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

PlaceOrder.propTypes = {
  steps: PropTypes.shape({
    logon: PropTypes.bool.isRequired,
    guest: PropTypes.bool.isRequired,
    placeOrder: PropTypes.bool.isRequired,
    payment: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
  }).isRequired,
  setSteps: PropTypes.bool.isRequired,
  setActiveStep: PropTypes.func.isRequired,
};

export default PlaceOrder;
