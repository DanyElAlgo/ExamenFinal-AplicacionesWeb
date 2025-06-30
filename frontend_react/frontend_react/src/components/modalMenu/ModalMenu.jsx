import "./modalMenu.css";
import { Link } from "react-router-dom";

function ModalMenu({ onClose }) {
  return (
    <div className="modal-menu" onClick={onClose}>
      <div className="modal-menu__logo">
        <img
          src="/assets/img/diamondIcon.svg"
          className="modal-menu__logo-diamond"
        />
        <div className="modal-menu__logo-line"></div>
        <img
          src="/assets/img/diamondIcon.svg"
          className="modal-menu__logo-diamond"
        />
      </div>

      <Link className="modal-menu__item" to="/menu">
        MENU
      </Link>
      <Link className="modal-menu__item" to="/book">
        RESERVATION
      </Link>
      <Link className="modal-menu__item" to="/about">
        ABOUT
      </Link>
      <Link className="modal-menu__item" to="/contact">
        CONTACT
      </Link>
      <Link className="modal-menu__item" to="/blog">
        BLOG
      </Link>

      <div className="modal-menu__logo">
        <img
          src="/assets/img/diamondIcon.svg"
          className="modal-menu__logo-diamond"
        />
        <div className="modal-menu__logo-line"></div>
        <img
          src="/assets/img/diamondIcon.svg"
          className="modal-menu__logo-diamond"
        />
      </div>
    </div>
  );
}

export default ModalMenu;
