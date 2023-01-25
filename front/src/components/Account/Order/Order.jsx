import "./Order.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AdvancedImage, lazyload } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { fetchOrdersByUserId } from "../../../slices/orderSlice";
import cloudinary from "../../../lib/cloudinary";

function Order() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const user = useSelector((state) => state.userSlice.userData);
  const orders = useSelector((state) => state.orderSlice.orders);
  const order = orders.find((order) => order.order_number === id);

  useEffect(() => {
    if (!orders.length && user) {
      dispatch(fetchOrdersByUserId(user.id));
    }
  }, [user, orders]);

  return (
    <div className="order">
      <h2 className="order__title">Commande numéro : {id}</h2>
      <div className="order__info-order">
        <div className="order__info-order__date">
          Date de la commande :{" "}
          {new Date(order.created_at).toLocaleDateString("fr")}
        </div>
        <div className="order__info-order__paiement">
          Mode de paiement : ***TEST***
        </div>
      </div>

      <div className="order__delivery">LIVRAISON</div>
      <div className="order__articles">
        {order.articles.length > 0
          ? order.articles.map((article) => (
              <Link to={`/shop/${article.article.id}`} key={article.article.id}>
                <div className="order__articles__article">
                  <div className="order__articles__article__img-container">
                    <AdvancedImage
                      className="order__articles__article__img-container__img"
                      cldImg={cloudinary
                        .image(article?.article.image[0])
                        .resize(fill().width(500).height(500))}
                      plugins={[lazyload()]}
                    />
                  </div>
                  <div className="order__articles__article__info-container">
                    <h3 className="order__articles__article__info-container__title">
                      {article.article.name}
                    </h3>
                    <h4 className="order__articles__article__info-container__description">
                      {article.article.description}
                    </h4>
                  </div>
                  <div className="order__articles__article__quantity-container">
                    <p className="order__articles__article__quantity-container__unit-price">
                      Prix unitaire : {article.article.price_wt} €
                    </p>
                    <p className="order__articles__article__quantity-container__quantity">
                      Quantité : {article.quantity}
                    </p>
                    <p className="order__articles__article__quantity-container__total-price">
                      Prix unitaire :{" "}
                      {(article.article.price_wt * article.quantity)
                        .toFixed(2)
                        .replace(".", ",")}{" "}
                      €
                    </p>
                  </div>
                </div>
              </Link>
            ))
          : ""}
      </div>
      <div className="order__total">
        <p className="order__total__price">TEST TOTAL PRICE</p>
      </div>
    </div>
  );
}

export default Order;
