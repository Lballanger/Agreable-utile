import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../slices/userSlice";

import "./Connexion.scss";

const initialState = {
  email: "",
  password: "",
};

function Connexion({ handleCloseModal }) {
  const dispatch = useDispatch();
  const history = useNavigate();

  const userId = useSelector((state) => state.userSlice.userData?.id);

  useEffect(() => {
    history(`/account/${userId}`);
  }, [userId]);

  const [inputs, setInputs] = useState({ ...initialState });

  const inputChange = (event) => {
    setInputs((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(inputs));
    handleCloseModal(event);
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
