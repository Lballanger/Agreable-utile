import "./AccountMenu.scss";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function AccountMenu({ userData }) {
  return (
    <div className="left-container">
      <div className="left-container__user-info">
        <div className="left-container__user-info__img-container">
          <img
            className="left-container__user-info__img-container__img"
            src={`https://ui-avatars.com/api/?name=${userData.firstname}+${userData.lastname}&background=F987A8&color=fff&rounded=true&size=95&font-size=0.33`}
            alt="avatar"
          />
        </div>
        <h2 className="left-container__user-info__title-container">
          Bonjour{" "}
          <span className="left-container__user-info__title-container__content">
            {userData.firstname}
          </span>{" "}
          !
        </h2>
      </div>
      <div className="left-container__navigation">
        <ul className="left-container__navigation__navigation-container">
          <li className="left-container__navigation__navigation-container__item">
            <Link
              className="left-container__navigation__navigation-container__item__link"
              to={`/account/${userData.id}/profil`}
            >
              Mes informations personnelles
            </Link>
          </li>
          <li className="left-container__navigation__navigation-container__item">
            <Link
              className="left-container__navigation__navigation-container__item__link"
              to={`/account/${userData.id}/orders`}
            >
              Mes commandes
            </Link>
          </li>
          <li className="left-container__navigation__navigation-container__item">
            <Link
              className="left-container__navigation__navigation-container__item__link"
              to="/contact"
            >
              Une question ?
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

AccountMenu.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.number,
    civility: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    city: PropTypes.string,
    date_of_birth: PropTypes.string,
  }).isRequired,
};

export default AccountMenu;
