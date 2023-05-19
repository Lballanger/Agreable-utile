/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
function IconBurger({ width, height, color }) {
  return (
    <svg
      width={width || 48}
      height={height || 48}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
    >
      <path
        d="M41 14H7a2 2 0 0 1 0-4h34a2 2 0 0 1 0 4ZM41 26H7a2 2 0 0 1 0-4h34a2 2 0 0 1 0 4ZM41 38H7a2 2 0 0 1 0-4h34a2 2 0 0 1 0 4Z"
        fill={color || "black"}
      />
    </svg>
  );
}

export default IconBurger;
