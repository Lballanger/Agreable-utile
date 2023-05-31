import { Link } from "react-router-dom";

import bathroom from "../../../assets/img/salledebain.webp";
import kitchen from "../../../assets/img/kitchen.webp";
import salon from "../../../assets/img/salon.webp";
import Arrow from "../../../assets/icons/Arrow";

import Slideshow from "../../../components/SlideShow";

import useWindowSize from "../../../hooks/useWindowSize";

function CategoriesPresentation() {
  const { isMobile } = useWindowSize();

  const categories = [
    {
      id: 1,
      img: bathroom,
      title: "Salle de bain",
      link: "/shop",
    },
    {
      id: 2,
      img: kitchen,
      title: "Cuisine",
      link: "/shop",
    },
    {
      id: 3,
      img: salon,
      title: "Salon",
      link: "/shop",
    },
  ];

  return (
    <div className="main__categories">
      <h2>Découvrez les principales catégories de produits</h2>
      <div className="main__categories__container">
        <Slideshow
          slidesToScroll={1}
          slidesToShow={isMobile ? 1 : 2}
          infinite
          easing="linear"
          duration={0}
          transitionDuration={isMobile ? 8000 : 9000}
          pauseOnHover
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="main__categories__container__category"
            >
              <div className="main__categories__container__category__img-container">
                <img
                  className="main__categories__container__category__img-container__img"
                  src={category.img}
                  alt=""
                />
                <Link
                  className="main__categories__container__category__img-container__content"
                  to={category.link}
                >
                  {category.title}
                </Link>
              </div>
            </div>
          ))}
        </Slideshow>
      </div>
    </div>
  );
}

export default CategoriesPresentation;
