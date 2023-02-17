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
            className={
              error.error
                ? "field__label__input field__label__input--error"
                : "field__label__input"
            }
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
            <div className="field__label__error">{error.message}</div>
          ) : (
            ""
          )}
          {error && type === "text" && id === "lastname" ? (
            <div className="field__label__error">{error.message}</div>
          ) : (
            ""
          )}
          {error && type === "email" ? (
            <div className="field__label__error">{error.message}</div>
          ) : (
            ""
          )}
          {error && type === "password" && id === "password" ? (
            <div className="field__label__password-error">{error.message}</div>
          ) : (
            ""
          )}
          {error && type === "password" && id === "password-confirm" ? (
            <div className="field__label__password-error">{error.message}</div>
          ) : (
            ""
          )}
          {error && type === "text" && id === "phone" ? (
            <div className="field__label__error">{error.message}</div>
          ) : (
            ""
          )}
          {error && type === "text" && id === "postal-code" ? (
            <div className="field__label__error">{error.message}</div>
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
            className={
              error.error
                ? "field__number-container__number-input field__number-container__number-input--error"
                : "field__number-container__number-input"
            }
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
              {error.message}
            </div>
          ) : (
            ""
          )}
          {error && id === "month" ? (
            <div className="field__number-container__error">
              {error.message}
            </div>
          ) : (
            ""
          )}
          {error && id === "year" ? (
            <div className="field__number-container__error">
              {error.message}
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
  error: PropTypes.shape({
    error: PropTypes.bool,
    message: PropTypes.string,
  }),
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
  error: {
    error: false,
    message: "",
  },
  checked: false,
  focus: false,
};

export default Field;
