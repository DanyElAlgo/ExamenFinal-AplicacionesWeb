import "./frontPage.css";
import BadgeIcon from "../../components/badge/BadgeIcon";
import { useLayout } from "../../context/LayoutContext";
import { useEffect } from "react";
import { LAYOUT_CONFIG } from "../../services/conf/LayoutConfigConst";
import { useNavigate } from "react-router-dom";

function FrontPage() {

  const { updateLayout } = useLayout();
  const navigate = useNavigate();

  useEffect(() => {
    updateLayout(LAYOUT_CONFIG.FRONT_PAGE);
  }, []);

  return (
    <section className="front-page">
      <div className="front-page__item">
        <img
          src="/assets/img/front-page-item.png"
          className="front-page__item-image"
        />
        <button className="front-page__item-button" onClick={() => navigate("/menu")}>
          MENU
          <BadgeIcon
            src="/assets/img/arrow-right-light.svg"
            width="16"
            height="16"
            className="front-page__badge-menu"
          ></BadgeIcon>
        </button>
      </div>
      <div className="front-page__item">
        <img
          src="/assets/img/front-page-item2.png"
          className="front-page__item-image"
        />
        <button className="front-page__item-button" onClick={() => navigate("/book")}>
          RESERVATION
          <BadgeIcon
            src="/assets/img/arrow-right-light.svg"
            width="16"
            height="16"
            className="front-page__badge-reservation"
          ></BadgeIcon>
        </button>
      </div>
      <div className="front-page__item">
        <img
          src="/assets/img/front-page-item3.png"
          className="front-page__item-image"
        />
        <button className="front-page__item-button" onClick={() => navigate("/about")}>
          OUR RESTAURANT
          <BadgeIcon
            src="/assets/img/arrow-right-light.svg"
            width="16"
            height="16"
            className="front-page__badge-restaurant"
          ></BadgeIcon>
        </button>
      </div>
    </section>
  );
}

export default FrontPage;
