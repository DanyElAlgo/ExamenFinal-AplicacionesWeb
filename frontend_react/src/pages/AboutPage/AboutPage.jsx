import "./aboutPage.css";
import { useLayout } from "../../context/LayoutContext";
import { LAYOUT_CONFIG } from "../../services/conf/LayoutConfigConst";
import { useEffect } from "react";

function About() {

  const { updateLayout } = useLayout();

  useEffect(() => {
    updateLayout(LAYOUT_CONFIG.ABOUT_PAGE);
  }, []);

  return (
    <section className="about-page">
      <div className="about-page__main">
        <div className="about-page__main-card">
          <p className="about-page__main-card-title">Sushi artistry redefined</p>
          <p className="about-page__main-card-content">
            Where culinary craftsmanship meets modern elegance. Indulge in the
            finest sushi, expertly curated to elevate your dining experience.
          </p>
        </div>

        <div className="about-page__main-img-wrapper">
          <img
            src="/assets/img/about-1.png"
            alt="main"
            className="about-page__main-img"
          />
        </div>
      </div>

      <div className="about-page__awards">
        <div className="about-page__award-card">
          <div className="about-page__award-stars">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.33268 11.0133L11.4527 13.5L10.3593 8.81334L13.9993 5.66001L9.20602 5.25334L7.33268 0.833344L5.45935 5.25334L0.666016 5.66001L4.30602 8.81334L3.21268 13.5L7.33268 11.0133Z"
                fill="#EFE7D2"
              />
            </svg>

            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.33268 11.0133L11.4527 13.5L10.3593 8.81334L13.9993 5.66001L9.20602 5.25334L7.33268 0.833344L5.45935 5.25334L0.666016 5.66001L4.30602 8.81334L3.21268 13.5L7.33268 11.0133Z"
                fill="#EFE7D2"
              />
            </svg>

            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.33268 11.0133L11.4527 13.5L10.3593 8.81334L13.9993 5.66001L9.20602 5.25334L7.33268 0.833344L5.45935 5.25334L0.666016 5.66001L4.30602 8.81334L3.21268 13.5L7.33268 11.0133Z"
                fill="#EFE7D2"
              />
            </svg>

            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.33268 11.0133L11.4527 13.5L10.3593 8.81334L13.9993 5.66001L9.20602 5.25334L7.33268 0.833344L5.45935 5.25334L0.666016 5.66001L4.30602 8.81334L3.21268 13.5L7.33268 11.0133Z"
                fill="#EFE7D2"
              />
            </svg>

            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.33268 11.0133L11.4527 13.5L10.3593 8.81334L13.9993 5.66001L9.20602 5.25334L7.33268 0.833344L5.45935 5.25334L0.666016 5.66001L4.30602 8.81334L3.21268 13.5L7.33268 11.0133Z"
                fill="#EFE7D2"
              />
            </svg>
          </div>
          <div className="about-page__content">
            <p className="about-page__award-title">Trip Advisor</p>
            <p className="about-page__award-description">Best Steak House Prague</p>
          </div>
        </div>

        <div className="about-page__award-card">
          <div className="about-page__award-stars">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="about-page__star-icon"
            >
              <path
                d="M7.33268 11.0133L11.4527 13.5L10.3593 8.81334L13.9993 5.66001L9.20602 5.25334L7.33268 0.833344L5.45935 5.25334L0.666016 5.66001L4.30602 8.81334L3.21268 13.5L7.33268 11.0133Z"
                fill="#EFE7D2"
              />
            </svg>

            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="about-page__star-icon"
            >
              <path
                d="M7.33268 11.0133L11.4527 13.5L10.3593 8.81334L13.9993 5.66001L9.20602 5.25334L7.33268 0.833344L5.45935 5.25334L0.666016 5.66001L4.30602 8.81334L3.21268 13.5L7.33268 11.0133Z"
                fill="#EFE7D2"
              />
            </svg>

            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="about-page__star-icon"
            >
              <path
                d="M7.33268 11.0133L11.4527 13.5L10.3593 8.81334L13.9993 5.66001L9.20602 5.25334L7.33268 0.833344L5.45935 5.25334L0.666016 5.66001L4.30602 8.81334L3.21268 13.5L7.33268 11.0133Z"
                fill="#EFE7D2"
              />
            </svg>

            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="about-page__star-icon"
            >
              <path
                d="M7.33268 11.0133L11.4527 13.5L10.3593 8.81334L13.9993 5.66001L9.20602 5.25334L7.33268 0.833344L5.45935 5.25334L0.666016 5.66001L4.30602 8.81334L3.21268 13.5L7.33268 11.0133Z"
                fill="#EFE7D2"
              />
            </svg>

            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="about-page__star-icon"
            >
              <path
                d="M7.33268 11.0133L11.4527 13.5L10.3593 8.81334L13.9993 5.66001L9.20602 5.25334L7.33268 0.833344L5.45935 5.25334L0.666016 5.66001L4.30602 8.81334L3.21268 13.5L7.33268 11.0133Z"
                fill="#EFE7D2"
              />
            </svg>
          </div>
          <div className="about-page__content">
            <p className="about-page__award-title">Michelin Guide</p>
            <p className="about-page__award-description">Best Steak House Prague</p>
          </div>
        </div>

        <div className="about-page__award-card">
          <div className="about-page__award-stars">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="about-page__star-icon"
            >
              <path
                d="M7.33268 11.0133L11.4527 13.5L10.3593 8.81334L13.9993 5.66001L9.20602 5.25334L7.33268 0.833344L5.45935 5.25334L0.666016 5.66001L4.30602 8.81334L3.21268 13.5L7.33268 11.0133Z"
                fill="#EFE7D2"
              />
            </svg>

            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="about-page__star-icon"
            >
              <path
                d="M7.33268 11.0133L11.4527 13.5L10.3593 8.81334L13.9993 5.66001L9.20602 5.25334L7.33268 0.833344L5.45935 5.25334L0.666016 5.66001L4.30602 8.81334L3.21268 13.5L7.33268 11.0133Z"
                fill="#EFE7D2"
              />
            </svg>

            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="about-page__star-icon"
            >
              <path
                d="M7.33268 11.0133L11.4527 13.5L10.3593 8.81334L13.9993 5.66001L9.20602 5.25334L7.33268 0.833344L5.45935 5.25334L0.666016 5.66001L4.30602 8.81334L3.21268 13.5L7.33268 11.0133Z"
                fill="#EFE7D2"
              />
            </svg>

            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="about-page__star-icon"
            >
              <path
                d="M7.33268 11.0133L11.4527 13.5L10.3593 8.81334L13.9993 5.66001L9.20602 5.25334L7.33268 0.833344L5.45935 5.25334L0.666016 5.66001L4.30602 8.81334L3.21268 13.5L7.33268 11.0133Z"
                fill="#EFE7D2"
              />
            </svg>

            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="about-page__star-icon"
            >
              <path
                d="M7.33268 11.0133L11.4527 13.5L10.3593 8.81334L13.9993 5.66001L9.20602 5.25334L7.33268 0.833344L5.45935 5.25334L0.666016 5.66001L4.30602 8.81334L3.21268 13.5L7.33268 11.0133Z"
                fill="#EFE7D2"
              />
            </svg>
          </div>
          <div className="about-page__content">
            <p className="about-page__award-title">Star Dining</p>
            <p className="about-page__award-description">Best Steak HousePrague</p>
          </div>
        </div>
      </div>

      <div className="about-page__history">
        <div className="about-page__history-img-wrapper">
          <img
            src="/assets/img/about-2.png"
            alt="history"
            className="about-page__history-img"
          />
        </div>

        <div className="about-page__history-card">
          <div className="about-page__history-card-title">
            <div className="about-page__history-card-logo">
              <img
                src="/assets/img/diamondIcon.svg"
                className="about-page__diamond-icon"
              />
              <div className="about-page__line"></div>
            </div>
            Our story
            <div className="about-page__history-card-logo">
              <div className="about-page__line"></div>
              <img
                src="/assets/img/diamondIcon.svg"
                className="about-page__diamond-icon"
              />
            </div>
          </div>
          <p className="about-page__history-card-content">
            Founded with a passion for culinary excellence, Qitchen's journey
            began in the heart of Prague. Over years, it evolved into a haven
            for sushi enthusiasts, celebrated for its artful mastery and
            devotion to redefining gastronomy.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
