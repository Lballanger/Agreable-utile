import "./Orders.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrdersByUserId } from "../../../slices/orderSlice";

function Orders() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userSlice.userData);
  const orders = useSelector((state) => state.orderSlice.orders);

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchOrdersByUserId());
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
                        new URL(
                          `/src/assets/img/shop/articles/${article.article.image[0]}.jpg`,
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
                  to={`/account/${user.id}/order/${order.order_number}`}
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
