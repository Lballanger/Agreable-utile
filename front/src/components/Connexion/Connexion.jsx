import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../slices/userSlice";
import Field from "../Shared/Field/Field";

import "./Connexion.scss";

const initialState = {
  email: "",
  password: "",
};

function Connexion({ handleCloseModal }) {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({ ...initialState });
  const [error, setError] = useState(false);

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
          handleCloseModal(event);
        })
        .catch((error) => {
          console.log(error.message);
          setError(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal(event);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="connexion">
      <div className="connexion__modal">
        <div className="connexion__modal__container" ref={modalRef}>
          <form
            className="connexion__modal__container__form"
            onSubmit={handleSubmit}
          >
            <div
              className="connexion__modal__container__form__close"
              aria-hidden
              onClick={handleCloseModal}
              onKeyDown={handleCloseModal}
              type="close"
            >
              X
            </div>
            <h2 className="connexion__modal__container__form__title">
              {`S'identifier`}
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
    </div>
  );
}

Connexion.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
};

export default Connexion;
