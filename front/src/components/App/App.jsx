import "./App.scss";

import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Homepage from "../Homepage/Homepage";
import Achievements from "../Achievements/Achievements";
import Shop from "../Shop/Shop";
import Register from "../Register/Register";
import Account from "../Account/Account";
import Profil from "../Account/Profil/Profil";
import Orders from "../Account/Orders/Orders";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/achievements" element={<Achievements />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/shop" element={<Shop />} />
        {/* * Future protected roads * */}
        <Route exact path="/account/:id" element={<Account />}>
          <Route path="/account/:id/profil" element={<Profil />} />
          <Route path="/account/:id/orders" element={<Orders />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
