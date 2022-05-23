import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../../slices/userSlice";

import "./Connexion.scss";

import API from "../../api/api";

const initialState = {
  email: "",
  password: "",
};

function Connexion({ handleCloseModal }) {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [inputs, setInputs] = useState({ ...initialState });

  const inputChange = (event) => {
    setInputs((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await API.login(inputs);
      dispatch(setUserData(data));
      handleCloseModal(event);
      history("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="connexion">
      <div className="connexion__modal">
        <div className="connexion__modal__container">
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
              Formulaire de connexion
            </h2>

            <label
              className="connexion__modal__container__form__label"
              htmlFor="email"
            >
              Email
              <input
                className="connexion__modal__container__form__label__input"
                type="email"
                name="email"
                id="email"
                value={inputs.email}
                onChange={inputChange}
              />
            </label>
            <label
              className="connexion__modal__container__form__label"
              htmlFor="password"
            >
              Mot de passe
              <input
                className="connexion__modal__container__form__label__input"
                type="password"
                name="password"
                id="password"
                value={inputs.password}
                onChange={inputChange}
              />
            </label>
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
