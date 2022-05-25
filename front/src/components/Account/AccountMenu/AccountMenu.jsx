import PropTypes from "prop-types";

import { Link } from "react-router-dom";

function AccountMenu({ userData }) {
  return (
    <div className="account__left-container">
      <div className="account__left-container__user-info">
        <div className="account__left-container__user-info__img-container">
          <img
            src={`https://ui-avatars.com/api/?name=${userData.firstname}+${userData.lastname}&background=F987A8&color=fff&rounded=true&size=95&font-size=0.33`}
            alt="avatar"
          />
          <div className="account__left-container__user-info__title">
            <h2>
              Bonjour{" "}
              <span className="account__left-container__user-info__title__strong">
                {userData.firstname} {userData.lastname}
              </span>{" "}
              !
            </h2>
          </div>
        </div>
      </div>
      <div className="account__left-container__navigation">
        <ul className="account__left-container__navigation__navigation-container">
          <li className="account__left-container__navigation__navigation-container__item">
            <Link to={`/account/${userData.id}/profil`}>
              Mes informations personnelles
            </Link>
          </li>
          <li className="account__left-container__navigation__navigation-container__item">
            <Link to={`/account/${userData.id}/orders`}>Mes commandes</Link>
          </li>
          <li className="account__left-container__navigation__navigation-container__item">
            <Link to="/contact">Une question ?</Link>
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
