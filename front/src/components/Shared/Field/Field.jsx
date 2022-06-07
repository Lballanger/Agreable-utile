import PropTypes from "prop-types";

import "./Field.scss";

function Field({ id, label, type = "text", value, onChange, disabled }) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
        <input
          className="field__label__input"
          id={id}
          type={type}
          name="civility"
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
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
};

Field.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string,
  type: PropTypes.oneOf(["text", "number", "password", "email"]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Field;
