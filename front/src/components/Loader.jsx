import loader from "../assets/img/loader.svg";

function Loader() {
  return (
    <div className="shop__loader-container">
      <img
        className="shop__loader-container__loader"
        src={loader}
        alt="loader"
      />
    </div>
  );
}

export default Loader;
