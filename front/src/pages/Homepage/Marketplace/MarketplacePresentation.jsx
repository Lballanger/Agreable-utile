import market from "../../../assets/img/market.webp";

function MarketplacePresentation() {
  return (
    <div className="main__marketplace">
      <div className="main__marketplace__description-container">
        <h2>Retrouvez moi sur le marché à Lagny sur Marne</h2>
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi tempore
          aliquid, recusandae eius cum amet fuga, esse cupiditate velit
          asperiores obcaecati aperiam odit rem optio perspiciatis magni quaerat
          aspernatur ullam.
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
          maxime natus sint alias. Consequatur.
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
  );
}

export default MarketplacePresentation;
