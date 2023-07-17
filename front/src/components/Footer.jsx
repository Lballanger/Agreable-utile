import { Link } from "react-router-dom";

function Footer() {
  const menuItems = [
    {
      id: 1,
      name: "Conditions générales de vente et d'utilisation",
      path: "/cgv",
    },
    {
      id: 2,
      name: "Protection de la vie privée et cookies",
      path: "/confidentiality-cookies",
    },
    {
      id: 3,
      name: "Mentions légales",
      path: "/legals",
    },
    {
      id: 4,
      name: "Contact",
      path: "/contact",
    },
  ];

  const socialMenuItems = [
    {
      id: 1,
      name: "Facebook",
      path: "#",
    },
    {
      id: 2,
      name: "Instagram",
      path: "#",
    },
  ];

  return (
    <footer className="footer">
      <div className="footer__web-policy">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer__social-network">
        <ul>
          {socialMenuItems.map((item) => (
            <li key={item.id}>
              <a href={item.path}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
