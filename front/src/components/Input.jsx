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
}) {
  return (
    <div className="field">
      <input
        type={type || "text"}
        className={inputClassName || "field__input"}
        name={name}
        value={value}
        onChange={onChange}
        required={notRequired || true}
        readOnly={readOnly || false}
        id={htmlFor}
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
  inputClassName: PropTypes.string.isRequired,
  labelClassName: PropTypes.string.isRequired,
};

Input.defaultProps = {
  type: "text",
  notRequired: false,
  readOnly: false,
};
