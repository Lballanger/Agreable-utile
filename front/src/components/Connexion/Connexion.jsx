import PropTypes from "prop-types";

import "./Connexion.scss";

function Connexion({ handleCloseModal }) {
  return (
    <div className="connexion">
      <div className="connexion__modal">
        <div className="connexion__modal__container">
          <form className="connexion__modal__container__form" action="get">
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
            </label>
            <input
              className="connexion__modal__container__form__input"
              type="email"
              name="email"
              id="email"
            />
            <label
              className="connexion__modal__container__form__label"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <input
              className="connexion__modal__container__form__input"
              type="password"
              name="password"
              id="password"
            />
            <button
              className="connexion__modal__container__form__submit"
              aria-hidden
              onClick={handleCloseModal}
              onKeyDown={handleCloseModal}
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
