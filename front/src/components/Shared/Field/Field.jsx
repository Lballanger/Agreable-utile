import PropTypes from "prop-types";
import React from "react";

import "./Field.scss";

function Field({
  id,
  label,
  type,
  value,
  min,
  max,
  onChange,
  disabled,
  error,
  checked = false,
  onFocus,
  onBlur,
  focus = false,
}) {
  return (
    <div className="field">
      {type === "radio" ? (
        <div className="field__container">
          <label className="field__container__label" htmlFor={id}>
            <input
              className="field__container__label__radio-input"
              type={type}
              id={id}
              name={id}
              value={value}
              onChange={onChange}
              checked={checked}
            />
            {label}
          </label>
        </div>
      ) : (
        ""
      )}
      {type !== "radio" && type !== "number" ? (
        <label className="field__label" htmlFor={id}>
          {label}
          <input
            className="field__label__input"
            id={id}
            type={type}
            name={id}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={disabled}
          />
          {error && type === "text" && id === "firstname" ? (
            <div className="field__label__error">
              Votre prénom doit contenir au minimum 2 caractères
            </div>
          ) : (
            ""
          )}
          {error && type === "email" ? (
            <div className="field__label__error">
              L&#8217; e-mail saisi n&#8217;est pas valide
            </div>
          ) : (
            ""
          )}
          {error && type === "password" && id === "password" ? (
            <div className="field__label__password-error">
              Votre mot de passe doit doit avoir au minimum 6 caractères
              contenir au moins une lettre minuscule, une lettre majuscule, un
              chiffre et un caractère spécial
            </div>
          ) : (
            ""
          )}
          {error && type === "password" && id === "password-confirm" ? (
            <div className="field__label__password-error">
              Les mots de passe ne correspondent pas
            </div>
          ) : (
            ""
          )}
          {error && type === "text" && id === "phone" ? (
            <div className="field__label__error">
              Le numéro de téléphone saisi n&#8217;est pas valide
            </div>
          ) : (
            ""
          )}
          {error && type === "text" && id === "postal-code" ? (
            <div className="field__label__error">
              Le code postal saisi n&#8217;est pas valide
            </div>
          ) : (
            ""
          )}
        </label>
      ) : (
        ""
      )}

      {type === "number" ? (
        <div className="field__number-container">
          <label
            className={
              focus
                ? "field__number-container__label field__number-container__label--active"
                : "field__number-container__label"
            }
            htmlFor={id}
          >
            {label}
          </label>
          <input
            className="field__number-container__number-input"
            type={type}
            id={id}
            name={id}
            value={value}
            min={min}
            max={max}
            onChange={onChange}
            onFocus={onFocus}
          />
          {error && id === "day" ? (
            <div className="field__number-container__error">
              Le jour saisi n&#8217;est pas valide
            </div>
          ) : (
            ""
          )}
          {error && id === "month" ? (
            <div className="field__number-container__error">
              Le mois saisi n&#8217;est pas valide
            </div>
          ) : (
            ""
          )}
          {error && id === "year" ? (
            <div className="field__number-container__error">
              L&#8217;année saisie n&#8217;est pas valide
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

Field.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.oneOf(["text", "number", "password", "email", "radio"]),
  value: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  checked: PropTypes.bool,
  focus: PropTypes.bool,
};

Field.defaultProps = {
  label: "",
  type: "text",
  value: "",
  min: 1,
  max: 0,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  disabled: false,
  error: false,
  checked: false,
  focus: false,
};

export default Field;
