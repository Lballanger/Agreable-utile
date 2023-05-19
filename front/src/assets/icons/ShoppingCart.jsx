function ShoppingCart({ height, width }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "1rem"}
      height={height || "1rem"}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4.004 6.417L.762 3.174L2.176 1.76l3.243 3.242H20.66a1 1 0 0 1 .958 1.288l-2.4 8a1 1 0 0 1-.958.712H6.004v2h11v2h-12a1 1 0 0 1-1-1V6.417Zm1.5 16.585a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3Zm12 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3Z"
      />
    </svg>
  );
}

export default ShoppingCart;
