import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { signOut } from "../../slices/userSlice";

import useWindowSize from "../../hooks/useWindowSize";

import Navbar from "../Navbar";
import MobileNavbar from "../MobileNavbar";
import Connexion from "../Connexion";

const menuItems = [
  {
    id: 1,
    name: "Accueil",
    path: "/",
  },
  {
    id: 2,
    name: "Boutique",
    path: "/shop",
  },
];

const connectedMenuItems = [
  {
    id: 1,
    name: "Mes informations",
    path: "/account",
  },
  {
    id: 2,
    name: "Mes commandes",
    path: "/orders",
  },
];

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isMobile } = useWindowSize();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <header
      className={`header 
    ${location.pathname === "/" ? "header-color" : ""}
    `}
    >
      <div className="header__navigation">
        {isMobile ? (
          <MobileNavbar
            menuItems={menuItems}
            connectedMenuItems={connectedMenuItems}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleLogout={handleLogout}
          />
        ) : (
          <Navbar
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            menuItems={menuItems}
            connectedMenuItems={connectedMenuItems}
            handleLogout={handleLogout}
          />
        )}
      </div>
      {isModalOpen && <Connexion handleCloseModal={handleCloseModal} />}
    </header>
  );
}

export default Header;
