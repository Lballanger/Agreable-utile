import { Link } from "react-router-dom";

// import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__web-policy">
        <ul>
          <li>
            <Link to="/cgv">
              Conditions générales de vente et d&#8217;utilisation
            </Link>
          </li>
          <li>
            <Link to="/confidentiality-cookies">
              Protection de la vie privée et cookies
            </Link>
          </li>
          <li>
            <Link to="/legals">Mentions légales</Link>
          </li>
        </ul>
      </div>
      <div className="footer__social-network">
        <ul>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.facebook.com/lagreablutile/"
              rel="noreferrer"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.instagram.com/l_agreable_utile"
              rel="noreferrer"
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
