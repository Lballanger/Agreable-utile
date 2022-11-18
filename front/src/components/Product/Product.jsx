import "./Product.scss";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import API from "../../api/api";
import {
  setArticlesData,
  addToCart,
  changeTheCartQuantity,
} from "../../slices/articlesSlice";

import arrow from "../../assets/img/arrow.svg";
import dynamicUrl from "../../utils/viteURL";

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  let article = useSelector((state) => state.articlesSlice.articles);

  const [imgLength, setImgLength] = useState(article?.image?.length || 0);
  const [imgSelected, setImgSelected] = useState(0);
  const [topButtonStatus, setTopButtonStatus] = useState(false);
  const [bottomButtonStatus, setBottomButtonStatus] = useState(true);
  const [loaded, setLoaded] = useState(true);

  const [quantity, setQuantity] = useState(1);

  // Retrieve the item if not already in the store
  useEffect(async () => {
    if (!article) {
      // TODO : Changer la méthode pour récupérer uniquement un article avec le paramètre url
      const data = await API.getAllArticles();
      dispatch(setArticlesData(data));
    }
  }, []);

  // Knowing the number of images
  useEffect(() => {
    // Connaitre la longueur du tableau d'images
    if (article?.image) {
      setImgLength(article.image.length);
    }
  }, [article]);

  // Button carrousels
  useEffect(() => {
    // Bottom button
    if (imgSelected + 1 === imgLength) setBottomButtonStatus(false);
    if (imgSelected + 1 < imgLength && imgSelected >= 0) {
      setBottomButtonStatus(true);
    }
    if (imgSelected + 1 === imgLength) setBottomButtonStatus(false);

    // Top button
    if (imgSelected === 0) setTopButtonStatus(false);
    if (imgSelected + 1 <= imgLength && imgSelected > 0) {
      setTopButtonStatus(true);
    }
  }, [imgSelected, imgLength]);

  const handleClick = async () => {
    const data = await API.getArticle(id);
    const payload = {
      ...data,
      quantity,
    };
    dispatch(addToCart(payload));
  };

  const handleChange = (id, e) => {
    setQuantity(e.target.value);
    dispatch(changeTheCartQuantity({ id, value: e.target.value }));
  };

  const nextImage = () => {
    if (imgSelected + 1 < imgLength) setImgSelected(imgSelected + 1);
  };

  const previousImage = () => {
    if (imgSelected > 0) setImgSelected(imgSelected - 1);
  };

  const selectImage = (index) => {
    setImgSelected(index);
  };

  if (article)
    article = article.find((elem) => elem.article_id === parseInt(id, 10));

  return (
    <main className="detail">
      {article ? (
        <>
          <div className="detail__pictures-container">
            <div className="detail__pictures-container__list-container">
              <div className="detail__pictures-container__list-container__top-button">
                <button
                  className="detail__pictures-container__list-container__top-button__button"
                  type="button"
                  onClick={() => previousImage()}
                >
                  <img
                    className={
                      topButtonStatus
                        ? "detail__pictures-container__list-container__top-button__button__img"
                        : "detail__pictures-container__list-container__top-button__button__img--disabled"
                    }
                    src={arrow}
                    alt=""
                  />
                </button>
              </div>
              <div className="detail__pictures-container__list-container__container">
                {article.image.length
                  ? article.image.map((img, index) => {
                      if (
                        (imgLength > 2 &&
                          index <= imgSelected + 2 &&
                          imgSelected === 0) ||
                        (imgLength > 2 &&
                          index <= imgSelected + 1 &&
                          index >= imgSelected - 1 &&
                          imgSelected >= 1) ||
                        (imgLength > 2 &&
                          index >= imgSelected - 2 &&
                          imgSelected + 1 === imgLength) ||
                        (imgLength <= 2 &&
                          index <= imgSelected + 1 &&
                          index >= imgSelected - 1)
                      ) {
                        return (
                          <div
                            className="detail__pictures-container__list-container__container__img-container"
                            onClick={() => selectImage(index)}
                            aria-hidden
                            key={img}
                          >
                            <img
                              className={
                                imgSelected !== index
                                  ? "detail__pictures-container__list-container__container__img-container__img"
                                  : "detail__pictures-container__list-container__container__img-container__img--selected"
                              }
                              src={
                                import.meta.env.VITE_NODE_ENV !== "production"
                                  ? `/src/assets/img/shop/articles/${article.image[index]}`
                                  : dynamicUrl(article.image[index])
                              }
                              alt=""
                              onLoad={() => setLoaded(true)}
                              style={loaded ? {} : { display: "none" }}
                            />
                          </div>
                        );
                      }
                      return "";
                    })
                  : " "}
              </div>
              <div className="detail__pictures-container__list-container__bottom-button">
                <button
                  className="detail__pictures-container__list-container__bottom-button__button"
                  type="button"
                  onClick={() => nextImage()}
                >
                  <img
                    className={
                      bottomButtonStatus
                        ? "detail__pictures-container__list-container__bottom-button__button__img"
                        : "detail__pictures-container__list-container__bottom-button__button__img--disabled"
                    }
                    src={arrow}
                    alt=""
                  />
                </button>
              </div>
            </div>
            <div className="detail__pictures-container__image-container">
              <img
                className="detail__pictures-container__image-container__image"
                src={
                  import.meta.env.VITE_NODE_ENV !== "production"
                    ? `/src/assets/img/shop/articles/${article.image[imgSelected]}`
                    : dynamicUrl(article.image[imgSelected])
                }
                alt=""
                srcSet=""
              />
            </div>
          </div>
          <div className="detail__container">
            <div className="detail__container__info">
              <header className="detail__container__info__header">
                <h2 className="detail__container__info__header__title">
                  {article.article_name}
                </h2>
                <div className="detail__container__info__header__price">
                  {article.price_wt} €
                </div>
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
                <div className="detail__container__info__add-container__change-quantity">
                  <button
                    className="detail__container__info__add-container__change-quantity__dec-button"
                    type="button"
                    onClick={() => setQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    className="detail__container__info__add-container__change-quantity__input"
                    type="text"
                    value={quantity}
                    onChange={(e) => handleChange(article.id, e)}
                  />
                  <button
                    className="detail__container__info__add-container__change-quantity__inc-button"
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="detail__container__info__add-container__add-to-cart">
                  <button
                    className="detail__container__info__add-container__add-to-cart__button"
                    type="button"
                    onClick={handleClick}
                  >
                    Ajouter au panier
                  </button>
                </div>
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
