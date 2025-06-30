import "./navbarMenu.css";
import ModalMenu from "../modalMenu/ModalMenu";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function NavbarMenu() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="navbar">
        <div className="navbar__menu-toggle" onClick={openModal}>
            <div className="navbar__menu-toggle-line"></div>
            <div className="navbar__menu-toggle-line"></div>
            <div className="navbar__menu-toggle-line"></div>
        </div>
        <div className="navbar__logo" onClick={() => navigate("/")}>
            <img alt="logo" src="/assets/img/Logo.svg" className="navbar__logo-icon" />
        </div>
        <div className="navbar__menu">
            <Link className="navbar__menu-item" to="/menu">
                MENU
            </Link>
            <Link className="navbar__menu-item" to="/about">
                ABOUT
            </Link>
            <Link className="navbar__menu-item navbar__menu-item--button" to="/book">
                BOOK A TABLE
            </Link>
        </div>

        { showModal && (
            <div className="navbar__modal-menu">
                <ModalMenu onClose={closeModal}></ModalMenu>
            </div>
        )}
        
    </div>
  );
}

export default NavbarMenu