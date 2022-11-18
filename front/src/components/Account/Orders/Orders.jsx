import "./Orders.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders } from "../../../slices/orderSlice";

function Orders() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orderSlice.orders);

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchOrders());
    }
  }, []);

  return (
    <div className="orders">
      <h2 className="orders__title">Mes commandes</h2>
      <div className="orders__container">
        {orders?.map((order) => (
          <div className="orders__container__order" key={order.order_number}>
            <div className="orders__container__order__top-container">
              <div className="orders__container__order__top-container__articles">
                {order.articles.map((article) => (
                  <div className="orders__container__order__top-container__articles__img-container">
                    <img
                      className="orders__container__order__top-container__articles__img-container__img"
                      key={article.id}
                      src={
                        import.meta.env.VITE_NODE_ENV !== "production"
                          ? `/src/assets/img/shop/articles/${article.image[0]}`
                          : new URL(
                              `./assets/img/shop/articles/${article.image[0]}`,
                              import.meta.url,
                            ).href
                      }
                      alt=""
                      srcSet=""
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="orders__container__order__bottom-container">
              <div className="orders__container__order__bottom-container__info">
                <div className="orders__container__order__bottom-container__info__container">
                  <h4 className="orders__container__order__bottom-container__info__container__title">
                    Numéro de commande
                  </h4>
                  <div className="orders__container__order__bottom-container__info__container__content">
                    {order.order_number}
                  </div>
                </div>
                <div className="orders__container__order__bottom-container__info__container">
                  <h4 className="orders__container__order__bottom-container__info__container__title">
                    Date de la commande
                  </h4>
                  <div className="orders__container__order__bottom-container__info__container__content">
                    {new Date(order.created_at).toLocaleDateString("fr")}
                  </div>
                </div>
                <div className="orders__container__order__bottom-container__info__container">
                  <h4 className="orders__container__order__bottom-container__info__container__title">
                    Total
                  </h4>
                  <div className="orders__container__order__bottom-container__info__container__content">
                    103.50 €
                  </div>
                </div>
                <div className="orders__container__order__bottom-container__info__container">
                  <h4 className="orders__container__order__bottom-container__info__container__title">
                    État de la commande
                  </h4>
                  <div className="orders__container__order__bottom-container__info__container__content">
                    {order.status}
                  </div>
                </div>
              </div>
              <div className="orders__container__order__bottom-container__link-container">
                <Link
                  className="orders__container__order__bottom-container__link-container__link"
                  to={`/order/${order.order_number}`}
                >
                  Voir la commande
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
