import "./Profil.scss";
import { useSelector } from "react-redux";

function Profil() {
  const data = useSelector((state) => state.userSlice.user);
  const date = new Date(data.date_of_birth).toLocaleDateString("fr");
  return (
    <div className="profil">
      <h2 className="profil__title">Mes informations personnelles</h2>
      <div className="profil__container">
        <div className="profil__container__content-container">
          <p className="profil__container__content-container__title">
            <span>Civilité</span>
          </p>
          <p className="profil__container__content-container__content">
            <span>{data.civility}</span>
          </p>
        </div>
        <div className="profil__container__content-container">
          <p className="profil__container__content-container__title">
            <span>Prénom</span>
          </p>
          <p className="profil__container__content-container__content">
            <span>{data.firstname}</span>
          </p>
        </div>
        <div className="profil__container__content-container">
          <p className="profil__container__content-container__title">
            <span>Nom</span>
          </p>
          <p className="profil__container__content-container__content">
            <span>{data.lastname}</span>
          </p>
        </div>
        <div className="profil__container__content-container">
          <p className="profil__container__content-container__title">
            <span>Date de naissance</span>
          </p>
          <p className="profil__container__content-container__content">
            <span>{date}</span>
          </p>
        </div>
        <div className="profil__container__content-container">
          <p className="profil__container__content-container__title">
            <span>Ville</span>
          </p>
          <p className="profil__container__content-container__content">
            <span>{data.city}</span>
          </p>
        </div>
        <div className="profil__container__content-container">
          <p className="profil__container__content-container__title">
            <span>Code postal</span>
          </p>
          <p className="profil__container__content-container__content">
            <span>{data.postal_code}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profil;
