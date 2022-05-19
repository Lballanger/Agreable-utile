import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Homepage from "../Homepage/Homepage";
import Achievements from "../Achievements/Achievements";
import Shop from "../Shop/Shop";
import Register from "../Register/Register";
import Footer from "../Footer/Footer";
import "./App.scss";

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/achievements" element={<Achievements />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/shop" element={<Shop />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
