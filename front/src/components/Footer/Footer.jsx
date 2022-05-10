import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__web-policy">
        <ul>
          <li>
            <a href="#">Conditions générales de vente et d&#8217;utilisation</a>
          </li>
          <li>
            <a href="#">Politique de confidentialité</a>
          </li>
          <li>
            <a href="#">Politique Cookies</a>
          </li>
          <li>
            <a href="#">Mentions légales</a>
          </li>
        </ul>
      </div>
      <div className="footer__social-network">
        <ul>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">Facebook</a>
          </li>
          <li>
            <a href="#">Instagram</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
