import "./App.scss";

import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOldCart } from "../../slices/articlesSlice";

import Header from "../Header/Header";
import Homepage from "../Homepage/Homepage";
import Product from "../Product/Product";
import Shop from "../Shop/Shop";
import Register from "../Register/Register";
import Account from "../Account/Account";
import Profil from "../Account/Profil/Profil";
import Orders from "../Account/Orders/Orders";
import Cart from "../Cart/Cart";
import PlaceOrder from "../PlaceOrder/PlaceOrder";
import Footer from "../Footer/Footer";
import useAuth from "../../hooks/useAuth";
import Payment from "../Payment/Payment";
import Success from "../Success/Success";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOldCart());
  }, []);

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/shop/:id" element={<Product />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/place-order" element={<PlaceOrder />} />
        <Route exact path="/payment" element={<Payment />} />
        <Route exact path="/success" element={<Success />} />
        <Route
          path="/account/:id"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        >
          <Route path="/account/:id/profil" element={<Profil />} />
          <Route path="/account/:id/orders" element={<Orders />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const accessToken = useAuth();

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default App;
