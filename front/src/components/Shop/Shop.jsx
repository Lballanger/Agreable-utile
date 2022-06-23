import "./Shop.scss";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { setArticlesData } from "../../slices/articlesSlice";
import API from "../../api/api";

import headerPicture from "../../assets/img/shop/header.jpg";

function Shop() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articlesSlice.articles);

  useEffect(async () => {
    if (!articles) {
      const data = await API.getAllArticles();
      dispatch(setArticlesData(data));
    }
  }, []);

  return (
    <div className="shop">
      <div className="shop__title-container">
        <h2 className="shop__title-container__title">Boutique</h2>
        <div className="shop__title-container__img-container">
          <img
            className="shop__title-container__img-container__img"
            src={headerPicture}
            alt=""
          />
        </div>
      </div>
      <div className="shop__main-container">
        {articles && Object.keys(articles).length > 0
          ? articles.map((article) => (
              <div key={article.id} className="shop__main-container__product">
                <Link to={`/shop/${article.id}`}>
                  <div className="shop__main-container__product__img-container">
                    <img
                      src={`/src/assets/img/shop/articles/${article.image}`}
                      alt=""
                      className="shop__main-container__product__img-container__img"
                    />
                  </div>
                </Link>
                <Link to={`/shop/${article.id}`}>
                  <div className="shop__main-container__product__infos-container">
                    <h2 className="shop__main-container__product__infos-container__infos">
                      <div className="shop__main-container__product__infos-container__infos__title">
                        {article.name}
                      </div>
                      <div className="shop__main-container__product__infos-container__infos__description">
                        {article.description}
                      </div>
                    </h2>
                    <div className="shop__main-container__product__infos-container__price">
                      {article.price_wt}
                    </div>
                  </div>
                </Link>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default Shop;
