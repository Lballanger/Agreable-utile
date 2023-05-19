import propTypes from "prop-types";

function Button({
  buttonType,
  className,
  type,
  onClick,
  disabled,
  style,
  children,
}) {
  let styleButton = buttonType;

  switch (styleButton) {
    case "primary":
      styleButton = "button__primary";
      break;
    case "secondary":
      styleButton = "button__secondary";
      break;
    case "outline":
      styleButton = "button__outline";
      break;
    case "disabled":
      styleButton = "button__disabled";
      break;
    case "text":
      styleButton = "button__only__text";
      break;
    default:
  }

  return (
    <button
      className={`${styleButton === "button__unset" ? "" : "button"} ${
        styleButton || ""
      }${className ? ` ${className}` : ""}`}
      // eslint-disable-next-line react/button-has-type
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
}

export default Button;

Button.propTypes = {
  buttonType: propTypes.string.isRequired,
  className: propTypes.string,
  type: propTypes.string,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  style: propTypes.objectOf(propTypes.string),
  children: propTypes.node.isRequired,
};

Button.defaultProps = {
  className: "",
  type: "",
  onClick: () => {},
  disabled: false,
  style: {},
};
