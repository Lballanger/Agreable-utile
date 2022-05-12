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
      {/* <Homepage /> */}
      {/* <Achievements /> */}
      {/* <Register /> */}
      <Shop />
      <Footer />
    </div>
  );
}

export default App;
