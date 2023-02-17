import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import summaryProduct from "../../assets/img/summary-product1.jpg";
import product3 from "../../assets/img/shop/articles/product6.jpg";
import product4 from "../../assets/img/shop/articles/product1.jpg";
import summaryProduct3 from "../../assets/img/summary-product4.jpg";
import sewing from "../../assets/img/sewing.jpg";
import bathroom from "../../assets/img/salledebain.webp";
import kitchen from "../../assets/img/cuisine.jpg";
import salon from "../../assets/img/salon.jpg";
import market from "../../assets/img/market.jpg";

import broderie1 from "../../assets/img/broderie1.jpg";
import broderie2 from "../../assets/img/broderie2.jpg";
import broderie3 from "../../assets/img/broderie3.jpg";
import broderie4 from "../../assets/img/broderie4.jpg";
import broderie5 from "../../assets/img/broderie5.jpg";
import broderie6 from "../../assets/img/broderie6.jpg";
import broderie7 from "../../assets/img/broderie7.jpg";

const images = [
  broderie1,
  broderie2,
  broderie3,
  broderie4,
  broderie5,
  broderie6,
  broderie7,
];

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "340px",
  margin: "0 1rem",
};

function Homepage() {
  return (
    <main className="main">
      {/* <div className="main__presentation">
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
      </div> */}

      <div className="main__shop-presentation">
        <div className="main__shop-presentation__container">
          <div className="main__shop-presentation__container__description-container">
            <div className="main__shop-presentation__container__description-container__description">
              <div className="main__shop-presentation__container__description-container__description__title-container">
                <h1>L&#8217;agréable Utile</h1>
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
                  Visiter la boutique{" "}
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

      <div className="main__categories">
        <h2>Découvrez les principales catégories de produits</h2>
        <div className="main__categories__container">
          <div className="main__categories__container__category">
            <div className="main__categories__container__category__img-container">
              <img
                className="main__categories__container__category__img-container__img"
                src={bathroom}
                alt=""
              />
              <Link
                className="main__categories__container__category__img-container__content"
                to="/shop"
              >
                Salle de bain
              </Link>
            </div>
          </div>

          <div className="main__categories__container__category">
            <div className="main__categories__container__category__img-container">
              <img
                className="main__categories__container__category__img-container__img"
                src={kitchen}
                alt=""
              />
              <Link
                className="main__categories__container__category__img-container__content"
                to="/shop"
              >
                Cuisine
              </Link>
            </div>
          </div>

          <div className="main__categories__container__category">
            <div className="main__categories__container__category__img-container">
              <img
                className="main__categories__container__category__img-container__img"
                src={salon}
                alt=""
              />
              <Link
                className="main__categories__container__category__img-container__content"
                to="/shop"
              >
                Salon
              </Link>
            </div>
          </div>
        </div>
        <div className="main__categories__link-container">
          <Link className="main__categories__link-container__link" to="/shop">
            Voir toutes les catégories{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4Z"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className="main__services">
        <div className="main__services__story">
          <div className="main__services__story__container">
            <p className="main__services__story__container__content">
              <strong>L&#8217;Agréable Utile</strong> c&#8217;est la création
              d&#8217;accessoires qui vous ressemblent et qui facilite votre
              quotidien.
              <br />
              En effet, ma philosophie est de "joindre l&#8217;utile à
              l&#8217;agréable".
              <br />
              C&#8217;est pourquoi, aujourd&#8217;hui ce sont les maîtres mots
              de ma société.
              <br />
              Sandrine
            </p>
          </div>
        </div>
      </div>

      <div className="main__services__sewing">
        <div className="main__services__sewing__sewing-container">
          <div className="main__services__sewing__sewing-container__img-container">
            <img
              className="main__services__sewing__sewing-container__img-container__img"
              src={sewing}
              alt=""
            />
          </div>
          <div className="main__services__sewing__sewing-container__content-container">
            <div className="main__services__sewing__sewing-container__content-container__description">
              <h2>
                Apprendre la couture,
                <br />
                ça vous dit ?
              </h2>
              <p className="main__services__sewing__sewing-container__content-container__description__content">
                Venez découvrir les secrets du faire soi-même par la couture sur
                machine à coudre.
                <br />
                Vous aurez l'occasion de découvrir les bases, de vous
                perfectionner et de créer votre propre accessoires.
                <br />
                Que vous soyez adulte ou enfant (à partir de 7 ans), tout le
                monde est le bienvenu.
                <br />
                Les ateliers sont proposés les mercredis et samedis sur
                rendez-vous au 06.61.76.76.39.
                <br />
                Pendant les vacances scolaires, des créneaux supplémentaires
                sont dispensés tous les après-midis.
                <br />
                Vous voulez faire une soirée entre filles ou un duo mère-fille,
                c'est ici que ça se passe.
                <br />
                Ou bien alors, faire un cadeau original.
                <br />
                Vous allez pouvoir booster votre créativité.
                <br />
                Quoi de mieux que de joindre l'utile à l'agréable ?
                <br />
                Bonne humeur garantie et encadrement expérimenté.
                <br />
                Moment d'apprentissage et de partage.
                <br />
                Pour en savoir plus sur les conditions de participation et
                tarifaires, je vous invite à me contacter au 06.61.76.76.39.
                <br />
                Cartes cadeaux disponibles sur demande.
                <br />
                Places limités à 4 participants maximum par atelier.
                <br />
                Réservez votre créneau sans plus tarder !
              </p>
              <div className="main__services__sewing__sewing-container__content-container__description__link-container">
                <Link
                  className="main__services__sewing__sewing-container__content-container__description__link-container__link"
                  to="/sewing"
                >
                  En savoir plus{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4Z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main__embroidery">
        <h2>Service de broderie personnalisée</h2>
        <div className="slide-container">
          <Slide
            slidesToScroll={1}
            slidesToShow={4}
            infinite
            easing="linear"
            arrows={false}
            duration={0}
            transitionDuration={8000}
          >
            {images.map((slideImage) => (
              <div key={slideImage}>
                <div
                  style={{
                    ...divStyle,
                    backgroundImage: `url(${slideImage})`,
                    width: "80%",
                  }}
                />
              </div>
            ))}
          </Slide>
        </div>
      </div>

      <div className="main__marketplace">
        <div className="main__marketplace__description-container">
          <h2 className="main__marketplace__description-container__title">
            Retrouvez moi sur le marché à Lagny sur Marne
          </h2>
          <p className="main__marketplace__description-container__content">
            Vous pouvez me retrouver sur le marché de Lagny sur Marne tous les
            dimanches matins de 8h à 13h.
            <br />
            Vous y trouverez des vêtements, des accessoires, des bijoux et bien
            d'autres choses encore.
            <br />
            Vous pourrez également récupérer vos commandes passées sur le site.
            <br />
            N'hésitez pas à venir me rendre visite.
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            tempore aliquid, recusandae eius cum amet fuga, esse cupiditate
            velit asperiores obcaecati aperiam odit rem optio perspiciatis magni
            quaerat aspernatur ullam.
            <br /> Totam, iure cum, numquam aliquid amet, quia adipisci laborum
            expedita dignissimos unde modi? Nesciunt, vel porro!
            <br />
            Repudiandae error ducimus optio nemo quos, in incidunt dolores natus
            excepturi nostrum harum eaque?
            <br />
            Quas harum possimus doloribus quasi inventore assumenda hic suscipit
            tempora necessitatibus quis impedit quod facilis, eum atque sequi
            totam qui tenetur cum eveniet incidunt itaque? Ea cupiditate quos
            voluptates atque.
            <br />
            Dolorum, omnis placeat dolor fugiat assumenda consequatur odio
            laboriosam, maiores recusandae fuga quisquam mollitia reiciendis
            temporibus nemo unde doloremque, atque aut impedit eligendi minima
            maxime natus sint alias. Consequatur, a.
          </p>
        </div>
        <div className="main__marketplace__img-container">
          <img
            className="main__marketplace__img-container__img"
            src={market}
            alt=""
          />
        </div>
      </div>
    </main>
  );
}

export default Homepage;
