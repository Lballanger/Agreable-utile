import ShopPresentation from "./Shop/ShopPresentation";
import CategoriesPresentation from "./Categories/CategoriesPresentation";
import ServicesPresentation from "./Services/ServicesPresentation";
import SewingPresentation from "./Sewing/SewingPresentation";
import EmbroideryPresentation from "./Embroidery/EmbroideryPresentation";
import MarketplacePresentation from "./Marketplace/MarketplacePresentation";

function Homepage() {
  return (
    <main className="main">
      <ShopPresentation />
      <CategoriesPresentation />
      <ServicesPresentation />
      <SewingPresentation />
      <EmbroideryPresentation />
      <MarketplacePresentation />
    </main>
  );
}

export default Homepage;
