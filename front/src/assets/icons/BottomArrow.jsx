function BottomArrow({ width, height, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="arrow"
      x="0"
      y="0"
      width={width || "1em"}
      height={height || "1em"}
      fill={color || "black"}
      version="1.1"
      viewBox="0 0 29 29"
      xmlSpace="preserve"
    >
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="m20.5 11.5-6 6-6-6"
      />
    </svg>
  );
}

export default BottomArrow;
