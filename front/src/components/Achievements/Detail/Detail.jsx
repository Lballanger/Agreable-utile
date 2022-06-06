import "./Detail.scss";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import API from "../../../api/api";
import { setArticlesData } from "../../../slices/articlesSlice";

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

  if (article) article = article.find((elem) => elem.id === parseInt(id, 10));
  console.log(article);
  return (
    <main className="detail">
      {article ? (
        <>
          <div className="detail__pictures-container">
            <div className="detail__pictures-container__image-container">
              <img
                className="detail__pictures-container__image-container__image"
                src={article.image}
                alt=""
                srcSet=""
              />
            </div>
            <div className="detail__pictures-container__image-container">
              <img
                className="detail__pictures-container__image-container__image"
                src={article.image}
                alt=""
                srcSet=""
              />
            </div>
          </div>
          <div className="detail__info-container">
            <header className="detail__info-container__header">
              <h2 className="detail__info-container__header__title">
                Titre réalisation
              </h2>
            </header>
            <div className="detail__info-container__description">
              <p>{article.description}</p>
            </div>
            <div className="detail__info-container__composition">
              <ul className="detail__info-container__composition__list">
                <li className="detail__info-container__composition__list__item">
                  <span className="detail__info-container__composition__list__item__categorie">
                    Composition:
                  </span>{" "}
                  100% coton
                </li>
                <li className="detail__info-container__composition__list__item">
                  <span className="detail__info-container__composition__list__item__categorie">
                    Matière:
                  </span>{" "}
                  Jersey
                </li>
                <li className="detail__info-container__composition__list__item">
                  <span className="detail__info-container__composition__list__item__categorie">
                    Conseils d entretien:
                  </span>{" "}
                  Lavage en machine à 30°C
                </li>
              </ul>
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
