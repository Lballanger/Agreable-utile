import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOldCart } from "../../slices/articlesSlice";

// Components

import Homepage from "../Homepage/Homepage";
import Product from "../Product/Product";
import Shop from "../Shop/Shop";
import Register from "../Register/Register";
import Account from "../Account/Account";
import Profil from "../Account/Profil/Profil";
import Orders from "../Account/Orders/Orders";
import Order from "../Account/Order/Order";
import Cart from "../Cart/Cart";
import Success from "../Checkout/Success/Success";
import Checkout from "../Checkout/Checkout";
import GuestRegistration from "../Checkout/GuestRegistration/GuestRegistration";
import NotFound from "../NotFound/NotFound";

// Hooks
import useAuth from "../../hooks/useAuth";
import Layout from "../Layout/Layout";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOldCart());
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route element={<Layout />}>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/success" element={<Success />} />

          <Route
            exact
            path="/order/guest-registration"
            element={<GuestRegistration />}
          />
          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/shop/:id" element={<Product />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route element={<PrivateRoute />}>
            <Route element={<Account />}>
              <Route path="/account/:id/profil" element={<Profil />} />
              <Route path="/account/:id/orders" element={<Orders />} />
              <Route path="/account/:id/order/:id" element={<Order />} />
            </Route>
          </Route>
          <Route exact path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

function PrivateRoute() {
  const accessToken = useAuth();
  const { pathname } = useLocation();

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: pathname }} replace />
  );
}

export default App;
