import "./Detail.scss";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import API from "../../../api/api";
import { setArticlesData, addToCart } from "../../../slices/articlesSlice";

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  let article = useSelector((state) => state.articlesSlice.articles);

  useEffect(async () => {
    if (!article) {
      const data = await API.getAllArticles();
      dispatch(setArticlesData(data));
    }
  }, []);

  const handleClick = async () => {
    const data = await API.getArticle(id);
    dispatch(addToCart(data));
  };

  if (article) article = article.find((elem) => elem.id === parseInt(id, 10));

  return (
    <main className="detail">
      {article ? (
        <>
          <div className="detail__pictures-container">
            <div className="detail__pictures-container__image-container">
              <img
                className="detail__pictures-container__image-container__image"
                src={`/src/assets/img/shop/articles/${article.image}`}
                alt=""
                srcSet=""
              />
            </div>
            <div className="detail__pictures-container__image-container">
              <img
                className="detail__pictures-container__image-container__image"
                src={`/src/assets/img/shop/articles/${article.image}`}
                alt=""
                srcSet=""
              />
            </div>
          </div>
          <div className="detail__container">
            <div className="detail__container__info">
              <header className="detail__container__info__header">
                <h2 className="detail__container__info__header__title">
                  Titre réalisation
                </h2>
              </header>
              <div className="detail__container__info__description">
                <p>{article.description}</p>
              </div>
              <div className="detail__container__info__composition">
                <ul className="detail__container__info__composition__list">
                  <li className="detail__container__info__composition__list__item">
                    <span className="detail__container__info__composition__list__item__categorie">
                      Composition:
                    </span>{" "}
                    100% coton
                  </li>
                  <li className="detail__container__info__composition__list__item">
                    <span className="detail__container__info__composition__list__item__categorie">
                      Matière:
                    </span>{" "}
                    Jersey
                  </li>
                  <li className="detail__container__info__composition__list__item">
                    <span className="detail__container__info__composition__list__item__categorie">
                      Conseils d entretien:
                    </span>{" "}
                    Lavage en machine à 30°C
                  </li>
                </ul>
              </div>
              <div className="detail__container__info__add-container">
                <button
                  className="detail__container__info__add-container__button"
                  type="button"
                  onClick={handleClick}
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </main>
  );
}

export default Detail;
