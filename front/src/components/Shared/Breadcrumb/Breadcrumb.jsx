import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import "./Breadcrumb.scss";

function Breadcrumb() {
  const location = useLocation();
  const { id } = useParams();

  const product = useSelector((state) => state.articlesSlice.articles);

  const getNameProduct = (id) => {
    if (!product) return null;
    return product.find((product) => product.article_id === Number(id));
  };

  const nameProduct = getNameProduct(id);
  return (
    <nav className="breadcrumb">
      <Link
        to="/"
        className={
          location.pathname === "/"
            ? "breadcrumb__link breadcrumb__link--active"
            : "breadcrumb__link"
        }
      >
        Accueil
      </Link>
      <span className="breadcrumb__link--arrow"> &gt; </span>
      <Link
        to="/shop"
        className={
          location.pathname === "/shop"
            ? "breadcrumb__link breadcrumb__link--active"
            : "breadcrumb__link"
        }
      >
        Boutique{" "}
      </Link>
      <Link
        to={`/shop/${id}`}
        className={
          location.pathname === `/shop/${id}`
            ? "breadcrumb__link breadcrumb__link--active"
            : "breadcrumb__link"
        }
      >
        {nameProduct?.article_name ? `> ${nameProduct?.article_name}` : ""}
      </Link>
    </nav>
  );
}

export default Breadcrumb;
