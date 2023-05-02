import { Link } from "react-router-dom";

import bathroom from "../../../assets/img/salledebain.webp";
import kitchen from "../../../assets/img/kitchen.webp";
import salon from "../../../assets/img/salon.webp";
import Arrow from "../../../assets/icons/Arrow";

function CategoriesPresentation() {
  return (
    <div className="main__categories">
      <h2>Découvrez les principales catégories de produits</h2>
      <div className="main__categories__container">
        <div className="main__categories__container__category">
          <div className="main__categories__container__category__img-container">
            <img
              className="main__categories__container__category__img-container__img"
              src={bathroom}
              alt=""
            />
            <Link
              className="main__categories__container__category__img-container__content"
              to="/shop"
            >
              Salle de bain
            </Link>
          </div>
        </div>

        <div className="main__categories__container__category">
          <div className="main__categories__container__category__img-container">
            <img
              className="main__categories__container__category__img-container__img"
              src={kitchen}
              alt=""
            />
            <Link
              className="main__categories__container__category__img-container__content"
              to="/shop"
            >
              Cuisine
            </Link>
          </div>
        </div>

        <div className="main__categories__container__category">
          <div className="main__categories__container__category__img-container">
            <img
              className="main__categories__container__category__img-container__img"
              src={salon}
              alt=""
            />
            <Link
              className="main__categories__container__category__img-container__content"
              to="/shop"
            >
              Salon
            </Link>
          </div>
        </div>
      </div>
      <div className="main__categories__link-container">
        <Link className="main__categories__link-container__link" to="/shop">
          Voir toutes les catégories
          <Arrow />
        </Link>
      </div>
    </div>
  );
}

export default CategoriesPresentation;
