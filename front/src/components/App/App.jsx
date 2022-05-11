import Header from "../Header/Header";
import Homepage from "../Homepage/Homepage";
import Achievements from "../Achievements/Achievements";
import Footer from "../Footer/Footer";
import "./App.scss";

function App() {
  return (
    <div className="container">
      <Header />
      {/* <Homepage /> */}
      <Achievements />
      <Footer />
    </div>
  );
}

export default App;
