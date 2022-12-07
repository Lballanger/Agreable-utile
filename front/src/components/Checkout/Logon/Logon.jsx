import "./Logon.scss";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { login } from "../../../slices/userSlice";

import Field from "../../Shared/Field/Field";

const initialState = {
  email: "",
  password: "",
};

function Logon({ setSteps, setActiveStep }) {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userSlice.token);

  const [inputs, setInputs] = useState({ ...initialState });
  const [error, setError] = useState(false);

  useEffect(() => {
    if (token) {
      setSteps((state) => {
        return {
          ...state,
          logon: true,
        };
      });
      setActiveStep("placeOrder");
    }
  }, [token]);

  const inputChange = (event) => {
    setInputs((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await dispatch(login(inputs))
        .unwrap()
        .then(() => {
          setSteps((state) => {
            return {
              ...state,
              logon: true,
            };
          });
          setActiveStep("placeOrder");
        })
        .catch((error) => {
          console.log(error.message);
          setError(true);
          setSteps((state) => {
            return {
              ...state,
              logon: false,
            };
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="logon">
      <div className="logon__container">
        <div className="logon__container__login-container">
          <div className="logon__container__login-container__inputs-container">
            <form
              className="logon__container__login-container__inputs-container__form"
              onSubmit={handleSubmit}
            >
              <h2 className="logon__container__login-container__inputs-container__form__title">
                CONNEXION
              </h2>
              {error ? (
                <div className="connexion__modal__container__form__error">
                  Votre adresse e-mail ou votre mot de passe est incorrect.
                </div>
              ) : (
                ""
              )}
              <div className="connexion__modal__container__form__inputs-container">
                <Field
                  id="email"
                  label="Adresse e-mail"
                  type="email"
                  onChange={inputChange}
                  value={inputs.email}
                />
                <Field
                  id="password"
                  label="Mot de passe"
                  type="password"
                  onChange={inputChange}
                  value={inputs.password}
                />
              </div>
              <button
                className="connexion__modal__container__form__submit"
                type="submit"
              >
                Connexion
              </button>
            </form>
          </div>
        </div>
        <div className="logon__container__guest-container">
          <h2 className="logon__container__guest-container__title">{`Acheter en tant qu'invité(e)`}</h2>
          <div className="logon__container__guest-container__content-container">
            <p className="logon__container__guest-container__content-container__content">
              {`Vous pouvez réaliser votre achat en tant qu'invité.`}
            </p>
            <p className="logon__container__guest-container__content-container__content">
              Il vous suffit de saisir les données nécessaires pour pouvoir
              effectuer votre commande.
            </p>
            <p className="logon__container__guest-container__content-container__content">
              Si vous le souhaitez, vous pourrez vous enregistrer et sauvegarder
              vos informations personnelles pour vos prochains achats à la fin
              du processus.
            </p>
          </div>
          <Link
            to="/order/guest-registration"
            className="logon__container__guest-container__link"
          >{`Continuez en tant qu'invité(e)`}</Link>
        </div>
      </div>
    </div>
  );
}

Logon.propTypes = {
  setSteps: PropTypes.bool.isRequired,
  setActiveStep: PropTypes.func.isRequired,
};

export default Logon;
