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

import Breadcrumb from "../../components/Breadcrumb";
import Loader from "../../components/Loader";
import Input from "../../components/Input";

function Shop() {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector(
    (state) => state.articlesSlice,
  );
  const { categories } = useSelector((state) => state.articlesSlice);

  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (!articles.length) {
      dispatch(fetchArticles());
    }
  }, [articles]);

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [categories]);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== value));
    }
  };

  return (
    <div className="shop">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumb />
          <div className="shop__category-container">
            <h3 className="shop__category-container__title">Categorie</h3>
            <ul className="shop__category-container__list">
              {categories?.map((category) => (
                <li
                  key={category.id}
                  className="shop__category-container__list__link-container"
                >
                  <Input
                    type="checkbox"
                    value={category.name}
                    id={category.name}
                    htmlFor={category.name}
                    checked={selectedCategories.includes(category.name)}
                    onChange={handleCategoryChange}
                    placeholder={category.name}
                    inputClassName="shop__category-container__list__link-container__input"
                    labelClassName="shop__category-container__list__link-container__label"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="shop__articles-container">
            <div className="shop__articles-container__main-container">
              {articles.length > 0 ? (
                articles
                  ?.filter((article) => {
                    if (selectedCategories.includes(article.category_name)) {
                      return article;
                    }
                    if (selectedCategories.length === 0) {
                      return article;
                    }
                    return "";
                  })
                  .map((article) => (
                    <div
                      key={article.id}
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
                              responsive({ steps: 370 }),
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
              ) : (
                <h3>Aucun article de disponible pour le moment.</h3>
              )}
              {error && (
                <div>Veuillez nous excuser une erreur est survenue.</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Shop;
