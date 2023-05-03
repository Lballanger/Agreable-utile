import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../slices/userSlice";

import "./Connexion.scss";
import Loader from "../Loader";
import Input from "../Input";

const initialState = {
  email: "",
  password: "",
};

function Connexion({ handleCloseModal }) {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({ ...initialState });
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const inputChange = (event) => {
    setInputs((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoader(true);
      await dispatch(login(inputs))
        .unwrap()
        .then(() => {
          handleCloseModal(event);
        });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoader(false);
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
              <Input
                name="email"
                value={inputs.email}
                onChange={inputChange}
                htmlFor="email"
                placeholder="Adresse e-mail"
              />
              <Input
                name="password"
                value={inputs.password}
                onChange={inputChange}
                htmlFor="password"
                placeholder="Mot de passe"
              />
            </div>
            <button
              className="connexion__modal__container__form__submit"
              type="submit"
            >
              {loader ? <Loader width="30px" height="30px" /> : "Connexion"}
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
