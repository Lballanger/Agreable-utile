import "./Achievements.scss";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { setArticlesData } from "../../../slices/articlesSlice";
import API from "../../../api/api";

function Achievements() {
  const dispatch = useDispatch();

  const articles = useSelector((state) => state.articlesSlice.articles);

  useEffect(async () => {
    const data = await API.getAllArticles();
    dispatch(setArticlesData(data));
  }, []);

  return (
    <main className="achievements">
      <div className="achievements__header">
        <h2 className="achievements__header__title">Mes réalisations</h2>
        <div className="achievements__header__inputs">
          <label htmlFor="bain">Linge de bain</label>
          <input type="checkbox" name="categories" id="bain" />
          <label htmlFor="maison">Linge de maison</label>
          <input type="checkbox" name="categories" id="maison" />
        </div>
      </div>
      <div className="achievements__container">
        {articles
          ? articles.map((article) => (
              <div
                className="achievements__container__product"
                key={article.id}
              >
                <div className="achievements__container__product__image-container">
                  <Link to={`/achievements/${article.id}`}>
                    <img
                      className="achievements__container__product__image-container__image"
                      src={article.image}
                      alt=""
                    />
                  </Link>
                </div>
                <h2 className="achievements__container__product__title">
                  <Link to={`/achievements/${article.id}`}>{article.name}</Link>
                </h2>
                <div className="achievements__container__product__content">
                  <p className="achievements__container__product__content__description">
                    <Link to={`/achievements/${article.id}`}>
                      {article.description}
                    </Link>
                  </p>
                </div>
              </div>
            ))
          : "Pas de réalisation disponible"}
      </div>
    </main>
  );
}

export default Achievements;
