import "./App.scss";

import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOldCart } from "../../slices/articlesSlice";

import Header from "../Header/Header";
import Homepage from "../Homepage/Homepage";
import Achievements from "../Achievements/Products/Achievements";
import Detail from "../Achievements/Detail/Detail";
import Shop from "../Shop/Shop";
import Register from "../Register/Register";
import Account from "../Account/Account";
import Profil from "../Account/Profil/Profil";
import Orders from "../Account/Orders/Orders";
import Cart from "../Cart/Cart";
import Footer from "../Footer/Footer";
import useAuth from "../../hooks/useAuth";
import Index from "../Achievements";

function App() {
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(getOldCart());
  }, []);

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact element={<Index />}>
          <Route exact path="/achievements" element={<Achievements />} />
          <Route exact path="/achievements/:id" element={<Detail />} />
        </Route>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/shop/:id" element={<Detail />} />
        <Route exact path="/cart" element={<Cart />} />
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
