import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../slices/userSlice";
import Input from "../../components/Input";

function Register() {
  const initialErrors = {
    firstname: { error: false, message: `` },
    lastname: { error: false, message: `` },
    day: { error: false, message: `` },
    month: { error: false, message: `` },
    year: { error: false, message: `` },
    email: { error: false, message: `` },
    password: { error: false, message: `` },
    passwordConfirm: { error: false, message: `` },
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const userData = useSelector((state) => state.userSlice.userData);

  useEffect(() => {
    if (userData?.id) {
      navigate(`/account/${userData.id}/profil`);
    }
  }, [userData]);

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

    const error = Object.values(errors);
    if (error.length === 0) {
      await dispatch(register({ ...inputs }))
        .unwrap()
        .catch((error) => {
          if (error === "User already exists") {
            setErrors((state) => {
              return {
                ...state,
                email: {
                  error: true,
                  message:
                    "L'adresse e-mail est déjà utilisée, merci de vous connecter ou de créer un compte avec une autre adresse e-mail.",
                },
              };
            });
          }
        });
    }
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "civility":
        setCivility(event.target.value);
        break;
      case "firstname":
        setFirstname(event.target.value);
        if (event.target.value.trim().length < 2) {
          setErrors((state) => {
            return {
              ...state,
              firstname: {
                error: true,
                message: `Votre prénom doit contenir au minimum 2 caractères.`,
              },
            };
          });
        } else delete errors.firstname;
        break;

      case "lastname":
        setLastname(event.target.value);
        if (event.target.value.trim().length < 2) {
          setErrors((state) => {
            return {
              ...state,
              lastname: {
                error: true,
                message: `Votre nom doit contenir au minimum 2 caractères.`,
              },
            };
          });
        } else delete errors.lastname;
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
              day: {
                error: true,
                message: `Le jour saisi n'est pas valide.`,
              },
            };
          });
        } else delete errors.day;

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
              month: {
                error: true,
                message: `Le mois saisi n'est pas valide.`,
              },
            };
          });
        } else delete errors.month;
        break;

      case "year":
        setYear(event.target.value);
        if (
          event.target.value.length > 4 ||
          event.target.value.length < 2 ||
          event.target.value === 0 ||
          event.target.value > 2023 ||
          event.target.value < 1917
        ) {
          setErrors((state) => {
            return {
              ...state,
              year: {
                error: true,
                message: `L'année saisie n'est pas valide.`,
              },
            };
          });
        } else delete errors.year;
        break;

      case "email":
        setEmail(event.target.value);
        if (!emailRule.test(event.target.value)) {
          setErrors((state) => {
            return {
              ...state,
              email: {
                error: true,
                message: `L'e-mail saisi n'est pas valide.`,
              },
            };
          });
        } else delete errors.email;
        break;

      case "password":
        setPassword(event.target.value);
        if (!passwordRule.test(event.target.value)) {
          setErrors((state) => {
            return {
              ...state,
              password: { error: true, message: `` },
            };
          });
        } else delete errors.password;
        break;

      case "password-confirm":
        setPasswordConfirm(event.target.value);
        if (event.target.value !== password) {
          setErrors((state) => {
            return {
              ...state,
              passwordConfirm: { error: true, message: `` },
            };
          });
        } else delete errors.passwordConfirm;
        break;
      default:
        break;
    }
    if (Object.keys(errors).length < 1) setDisabled(false);
  };

  return (
    <div className="register">
      <h2 className="register__title">Rejoindre Nom de la boutique</h2>
      <div className="register__container">
        <form onSubmit={handleSubmit} className="register__container__form">
          <legend className="register__container__form__legend">
            Civilité
          </legend>
          <div className="register__container__form__radio-container">
            <Input
              htmlFor="mme"
              type="radio"
              name="civility"
              onChange={handleChange}
              placeholder="Madame"
              value="Mme"
              checked={civility === "Mme"}
            />
            <Input
              htmlFor="m"
              type="radio"
              name="civility"
              onChange={handleChange}
              placeholder="Monsieur"
              value="M"
              checked={civility === "M"}
            />
          </div>
          <Input
            htmlFor="firstname"
            name="firstname"
            label="Prénom"
            type="text"
            onChange={handleChange}
            value={firstname}
            placeholder="Prénom"
            error={errors.firstname?.error}
          />

          {errors.firstname?.message && (
            <p className="register__container__form__error">
              {errors.firstname.message}
            </p>
          )}

          <Input
            htmlFor="lastname"
            name="lastname"
            label="Nom"
            type="text"
            onChange={handleChange}
            value={lastname}
            placeholder="Nom"
            error={errors.lastname?.error}
          />

          {errors.lastname?.message && (
            <p className="register__container__form__error">
              {errors.lastname.message}
            </p>
          )}

          <div className="register__container__form__birth-container">
            <legend className="register__container__form__birth-container__legend">
              Date de naissance{" "}
              <span className="register__container__form__birth-container__legend__example">
                (ex: 01/01/1970)
              </span>
            </legend>
            <div className="register__container__form__birth-container__input-container">
              <Input
                htmlFor="day"
                name="day"
                label="Jour"
                type="number"
                placeholder="Jour"
                onChange={handleChange}
                value={day}
                min={1}
                max={31}
                error={errors.day?.error}
              />
              <Input
                htmlFor="month"
                name="month"
                label="Mois"
                type="number"
                placeholder="Mois"
                onChange={handleChange}
                value={month}
                min={1}
                max={12}
                error={errors.month?.error}
              />
              <Input
                htmlFor="year"
                name="year"
                label="Année"
                type="number"
                placeholder="Année"
                onChange={handleChange}
                value={year}
                min={1917}
                max={2023}
                error={errors.year?.error}
              />
            </div>

            {(errors.day || errors.month || errors.year) && (
              <>
                {errors.day?.message && (
                  <p className="register__container__form__error">
                    {errors.day?.message}
                  </p>
                )}
                {errors.month?.message && (
                  <p className="register__container__form__error">
                    {errors.month?.message}
                  </p>
                )}
                {errors.year?.message && (
                  <p className="register__container__form__error">
                    {errors.year?.message}
                  </p>
                )}
              </>
            )}
          </div>

          <Input
            htmlFor="email"
            name="email"
            label="Adresse e-mail"
            type="email"
            placeholder="Adresse e-mail"
            onChange={handleChange}
            value={email}
            error={errors.email?.error}
          />

          {errors.email?.message && (
            <p className="register__container__form__error">
              {errors.email?.message}
            </p>
          )}

          <Input
            htmlFor="password"
            name="password"
            label="Mot de passe"
            type="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            value={password}
            error={errors.password?.error}
          />

          {errors.password?.message && (
            <p className="register__container__form__error">
              {errors.password.message}
            </p>
          )}

          <Input
            htmlFor="password-confirm"
            name="password-confirm"
            label="Confirmation du mot de passe"
            type="password"
            placeholder="Confirmation du mot de passe"
            onChange={handleChange}
            value={passwordConfirm}
            error={errors.passwordConfirm?.error}
          />

          {errors.passwordConfirm?.message && (
            <p className="register__container__form__error">
              {errors.passwordConfirm.message}
            </p>
          )}

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
