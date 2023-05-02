import { Link } from "react-router-dom";
import Arrow from "../../../assets/icons/Arrow";
import sewing from "../../../assets/img/sewing.webp";

function SewingPresentation() {
  return (
    <div className="main__services__sewing">
      <div className="main__services__sewing__sewing-container">
        <div className="main__services__sewing__sewing-container__img-container">
          <img
            className="main__services__sewing__sewing-container__img-container__img"
            src={sewing}
            alt=""
          />
        </div>
        <div className="main__services__sewing__sewing-container__content-container">
          <div className="main__services__sewing__sewing-container__content-container__description">
            <h2>
              Apprendre la couture,
              <br />
              ça vous dit ?
            </h2>
            <p className="main__services__sewing__sewing-container__content-container__description__content">
              Venez découvrir les secrets du faire soi-même par la couture sur
              machine à coudre.
              <br />
              Vous aurez l'occasion de découvrir les bases, de vous
              perfectionner et de créer votre propre accessoires.
              <br />
              Que vous soyez adulte ou enfant (à partir de 7 ans), tout le monde
              est le bienvenu.
              <br />
              Les ateliers sont proposés les mercredis et samedis sur
              rendez-vous au 06.61.76.76.39.
              <br />
              Pendant les vacances scolaires, des créneaux supplémentaires sont
              dispensés tous les après-midis.
              <br />
              Vous voulez faire une soirée entre filles ou un duo mère-fille,
              c'est ici que ça se passe.
              <br />
              Ou bien alors, faire un cadeau original.
              <br />
              Vous allez pouvoir booster votre créativité.
              <br />
              Quoi de mieux que de joindre l'utile à l'agréable ?
              <br />
              Bonne humeur garantie et encadrement expérimenté.
              <br />
              Moment d'apprentissage et de partage.
              <br />
              Pour en savoir plus sur les conditions de participation et
              tarifaires, je vous invite à me contacter au 06.61.76.76.39.
              <br />
              Cartes cadeaux disponibles sur demande.
              <br />
              Places limités à 4 participants maximum par atelier.
              <br />
              Réservez votre créneau sans plus tarder !
            </p>
            <div className="main__services__sewing__sewing-container__content-container__description__link-container">
              <Link
                className="main__services__sewing__sewing-container__content-container__description__link-container__link"
                to="/sewing"
              >
                En savoir plus
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SewingPresentation;
