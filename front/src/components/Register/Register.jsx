import { useState } from "react";
import { useDispatch } from "react-redux";
import API from "../../api/api";
import "./Register.scss";
import Field from "../Shared/Field/Field";
import { setUserData } from "../../slices/userSlice";

function Register() {
  const initialErrors = {
    firstname: false,
    lastname: false,
    email: false,
    password: false,
    passwordConfirm: false,
  };

  const dispatch = useDispatch();

  const [errors, setErrors] = useState(initialErrors);
  const [civility, setCivility] = useState("mme");
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
      case "mme":
        setCivility(event.target.value);
        break;
      case "mlle":
        setCivility(event.target.value);
        break;
      case "mr":
        setCivility(event.target.value);
        break;
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputs = {
      civility,
      firstname,
      lastname,
      email,
      password,
    };
    try {
      const data = await API.register(inputs);
      dispatch(setUserData(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register">
      <h2 className="register__title">Rejoindre l&#8217;Agréable Utile</h2>
      <div className="register__container">
        <form onSubmit={handleSubmit} className="register__container__form">
          <legend className="register__container__form__legend">
            Civilité
          </legend>
          <div className="register__container__form__radio-container">
            <Field
              id="mme"
              label="Mme"
              type="radio"
              onChange={handleChange}
              value="mme"
              checked={civility === "mme"}
            />
            <Field
              id="mlle"
              label="Mlle"
              type="radio"
              onChange={handleChange}
              value="mlle"
              checked={civility === "mlle"}
            />
            <Field
              id="mr"
              label="Mr."
              type="radio"
              onChange={handleChange}
              value="mr"
              checked={civility === "mr"}
            />
          </div>
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
