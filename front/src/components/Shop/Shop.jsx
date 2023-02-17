import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

// Cloudinary
import {
  AdvancedImage,
  lazyload,
  responsive,
  placeholder,
} from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import cloudinary from "../../lib/cloudinary";

import { fetchArticles, fetchCategories } from "../../slices/articlesSlice";

import Breadcrumb from "../Shared/Breadcrumb/Breadcrumb";

import loader from "../../assets/img/loader.svg";

function Shop() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articlesSlice.articles);
  const categories = useSelector((state) => state.articlesSlice.categories);
  const isLoading = useSelector((state) => state.articlesSlice.loading);

  const [selectedCategories, setSelectedCategories] = useState([]);

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

  function handleCategoryChange(event) {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== value));
    }
  }

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
          <Breadcrumb />
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
                        value={category.name}
                        id={category.name}
                        checked={selectedCategories.includes(category.name)}
                        onChange={handleCategoryChange}
                      />
                      <label
                        className="shop__category-container__list__link-container__label"
                        htmlFor={category.name}
                      >
                        {" "}
                        {category.name}
                      </label>
                    </li>
                  ))
                : ""}
            </ul>
          </div>
          <div className="shop__articles-container">
            <div className="shop__articles-container__main-container">
              {articles && Object.keys(articles).length > 0
                ? articles
                    .filter((article) => {
                      if (selectedCategories.includes(article.category_name)) {
                        return article;
                      }
                      if (selectedCategories.length === 0) {
                        return article;
                      }
                    })
                    .map((article) => (
                      <div
                        key={article.article_id}
                        className="shop__articles-container__main-container__product"
                      >
                        <Link to={`/shop/${article.id}`}>
                          <div className="shop__articles-container__main-container__product__img-container">
                            <AdvancedImage
                              style={{
                                width: "100%",
                                height: "300px",
                                objectFit: "cover",
                              }}
                              cldImg={cloudinary
                                .image(article.image[0])
                                .resize(fill())}
                              plugins={[
                                responsive({ steps: 700 }),
                                lazyload(),
                                placeholder("blur"),
                              ]}
                            />
                          </div>
                        </Link>
                        <Link to={`/shop/${article.id}`}>
                          <div className="shop__articles-container__main-container__product__infos-container">
                            <h3>{article.name}</h3>
                            <div>
                              {article.description.length > 80
                                ? `${article.description.slice(0, 80)}...`
                                : article.description}
                            </div>
                            <div>{article.price_wt} €</div>
                          </div>
                        </Link>
                      </div>
                    ))
                : "Une erreur est survenue. Veuillez nous excuser pour la gêne occasionnée."}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Shop;
