import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOldCart } from "../slices/articlesSlice";

// Components

import Homepage from "./Homepage/Homepage";
import Product from "../components/Product/Product";
import Shop from "./Shop/Shop";
import Register from "./Register/Register";
import Account from "../components/Account/Account";
import Profil from "../components/Account/Profil/Profil";
import Orders from "../components/Account/Orders/Orders";
import Order from "../components/Account/Order/Order";
import Cart from "./Cart/Cart";
import Success from "../components/Checkout/Success/Success";
import Checkout from "../components/Checkout/Checkout";
import GuestRegistration from "../components/Checkout/GuestRegistration/GuestRegistration";
import NotFound from "../components/NotFound/NotFound";

// Hooks
import useAuth from "../hooks/useAuth";
import Layout from "../components/Layout";

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
