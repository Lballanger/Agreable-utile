import "./Register.scss";
import { useState } from "react";
import Field from "../Shared/Field/Field";

function Register() {
  const initialErrors = {
    firstname: false,
    lastname: false,
    email: false,
    password: false,
    passwordConfirm: false,
  };

  const [errors, setErrors] = useState(initialErrors);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [disabled, setDisabled] = useState(true);

  const emailRule =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const passwordRule =
    /^.*(?=.{6,120})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,\<\>\/\?\;\:\'\"\\\|\[\]\{\}]).*$/;

  const handleChange = (event) => {
    switch (event.target.name) {
      case "firstname":
        setFirstname(event.target.value);
        if (event.target.value.trim().length < 2) {
          setErrors((state) => {
            return {
              ...state,
              firstname: true,
            };
          });
        } else if (errors.firstname) delete errors.firstname;
        break;

      case "lastname":
        setLastname(event.target.value);
        if (event.target.value.trim().length < 2) {
          setErrors((state) => {
            return {
              ...state,
              lastname: true,
            };
          });
        } else if (errors.lastname) delete errors.lastname;
        break;

      case "email":
        setEmail(event.target.value);
        if (!emailRule.test(event.target.value)) {
          setErrors((state) => {
            return {
              ...state,
              email: true,
            };
          });
        } else if (errors.email) delete errors.email;
        break;

      case "password":
        setPassword(event.target.value);
        if (!passwordRule.test(event.target.value)) {
          setErrors((state) => {
            return {
              ...state,
              password: true,
            };
          });
        } else if (errors.password) delete errors.password;
        break;

      case "password-confirm":
        setPasswordConfirm(event.target.value);
        if (event.target.value !== password) {
          setErrors((state) => {
            return {
              ...state,
              passwordConfirm: true,
            };
          });
        } else if (errors.passwordConfirm) delete errors.passwordConfirm;
        break;
      default:
        break;
    }
    if (Object.keys(errors).length < 1) setDisabled(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="register">
      <h2 className="register__title">Rejoindre l&#8217;Agréable Utile</h2>
      <div className="register__container">
        <form onSubmit={handleSubmit} className="register__container__form">
          <Field
            id="firstname"
            label="Prénom"
            type="text"
            onChange={handleChange}
            value={firstname}
            error={errors.firstname}
          />

          <Field
            id="lastname"
            label="Nom"
            type="text"
            onChange={handleChange}
            value={lastname}
            error={errors.lastname}
          />

          <Field
            id="email"
            label="E-mail"
            type="email"
            onChange={handleChange}
            value={email}
            error={errors.email}
          />
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
          <button
            className={
              !disabled
                ? "register__container__form__submit"
                : "register__container__form__submit register__container__form__submit--disabled"
            }
            type="submit"
            disabled={disabled}
          >
            Créer mon compte
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
