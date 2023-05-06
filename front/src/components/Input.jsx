import PropTypes from "prop-types";

function Input({
  type,
  name,
  onChange,
  htmlFor,
  placeholder,
  notRequired,
  value,
  readOnly,
  inputClassName,
  labelClassName,
  checked,
  error,
  min,
  max,
}) {
  return (
    <div className="field">
      <input
        type={type || "text"}
        className={
          inputClassName || `field__input ${error ? "field__input--error" : ""}`
        }
        name={name}
        value={value}
        onChange={onChange}
        required={notRequired || true}
        readOnly={readOnly || false}
        id={htmlFor}
        checked={checked}
        min={min}
        max={max}
      />
      <label htmlFor={htmlFor} className={labelClassName || "field__label"}>
        {placeholder}
      </label>
    </div>
  );
}

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  htmlFor: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  notRequired: PropTypes.bool,
  value: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  checked: PropTypes.bool,
  error: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
};

Input.defaultProps = {
  type: "text",
  notRequired: false,
  readOnly: false,
  inputClassName: "",
  labelClassName: "",
  checked: false,
  error: false,
  min: 0,
  max: 100,
};
