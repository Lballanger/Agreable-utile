import "./Register.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../slices/userSlice";
import API from "../../api/api";
import Field from "../Shared/Field/Field";

function Register() {
  const initialErrors = {
    firstname: false,
    lastname: false,
    day: false,
    month: false,
    year: false,
    email: false,
    password: false,
    passwordConfirm: false,
  };

  const dispatch = useDispatch();
  const history = useNavigate();

  const [focus, setfocus] = useState(false);
  const [errors, setErrors] = useState(initialErrors);
  const [civility, setCivility] = useState("mme");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [disabled, setDisabled] = useState(true);

  const emailRule =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const passwordRule =
    /^.*(?=.{6,120})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,\<\>\/\?\;\:\'\"\\\|\[\]\{\}]).*$/;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputs = {
      civility,
      firstname,
      lastname,
      email,
      password,
      dateOfBirth: `${year}-${month}-${day}`,
    };
    try {
      const error = Object.values(errors);
      if (error.length === 0) {
        const data = await API.register(inputs);
        dispatch(setUserData(data));
        history(`/account/${data.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => setfocus(true);

  const handleChange = (event) => {
    switch (event.target.name) {
      case "mr":
        setCivility(event.target.value);
        break;
      case "mme":
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

      case "day":
        setDay(event.target.value);
        if (
          event.target.value.length > 2 ||
          event.target.value.length < 1 ||
          event.target.value === 0 ||
          event.target.value > 31 ||
          event.target.value < 1
        ) {
          setErrors((state) => {
            return {
              ...state,
              day: true,
            };
          });
        } else if (errors.day) delete errors.day;

        break;

      case "month":
        setMonth(event.target.value);
        if (
          event.target.value.length > 2 ||
          event.target.value.length < 1 ||
          event.target.value === 0 ||
          event.target.value > 12 ||
          event.target.value < 1
        ) {
          setErrors((state) => {
            return {
              ...state,
              month: true,
            };
          });
        } else if (errors.month) delete errors.month;
        break;

      case "year":
        setYear(event.target.value);
        if (
          event.target.value.length > 4 ||
          event.target.value.length < 2 ||
          event.target.value === 0 ||
          event.target.value > 2022 ||
          event.target.value < 1917
        ) {
          setErrors((state) => {
            return {
              ...state,
              year: true,
            };
          });
        } else if (errors.year) delete errors.year;
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

          <div className="register__container__form__birth-container">
            <legend className="register__container__form__birth-container__legend">
              Date de naissance{" "}
              <span className="register__container__form__birth-container__legend__example">
                (ex: 01/01/1970)
              </span>
            </legend>
            <div className="register__container__form__birth-container__input-container">
              <Field
                label="Jour"
                id="day"
                type="number"
                onChange={handleChange}
                onClick={handleClick}
                focus={focus}
                value={day}
                min={1}
                max={31}
                error={errors.day}
              />
              <Field
                label="Mois"
                id="month"
                type="number"
                onChange={handleChange}
                onClick={handleClick}
                focus={focus}
                value={month}
                min={1}
                max={12}
                error={errors.month}
              />
              <Field
                label="Année"
                id="year"
                type="number"
                onChange={handleChange}
                onClick={handleClick}
                focus={focus}
                value={year}
                min={1917}
                max={2022}
                error={errors.year}
              />
            </div>
          </div>

          <Field
            id="email"
            label="Adresse e-mail"
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
