import "./Shop.scss";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchArticles, fetchCategories } from "../../slices/articlesSlice";

import loader from "../../assets/img/loader.svg";

import dynamicUrl from "../../utils/viteURL";

function Shop() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articlesSlice.articles);
  const categories = useSelector((state) => state.articlesSlice.categories);
  const isLoading = useSelector((state) => state.articlesSlice.loading);

  const [categorySelected, setCategorySelected] = useState("");

  useEffect(() => {
    if (!articles) {
      dispatch(fetchArticles());
    }
  }, [articles]);

  useEffect(() => {
    if (!categories) {
      dispatch(fetchCategories());
    }
  }, [categories]);

  return (
    <div className="shop">
      {isLoading ? (
        <div className="shop__loader-container">
          <img
            className="shop__loader-container__loader"
            src={loader}
            alt="loader"
          />
        </div>
      ) : (
        <>
          <div className="shop__category-container">
            <h3 className="shop__category-container__title">Categorie</h3>
            <ul className="shop__category-container__list">
              {categories && Object.keys(categories).length > 0
                ? categories.map((category) => (
                    <li
                      key={category.name}
                      className="shop__category-container__list__link-container"
                    >
                      <input
                        className="shop__category-container__list__link-container__input"
                        type="checkbox"
                        name={category.name}
                        id={category.name}
                        checked={categorySelected === category.name}
                        onChange={() =>
                          setCategorySelected(
                            categorySelected === category.name
                              ? ""
                              : category.name,
                          )
                        }
                      />
                      <label htmlFor={category.name}> {category.name}</label>
                    </li>
                  ))
                : " "}
            </ul>
          </div>
          <div className="shop__articles-container">
            <div className="shop__articles-container__main-container">
              {articles && Object.keys(articles).length > 0
                ? articles
                    .filter((article) => {
                      if (categorySelected) {
                        return article.category_name === categorySelected;
                      }
                      return article;
                    })
                    .map((article) => (
                      <div
                        key={article.article_id}
                        className="shop__articles-container__main-container__product"
                      >
                        <Link to={`/shop/${article.article_id}`}>
                          <div className="shop__articles-container__main-container__product__img-container">
                            <img
                              src={dynamicUrl(
                                `img/shop/articles/${article.image[0]}`,
                              )}
                              alt=""
                              className="shop__articles-container__main-container__product__img-container__img"
                            />
                          </div>
                        </Link>
                        <Link to={`/shop/${article.article_id}`}>
                          <div className="shop__articles-container__main-container__product__infos-container">
                            <h2 className="shop__articles-container__main-container__product__infos-container__infos">
                              <div className="shop__articles-container__main-container__product__infos-container__infos__title">
                                {article.article_name}
                              </div>
                              <div className="shop__articles-container__main-container__product__infos-container__infos__description">
                                {article.description.length > 80
                                  ? `${article.description.slice(0, 80)}...`
                                  : article.description}
                              </div>
                            </h2>
                            <div className="shop__articles-container__main-container__product__infos-container__price">
                              {article.price_wt} €
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                : ""}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Shop;
