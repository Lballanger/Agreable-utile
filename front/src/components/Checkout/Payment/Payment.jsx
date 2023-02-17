import "./Payment.scss";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import CheckoutForm from "../../CheckoutForm/CheckoutForm";
import { paymentIntent } from "../../../slices/cartSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = useSelector((state) => state.articlesSlice.subtotal);
  const items = useSelector((state) => state.articlesSlice.cart);

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (items.length) {
      dispatch(paymentIntent())
        .unwrap()
        .then((data) => {
          setClientSecret(data.clientSecret);
        });
    } else {
      navigate("/payment");
    }
  }, [items]);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="payment">
      <div className="payment__form-container">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
      <div className="payment__subtotal-container">
        <div className="payment__subtotal-container__title-container">
          <h2 className="payment__subtotal-container__title-container__title">
            Récapitulatif
          </h2>
        </div>
        <div className="cart__cart-container__summary__detail-container">
          <div className="cart__cart-container__summary__detail-container__subtotal-container">
            <p className="cart__cart-container__summary__detail-container__subtotal-container__subtotal">
              Sous-total
            </p>
            <p className="cart__cart-container__summary__detail-container__subtotal-container__price">
              {subtotal.toFixed(2).toString().replace(".", ",")} €
            </p>
          </div>
          <div className="cart__cart-container__summary__detail-container__delivery-container">
            <p className="cart__cart-container__summary__detail-container__delivery-container__delivery">
              Livraison
            </p>
            <p className="cart__cart-container__summary__detail-container__delivery-container__price">
              0,00 €
            </p>
          </div>
          <div className="cart__cart-container__summary__detail-container__total-container">
            <p className="cart__cart-container__summary__detail-container__total-container__total">
              Total (TVA incluse)
            </p>
            <p className="cart__cart-container__summary__detail-container__total-container__price">
              {subtotal.toFixed(2).toString().replace(".", ",")} €
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
