import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAddress } from "../../../../slices/userSlice";
import AddressControl from "../../AddressControl/AddressControl";
import Field from "../../Field/Field";

// import "./AddAddress.scss";

const phoneRule = /^([+]\d{2})?\d{10}$/;

const postalCodeRule =
  /(?:0[1-9]|[13-8][0-9]|2[ab1-9]|9[0-5])(?:[0-9]{3})?|9[78][1-9](?:[0-9]{2})?/;

const initialState = {
  firstname: "",
  lastname: "",
  country: "France",
  address: "",
  addressInformation: "",
  city: "",
  postalCode: "",
  phone: "",
};

function AddAddress({ handleCloseAddAddressModal }) {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({ ...initialState });
  const [errors, setErrors] = useState({ ...initialState });
  const [suggestion, setSuggestion] = useState(false);

  const inputChange = (event) => {
    setInputs((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));

    if (event.target.name === "phone" || event.target.name === "postalCode") {
      switch (event.target.name) {
        case "phone":
          if (!phoneRule.test(event.target.value)) {
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

        case "postalCode":
          if (!postalCodeRule.test(event.target.value)) {
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
        default:
          break;
      }
    }

    if (event.target.value.length < 1) {
      setErrors((state) => {
        return {
          ...state,
          [event.target.name]: {
            error: true,
            message: `Le champs ne peut être vide.`,
          },
        };
      });
    } else {
      delete errors[event.target.name];
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await dispatch(createAddress(inputs))
        .unwrap()
        .then(() => {
          handleCloseAddAddressModal(event);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const setCitySuggest = (data) => {
    setInputs((state) => ({
      ...state,
      address: `${data.housenumber} ${data.street}`,
      city: data.city,
      postalCode: data.postcode,
    }));

    delete errors.postalCode;
  };

  return (
    <div className="addAddress">
      <div className="addAddress__modal">
        <div className="addAddress__modal__container">
          <form
            className="addAddress__modal__container__form"
            onSubmit={handleSubmit}
          >
            <div
              className="addAddress__modal__container__form__close"
              aria-hidden
              onClick={handleCloseAddAddressModal}
              onKeyDown={handleCloseAddAddressModal}
              type="close"
            >
              X
            </div>
            <h2 className="addAddress__modal__container__form__title">
              Ajouter une adresse
            </h2>
            <legend className="addAddress__modal__container__form__legend">
              Coordonnées
            </legend>
            <div className="addAddress__modal__container__form__half">
              <div className="addAddress__modal__container__form__half__wrapper">
                <Field
                  id="firstname"
                  label="Prénom"
                  type="text"
                  onChange={inputChange}
                  value={inputs.firstname}
                  error={errors.firstname}
                />
              </div>
              <div className="addAddress__modal__container__form__half__wrapper">
                <Field
                  id="lastname"
                  label="Nom"
                  type="text"
                  onChange={inputChange}
                  value={inputs.lastname}
                  error={errors.lastname}
                />
              </div>
            </div>

            <legend className="addAddress__modal__container__form__legend">
              Adresse de livraison
            </legend>
            <label
              className="addAddress__modal__container__form__label"
              htmlFor="country"
            >
              Pays
              <select
                className="addAddress__modal__container__form__label__select"
                name="country"
                id="country"
                value={inputs.country}
                onChange={inputChange}
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
            <div className="addAddress__modal__container__form__inputs-container">
              <Field
                id="address"
                label="Adresse de livraison"
                type="text"
                value={inputs.address}
                onChange={inputChange}
                onFocus={() => setSuggestion(true)}
                onBlur={() => suggestion}
              />
              <AddressControl
                setCitySuggest={setCitySuggest}
                inputValue={inputs.address}
                setFocus={suggestion}
                setSuggestionFocus={setSuggestion}
              />
            </div>
            <Field
              id="addressInformation"
              label="Appartement, étage, code d'accès (facultatif)"
              type="text"
              value={inputs.addressInformation}
              onChange={inputChange}
            />
            <div className="addAddress__modal__container__form__half">
              <div className="addAddress__modal__container__form__half__wrapper">
                <Field
                  id="city"
                  label="Ville"
                  type="text"
                  value={inputs.city}
                  onChange={inputChange}
                />
              </div>
              <div className="addAddress__modal__container__form__half__wrapper">
                <Field
                  id="postalCode"
                  label="Code postal"
                  type="text"
                  value={inputs.postalCode}
                  onChange={inputChange}
                  error={errors.postalCode}
                />
              </div>
            </div>
            <Field
              id="phone"
              label="Téléphone ( optionnel )"
              type="text"
              value={inputs.phone}
              onChange={inputChange}
              error={errors.phone}
            />
            <button
              className="addAddress__modal__container__form__submit"
              type="submit"
            >
              {`Ajouter l'adresse`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

AddAddress.propTypes = {
  handleCloseAddAddressModal: PropTypes.func.isRequired,
};

export default AddAddress;
