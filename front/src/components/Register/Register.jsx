import "./Register.scss";

function Register() {
  return (
    <div className="register">
      <h2 className="register__title">Rejoindre l&#8217;Agréable Utile</h2>
      <div className="register__container">
        <form className="register__container__form">
          <label
            className="register__container__form__label"
            htmlFor="firstname"
          >
            Prénom
            <input
              className="register__container__form__label__input"
              type="text"
              id="firstname"
              labelText="Prénom"
            />
          </label>
          <label
            className="register__container__form__label"
            htmlFor="lastname"
          >
            Nom
            <input
              className="register__container__form__label__input"
              type="text"
              id="lastname"
              labelText="Prénom"
            />
          </label>
          <label className="register__container__form__label" htmlFor="email">
            E-mail
            <input
              className="register__container__form__label__input"
              type="email"
              id="email"
              labelText="Prénom"
            />
          </label>
          <label
            className="register__container__form__label"
            htmlFor="password"
          >
            Mot de passe
            <input
              className="register__container__form__label__input"
              type="password"
              id="password"
              labelText="Prénom"
            />
          </label>
          <label
            className="register__container__form__label"
            htmlFor="password-confirm"
          >
            Confirmation du mot de passe
            <input
              className="register__container__form__label__input"
              type="password"
              id="password-confirm"
              labelText="Prénom"
            />
          </label>
          <button className="register__container__form__submit" type="submit">
            Créer mon compte
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
