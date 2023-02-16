// import "./AddressControl.scss";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function AddressControl({
  inputValue,
  setCitySuggest,
  setFocus,
  setSuggestionFocus,
  limit = 5,
}) {
  const [suggestion, setSuggestion] = useState([]);

  const getCommunes = () => {
    axios
      .get(
        `https://api-adresse.data.gouv.fr/search/?q=${inputValue}&limit=${limit}&type=housenumber&autocomplete=1`,
      )
      .then((data) => {
        const result = data.data.features.map((city) => ({
          id: city.properties.id,
          housenumber: city.properties.housenumber
            ? city.properties.housenumber
            : "",
          city: city.properties.city ? city.properties.city : "",
          street: city.properties.street ? city.properties.street : "",
          postcode: city.properties.postcode ? city.properties.postcode : "",
          label: city.properties.label ? city.properties.label : "",
        }));
        setSuggestion(result);
        return result;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (inputValue.length > 5) {
      setTimeout(() => {
        getCommunes();
      }, 1000);
    }
  }, [inputValue]);

  const handleClick = (event) => {
    const result = suggestion.find(
      (address) => parseInt(event.target.id, 10) === parseInt(address.id, 10),
    );
    setSuggestion([]);
    setCitySuggest(result);
    setSuggestionFocus(false);
  };

  return setFocus && inputValue.length > 5 ? (
    <div className="suggestions">
      <h2 className="suggestions__header">SUGGESTION</h2>
      <ul className="suggestions__address-container" role="listbox">
        {suggestion.length ? (
          suggestion.map((city, index) => (
            <li
              id={city.id}
              className="suggestions__address-container__address"
              key={city.id}
              role="option"
              aria-selected="true"
              onClick={handleClick}
              onKeyDown={handleClick}
              onKeyUp={handleClick}
              tabIndex={index}
            >
              {city.label}
            </li>
          ))
        ) : (
          <div className="suggestions__address-container__address">
            Aucune suggestion disponible
          </div>
        )}
      </ul>
    </div>
  ) : (
    ""
  );
}

AddressControl.defaultProps = {
  limit: 5,
};

AddressControl.propTypes = {
  inputValue: PropTypes.string.isRequired,
  setCitySuggest: PropTypes.func.isRequired,
  setSuggestionFocus: PropTypes.func.isRequired,
  setFocus: PropTypes.bool.isRequired,
  limit: PropTypes.number,
};

export default AddressControl;
