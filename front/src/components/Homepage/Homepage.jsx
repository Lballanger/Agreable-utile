import "./Homepage.scss";
import sandrine from "../../assets/img/sandrine.jpg";
import faitmain from "../../assets/img/faitmain.svg";
import oeko from "../../assets/img/oeko-tex.svg";
import madeinfrance from "../../assets/img/made-in-france.svg";
import produits2 from "../../assets/img/produits2.svg";

function Homepage() {
  return (
    <main className="main">
      <div className="main__presentation">
        <h2 className="main__presentation__title" />
        <div className="main__presentation__content ">
          <div className="main__presentation__content__image-container">
            <img
              className="main__presentation__content__image-container__img"
              src={sandrine}
              alt="sandrine"
            />
          </div>
          <div className="main__presentation__content__container">
            <p className="main__presentation__content__container__description">
              {/* Prénommée Sandrine et passionnée d&#8217;Art de vivre, j&#8217;ai
              décidé après une carrière de 15 ans en gestion d&#8217;entreprise,
              d&#8217;exploiter mon goût pour la décoration et
              l&#8217;artisanat.
              <br />
              Fondatrice de L&#8217;Agréable Utile, je conçois et fabrique des
              accessoires textiles pour l&#8217;univers de la petite enfance,
              les plaisirs de la maison, la beauté et le bien-être ainsi que la
              mode pour les hommes et les femmes.
              <br />
              L&#8217;Agréable Utile, c&#8217;est l&#8217;aboutissement de
              longues heures de réflexion et de travail acharné, mais aussi le
              commencement d&#8217;une nouvelle aventure.
              <br />
              L&#8217;Agréable Utile, c&#8217;est la création
              d&#8217;accessoires qui vous ressemblent et qui facilite votre
              quotidien, en effet ma philosophie est de joindre l&#8217;utile à
              l&#8217;agréable.
              <br />
              L&#8217;Agréable Utile, c&#8217;est l&#8217;alliance de la qualité
              et de l&#8217;esthétique ; mais aussi l&#8217;alliance des
              couleurs douces, veloutées, pulpeuses et vitaminées.
              <br />
              C&#8217;est un anti conformisme et une volonté d&#8217;être
              différente, de se distinguer et de surprendre.
              <br />
              Chaque modèle est pensé et élaboré de telles sortes à ce
              qu&#8217;il soit solide et pratique mais surtout original et
              élégant.
              <br />
              Amoureuse des belles choses, j&#8217;ai le goût du détail et de la
              perfection.
              <br />
              Je porte un soin particulier au choix des matières et aux
              finitions.
              <br />
              Pour l&#8217;heure, j&#8217;ai envie de faire de mon activité une
              pépite tant dans mon travail que dans mes relations humaines.
              <br />
              J&#8217;ai envie de mettre à l&#8217;honneur mes valeurs
              auxquelles je tiens si particulièrement à savoir
              d&#8217;additionner la bonne humeur et la bienveillance.
              <br />
              J&#8217;aime me dire le matin quand je me lève, je veux faire de
              ma journée, l&#8217;Excellence.
              <br />
              Je fabrique des pièces uniques et plus rarement de très petites
              séries.
              <br />
              La fabrication est 100 % artisanale et Française, par moi-même au
              sein de mon atelier à Thorigny sur marne en Seine et Marne (77).
              <br />
              Faites-moi confiance, vous ne le regretterez pas.
              <br />
              <br />
              L&#8217;Agréable Utile by Sandrine */}
              Sandrine est passionnée d&#8217;art de vivre.
              <br />
              Elle conçoit et fabrique dans son atelier à Thorigny-sur-Marne, en
              pièce unique, des accessoires textiles pour l&#8217;univers de la
              petite enfance, les plaisirs de la maison, la beauté et le
              bien-être ainsi que la mode pour les hommes et les femmes.
            </p>
          </div>
        </div>
      </div>
      <div className="main__background" />

      <h2 className="main__title">Une sélection de choix</h2>
      <div className="main__quality">
        <div className="main__quality__container">
          <div className="main__quality__container__label">
            <div className="main__quality__container__label__img-container">
              <img
                className="main__quality__container__label__img-container__img"
                src={faitmain}
                alt=""
              />
            </div>
            <p className="main__quality__container__label__content">
              Toutes les créations sont faites main par moi-même.
            </p>
          </div>
          <div className="main__quality__container__label">
            <p className="main__quality__container__label__content">
              Tous les tissus utilisés sont d&#8217;origine Française.
            </p>
            <div className="main__quality__container__label__img-container">
              <img
                className="main__quality__container__label__img-container__img"
                src={madeinfrance}
                alt=""
              />
            </div>
          </div>
          <div className="main__quality__container__label">
            <div className="main__quality__container__label__img-container">
              <img
                className="main__quality__container__label__img-container__img"
                src={oeko}
                alt=""
              />
            </div>

            <p className="main__quality__container__label__content">
              Oeko-Tex est un label de qualité comprenant plusieurs normes
              <br />
              techniques, visant à certifier les qualités sanitaires et
              <br />
              écologiques des textiles et cuirs, en garantissant l&#8217;absence
              <br />
              de produits toxiques pour le corps et pour l&#8217;environnement.
            </p>
          </div>
        </div>
        <div className="main__quality__produits">
          <img
            className="main__quality__produits__image"
            src={produits2}
            alt="produits"
          />
        </div>
      </div>
    </main>
  );
}

export default Homepage;
