import "./Homepage.scss";

import { Link } from "react-router-dom";

import sandrine from "../../assets/img/sandrine2.svg";
import summaryProduct from "../../assets/img/summary-product1.jpg";
import product3 from "../../assets/img/shop/articles/product6.jpg";
import product4 from "../../assets/img/shop/articles/product1.jpg";
import summaryProduct3 from "../../assets/img/summary-product4.jpg";
import couture from "../../assets/img/couture2.jpg";

function Homepage() {
  return (
    <main className="main">
      <div className="main__presentation">
        <div className="main__presentation__content-container ">
          <div className="main__presentation__content-container__content">
            <h5 className="main__presentation__content-container__content__title">
              L'agréable Utile
            </h5>
            <div className="main__presentation__content-container__content__presentation-container">
              <p className="main__presentation__content-container__content__presentation-container__content">
                Je suis Sandrine une passionnée par l&#8217;art de vivre.
              </p>
              <br />
              <p className="main__presentation__content-container__content__presentation-container__content">
                Je conçois et fabrique dans mon atelier à Thorigny-sur-Marne, en
                pièce unique, des accessoires textiles pour l&#8217;univers de
                la petite enfance, les plaisirs de la maison, la beauté et le
                bien-être ainsi que la mode pour les hommes et les femmes. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Optio
                recusandae dolor veritatis possimus laudantium, voluptate sunt
                enim inventore quidem quas voluptates error! Ex atque rem
                delectus? Quibusdam quisquam a eaque. Debitis maiores nulla
                exercitationem consectetur dolores nesciunt cum nemo cumque
                molestias dolore harum natus, dolorum, possimus obcaecati
              </p>
            </div>
          </div>
          <div className="main__presentation__content-container__image-container">
            <img
              className="main__presentation__content-container__image-container__img"
              src={sandrine}
              alt="sandrine"
            />
          </div>
        </div>
      </div>

      <div className="main__shop-presentation">
        <div className="main__shop-presentation__container">
          <div className="main__shop-presentation__container__description-container">
            <div className="main__shop-presentation__container__description-container__description">
              <div className="main__shop-presentation__container__description-container__description__title-container">
                <h3 className="main__shop-presentation__container__description-container__description__title-container__title">
                  La boutique de l&#8217;utile
                </h3>
              </div>
              <div className="main__shop-presentation__container__description-container__description__content">
                <p className="main__shop-presentation__container__description-container__description__content__paragraph">
                  Retrouvez des produits réalisé par moi même, chaque pièce est
                  unique et responsable de l&#8217;environnement et made in
                  france. Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Eos sit iste, aliquid aut assumenda perferendis sequi
                  obcaecati magnam autem nam ducimus blanditiis ab eligendi
                  repellat nobis velit, voluptatem fugiat nemo. Repellat
                  architecto illo deserunt eligendi, veniam, amet ex possimus
                  sit corporis similique inventore atque alias numquam tempore
                  sunt ad quidem autem praesentium cumque molestiae quam, hic
                  suscipit explicabo. Consequuntur, accusamus?
                  {/* Vous pouvez retrouver tout mes produits dans ma boutique. */}
                </p>
              </div>
              <div className="main__shop-presentation__container__description-container__description__link-container">
                <Link
                  className="main__shop-presentation__container__description-container__description__link-container__link"
                  to="/shop"
                >
                  Visiter la boutique
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

      <div className="main__sewing">
        <h3 className="main__sewing__title">
          Apprendre la couture, ça vous dit ?
        </h3>
        <div className="main__sewing__sewing-container">
          <div className="main__sewing__sewing-container__img-container">
            <img
              className="main__sewing__sewing-container__img-container__img"
              src={couture}
              alt=""
            />
          </div>
          <div className="main__sewing__sewing-container__content-container">
            <div className="main__sewing__sewing-container__content-container__description">
              <p className="main__sewing__sewing-container__content-container__description__paragraph">
                Je vous propose des ateliers de couture sur machine à coudre
                pour enfants, ados et adultes (à partir de 7 ans). C&#8217;est à
                Thorigny ! Vous allez pouvoir booster votre créativité.
              </p>
              <br />
              <p className="main__sewing__sewing-container__content-container__description__paragraph">
                Pour en savoir plus sur les conditions de participation et
                tarifaires mais aussi pour vous inscrire, je vous invite à me
                contacter au 06.61.76.76.39
              </p>
              <br />
              <p className="main__sewing__sewing-container__content-container__description__paragraph">
                Cartes cadeaux disponibles sur demande.
              </p>
              <br />
              <p className="main__sewing__sewing-container__content-container__description__paragraph">
                Places limités à 4 participants maximum par atelier.{" "}
              </p>
              <br />
              <p className="main__sewing__sewing-container__content-container__description__paragraph">
                Réservez votre créneau sans plus tarder !{" "}
              </p>
              <br />
              <p className="main__sewing__sewing-container__content-container__description__paragraph">
                Gel hydroalcoolique fourni.
              </p>
              <br />
              <p className="main__sewing__sewing-container__content-container__description__paragraph">
                Désinfection après chaque atelier.
              </p>
            </div>
            <div className="main__sewing__sewing-container__content-container__link-container">
              <Link
                className="main__sewing__sewing-container__content-container__link-container__link"
                to="/shop"
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Homepage;
