import { Link } from "react-router-dom";

import summaryProduct from "../../../assets/img/summary-product1.jpg";
import product3 from "../../../assets/img/shop/articles/product6.jpg";
import product4 from "../../../assets/img/shop/articles/product1.jpg";
import summaryProduct3 from "../../../assets/img/summary-product4.jpg";
import Arrow from "../../../assets/icons/Arrow";

function ShopPresentation() {
  return (
    <div className="main__shop-presentation">
      <div className="main__shop-presentation__container">
        <div className="main__shop-presentation__container__description-container">
          <div className="main__shop-presentation__container__description-container__description">
            <h1 className="main__shop-presentation__container__description-container__description__title-container">
              L&#8217;agréable Utile
            </h1>
            <div className="main__shop-presentation__container__description-container__description__content">
              <p className="main__shop-presentation__container__description-container__description__content__paragraph">
                Retrouvez des produits réalisé par moi même, chaque pièce est
                unique et responsable de l&#8217;environnement et made in
                france. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eos sit iste, aliquid aut assumenda perferendis sequi obcaecati
                magnam autem nam ducimus blanditiis ab eligendi repellat nobis
                velit, voluptatem fugiat nemo. Repellat architecto illo deserunt
                eligendi, veniam, amet ex possimus sit corporis similique
                inventore atque alias numquam tempore sunt ad quidem autem
                praesentium cumque molestiae quam, hic suscipit explicabo.
                Consequuntur, accusamus?
                {/* Vous pouvez retrouver tout mes produits dans ma boutique. */}
              </p>
            </div>
            <div className="main__shop-presentation__container__description-container__description__link-container">
              <Link
                className="main__shop-presentation__container__description-container__description__link-container__link"
                to="/shop"
              >
                Visiter la boutique
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
        <div className="main__shop-presentation__container__product-container">
          <div className="main__shop-presentation__container__product-container__article">
            <div className="main__shop-presentation__container__product-container__article__img-container">
              <img
                className="main__shop-presentation__container__product-container__article__img-container__img"
                src={summaryProduct3}
                alt=""
              />
            </div>
          </div>
          <div className="main__shop-presentation__container__product-container__article">
            <div className="main__shop-presentation__container__product-container__article__img-container">
              <img
                className="main__shop-presentation__container__product-container__article__img-container__img"
                src={summaryProduct}
                alt=""
              />
            </div>
          </div>
          <div className="main__shop-presentation__container__product-container__article">
            <div className="main__shop-presentation__container__product-container__article__img-container">
              <img
                className="main__shop-presentation__container__product-container__article__img-container__img"
                src={product4}
                alt=""
              />
            </div>
          </div>
          <div className="main__shop-presentation__container__product-container__article">
            <div className="main__shop-presentation__container__product-container__article__img-container">
              <img
                className="main__shop-presentation__container__product-container__article__img-container__img"
                src={product3}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopPresentation;
