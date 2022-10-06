import "./Orders.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders } from "../../../slices/orderSlice";

function Orders() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orderSlice.orders);
  console.log(orders);
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
              <div className="orders__container__order__top-container__img-container">
                {order.articles.map((article) => (
                  <img
                    className="orders__container__order__top-container__img-container__img"
                    key={article.id}
                    src={`/src/assets/img/shop/articles/${article.image[0]}`}
                    alt=""
                    srcSet=""
                  />
                ))}
              </div>

              <div className="orders__container__order__top-container__button-container">
                <Link to={`/order/${order.order_number}`}>
                  Voir la commande
                </Link>
              </div>
            </div>
            <div className="orders__container__order__bottom-container">
              <div className="orders__container__order__bottom-container__number-container">
                <h4 className="orders__container__order__bottom-container__number-container__title">
                  Numéro de commande
                </h4>
                <div className="orders__container__order__bottom-container__number-container__number">
                  {order.order_number}
                </div>
              </div>
              <div className="orders__container__order__bottom-container__number-container">
                <h4 className="orders__container__order__bottom-container__number-container__title">
                  Date de la commande
                </h4>
                <div className="orders__container__order__bottom-container__number-container__number">
                  {new Date(order.created_at).toLocaleDateString("fr")}
                </div>
              </div>
              <div className="orders__container__order__bottom-container__number-container">
                <h4 className="orders__container__order__bottom-container__number-container__title">
                  Total
                </h4>
                <div className="orders__container__order__bottom-container__number-container__number">
                  103.50 €
                </div>
              </div>
              <div className="orders__container__order__bottom-container__number-container">
                <h4 className="orders__container__order__bottom-container__number-container__title">
                  État de la commande
                </h4>
                <div className="orders__container__order__bottom-container__number-container__number">
                  --
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
