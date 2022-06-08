import PropTypes from "prop-types";

import "./Field.scss";

function Field({ id, label, type = "text", value, onChange, disabled, error }) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
        <input
          className="field__label__input"
          id={id}
          type={type}
          name={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {error && type === "text" ? (
          <div className="field__label__error">
            Votre prénom doit contenir au minimum 2 caractères
          </div>
        ) : (
          ""
        )}
        {error && type === "email" ? (
          <div className="field__label__error">
            L&#8217; e-mail saisie n&#8217;est pas valide
          </div>
        ) : (
          ""
        )}
        {error && type === "password" && id === "password" ? (
          <div className="field__label__password-error">
            Votre mot de passe doit doit avoir au minimum 6 caractères contenir
            au moins une lettre minuscule, une lettre majuscule, un chiffre et
            un caractère spécial
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
      </label>
    </div>
  );
}

Field.defaultProps = {
  label: "",
  type: "text",
  value: "",
  onChange: () => {},
  disabled: false,
  error: false,
};

Field.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.oneOf(["text", "number", "password", "email"]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
};

export default Field;
