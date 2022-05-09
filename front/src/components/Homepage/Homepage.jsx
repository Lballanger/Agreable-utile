import "./Homepage.scss";
import delphine from "../../assets/img/delphine.jpg";

function Homepage() {
  return (
    <main className="main">
      <div className="main__presentation">
        <h2 className="main__presentation__title">Qui je suis ?</h2>
        <div className="main__presentation__content ">
          <div className="main__presentation__content__image-container">
            <img
              className="main__presentation__content__image-container__img"
              src={delphine}
              alt="delphine"
            />
          </div>
          <div className="main__presentation__content__container">
            <p className="main__presentation__content__container__description">
              Prénommée Sandrine et passionnée d&#8217;Art de vivre, j&#8217;ai
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
              L&#8217;Agréable Utile by Sandrine
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Homepage;
