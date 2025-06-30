import BadgeIcon from "../../components/badge/BadgeIcon";
import "./contactPage.css";
import { useLayout } from "../../context/LayoutContext";
import { useEffect } from "react";
import { LAYOUT_CONFIG } from "../../services/conf/LayoutConfigConst";

function ContactPage() {

  const { updateLayout } = useLayout();

  useEffect(() => {
    updateLayout(LAYOUT_CONFIG.CONTACT_PAGE);
  }, []);

  return (
    <section className="contact-page">
      <div className="contact-page__first-section">
        <div className="contact-page__opening">
          <div className="contact-page__opening-title">
            <div className="contact-page__title-logo">
              <img
                alt="diamond"
                src="/assets/img/diamondIcon.svg"
                className="contact-page__title-diamond"
              />
              <div className="contact-page__title-line"></div>
            </div>

            <h4 className="contact-page__title-content">Opening hours</h4>

            <div className="contact-page__title-logo">
              <div className="contact-page__title-line"></div>
              <img
                alt="diamond"
                src="/assets/img/diamondIcon.svg"
                className="contact-page__title-diamond"
              />
            </div>
          </div>

          <div className="contact-page__opening-hours">
            <div className="contact-page__hour-item">
              <p className="contact-page__day">Monday</p>

              <div className="contact-page__hour-line"></div>

              <p className="contact-page__hour-info">16:00 - 22:30</p>
            </div>

            <div className="contact-page__hour-item">
              <p className="contact-page__day">Wednesday</p>

              <div className="contact-page__hour-line"></div>

              <p className="contact-page__hour-info">16:00 - 22:30</p>
            </div>

            <div className="contact-page__hour-item">
              <p className="contact-page__day">Thursday</p>

              <div className="contact-page__hour-line"></div>

              <p className="contact-page__hour-info">16:00 - 22:30</p>
            </div>

            <div className="contact-page__hour-item">
              <p className="contact-page__day">Friday</p>

              <div className="contact-page__hour-line"></div>

              <p className="contact-page__hour-info">16:00 - 22:30</p>
            </div>

            <div className="contact-page__hour-item">
              <p className="contact-page__day">Saturday & Sunday</p>

              <div className="contact-page__hour-line"></div>

              <p className="contact-page__hour-info">16:00 - 22:30</p>
            </div>
          </div>
        </div>

        <div className="contact-page__images">
          <div className="contact-page__images-first-section">
            <div className="contact-page__image-wrapper">
              <img
                src="/assets/img/image-instagram.png"
                alt="Social Image"
                className="contact-page__image-social"
              />
            </div>

            <div className="contact-page__image-wrapper">
              <img
                src="/assets/img/front-page-instagram.png"
                alt="Social Image"
                className="contact-page__image-social"
              />
            </div>
          </div>

          <div className="contact-page__images-second-section">
            <div className="contact-page__image-wrapper">
              <img
                src="/assets/img/blog1.png"
                alt="Social Image"
                className="contact-page__image-social"
              />
            </div>

            <div className="contact-page__image-wrapper">
              <img
                src="/assets/img/blog-page.png"
                alt="Social Image"
                className="contact-page__image-social"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="contact-page__second-section">
        <div className="contact-page__map">
          <img
            src="/assets/img/map.png"
            alt="Map"
            className="contact-page__image-map"
          />

          <div className="contact-page__button">
            Show route
            <BadgeIcon
              src="/assets/img/arrow-right-light.svg"
              width="16"
              height="16"
            ></BadgeIcon>
          </div>
        </div>

        <div className="contact-page__contact">
          <div className="contact-page__contact-title">
            <div className="contact-page__title-logo">
              <img
                alt="diamond"
                src="/assets/img/diamondIcon.svg"
                className="contact-page__title-diamond"
              />
              <div className="contact-page__title-line"></div>
            </div>

            <h4 className="contact-page__title-content">Get in touch</h4>

            <div className="contact-page__title-logo">
              <div className="contact-page__title-line"></div>
              <img
                alt="diamond"
                src="/assets/img/diamondIcon.svg"
                className="contact-page__title-diamond"
              />
            </div>
          </div>

          <div className="contact-page__contact-information">
            <div className="contact-page__information-item">
              <p className="contact-page__information-content-left">Address</p>
              <p className="contact-page__information-content-right">
                23 Greenfield Avenue, Prague 120 00
              </p>
            </div>

            <div className="contact-page__information-item">
              <p className="contact-page__information-content-left">Phone</p>
              <p className="contact-page__information-content-right">
                +49 1234 567890
              </p>
            </div>

            <div className="contact-page__information-item">
              <p className="contact-page__information-content-left">Email</p>
              <p className="contact-page__information-content-right">
                email@example.com
              </p>
            </div>

            <div className="contact-page__information-item">
              <p className="contact-page__information-content-left">Follow</p>
              <div className="contact-page__information-content-right">
                <img
                  src="/assets/img/facebook-logo-light.svg"
                  alt="Facebook"
                  className="contact-page__information-logo"
                />
                <img
                  src="/assets/img/instagram-logo-light.svg"
                  alt="Instagram"
                  className="contact-page__information-logo"
                />
                <img
                  src="/assets/img/twitter-logo-light.svg"
                  alt="Twitter"
                  className="contact-page__information-logo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
