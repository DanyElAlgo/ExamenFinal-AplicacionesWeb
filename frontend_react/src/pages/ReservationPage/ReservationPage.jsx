import "./reservationPage.css";

import FormButton from "../../components/formButton/FormButton";
import { useEffect } from "react";
import { LAYOUT_CONFIG } from "../../services/conf/LayoutConfigConst";
import { useLayout } from "../../context/LayoutContext";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";
import ValidatorForm from "../../services/Validators/ValidatorForm";
import ValidatorWithoutSession from "../../services/Validators/ValidatorWithoutSession";
import ValidatorWithSessionForm from "../../services/Validators/ValidatorWithSessionForm";
import reservationAPI from "../../services/Api/ReservationAPI";
import { useNavigate } from "react-router-dom";


function ReservationPage() {

  const navigate = useNavigate();
  const { updateLayout } = useLayout();
  const { token } = useAuthContext();
  const [errors, setErrors] = useState(null);
  const [reservation, setReservation] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    guests: "",
    date: "",
    time: ""
  });



  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const validator = new ValidatorForm();
    let formErrors = null

    if(token) {
      validator.setStrategy(new ValidatorWithSessionForm());
    }
    else {
      validator.setStrategy(new ValidatorWithoutSession());
    }

    formErrors = validator.validate(reservation);
    setErrors(formErrors);


    if(formErrors)
      return;

    try {
      const reservationForm = {
        guests: reservation.guests,
        date : reservation.date,
        time: reservation.time + ":00",
      };
      
      if(!token) {
        
        reservationForm.email = reservation.email;
        reservationForm.phoneNumber = reservation.phoneNumber;
        reservationForm.name = reservation.name;

        await reservationAPI.reservateWithoutSession(reservationForm);
      }
      else {
        await reservationAPI.reservateWithSession(reservationForm);
      }

      navigate("/");
    }
    catch(error) {
      const generalError = { generalError: error.message };
      setErrors(generalError);
    }

    setReservation({
      name: "",
      phoneNumber: "",
      email: "",
      guests: "",
      date: "",
      time: ""
    })
  }

  useEffect(() => {
    updateLayout(LAYOUT_CONFIG.BOOK_TABLE_PAGE);
  }, []);

  return (
    <section className="reservation-page">
      <div className="reservation-page__header">
        <div className="reservation-page__title">
          <div className="reservation-page__logo">
            <img
              src="/assets/img/diamondIcon.svg"
              className="reservation-page__logo-diamond"
            />
            <div className="reservation-page__logo-line"></div>
          </div>

          <h1 className="reservation-page__title-content">reservation</h1>

          <div className="reservation-page__logo">
            <div className="reservation-page__logo-line"></div>
            <img
              src="/assets/img/diamondIcon.svg"
              className="reservation-page__logo-diamond"
            />
          </div>
        </div>

        <div className="reservation-page__subtitle">
          Secure your spot at Qitchen, where exceptional sushi and a remarkable
          dining experience await.
        </div>
      </div>

      <form action="" className="reservation-page__form" onSubmit={handleSubmit}>

        { !token && (
          <div className={`reservation-page__form-without-session`}>
            <div className="reservation-page__group-form">
              <input
                type="text"
                className={`reservation-page__input ${(errors && errors.name ) ? "reservation-page__input--error" : ""}` }
                placeholder="Name"
                name="name"
                autoComplete="off"
                value={reservation.name}
                onChange={(e) => setReservation((prevReservation) => ({...prevReservation, name: e.target.value }))}
              />
              { errors && errors.name && (
                <div
                  className="reservation-page__input-content-error"
                  id="name-error"
                >
                  { errors.name }
                </div>
              )}
              
            </div>

            <div className="reservation-page__group-form">
              <input
                type="text"
                className={`reservation-page__input ${(errors && errors.phoneNumber ) ? "reservation-page__input--error" : ""}` }
                placeholder="Phone number"
                name="phone"
                autoComplete="off"
                value={reservation.phoneNumber}
                onChange={(e) => setReservation((prevReservation) => ({...prevReservation, phoneNumber: e.target.value }))}
              />
              { errors && errors.phoneNumber && (
                <div
                  className="reservation-page__input-content-error"
                  id="phone-error"
                >
                  { errors.phoneNumber }
                </div>
              )}
              
            </div>

            <div className="reservation-page__group-form">
              <input
                type="text"
                className={`reservation-page__input ${(errors && errors.email ) ? "reservation-page__input--error" : ""}` }
                placeholder="Email"
                name="email"
                autoComplete="off"
                value={reservation.email}
                onChange={(e) => setReservation((prevReservation) => ({...prevReservation, email: e.target.value }))}
              />

              { errors && errors.email && (
                 <div
                  className="reservation-page__input-content-error"
                  id="email-error"
                 >
                  { errors.email }
                 </div>
              )}
             
            </div>
          </div>
        )}
        

        <div className="reservation-page__form-with-session">
          <div className="reservation-page__group-form reservation-page__group-form--horizontal">
            <input
              type="number"
              className={`reservation-page__input ${(errors && errors.guests ) ? "reservation-page__input--error" : ""}` }
              placeholder="Guests"
              name="guests"
              autoComplete="off"
              min="1"
              max="10"
              value={reservation.guests}
              onChange={(e) => setReservation((prevReservation) => ({...prevReservation, guests: e.target.value }))}
            />
            { errors && errors.guests && (
              <div
                className="reservation-page__input-content-error"
                id="guests-error"
              >
                { errors.guests }
              </div>
            )}
            
          </div>

          <div className="reservation-page__group-form reservation-page__group-form--horizontal">
            <input
              type="date"
              className={`reservation-page__input ${(errors && errors.date ) ? "reservation-page__input--error" : ""}` }
              placeholder="Date"
              name="date"
              autoComplete="off"
              value={reservation.date}
              onChange={(e) => setReservation((prevReservation) => ({...prevReservation, date: e.target.value }))}
            />
            { errors && errors.date && (
              <div
                className="reservation-page__input-content-error"
                id="date-error"
              >
                { errors.date }
              </div>
            )}
            
          </div>

          <div className="reservation-page__group-form reservation-page__group-form--horizontal">
            <input
              type="time"
              className={`reservation-page__input ${(errors && errors.time ) ? "reservation-page__input--error" : ""}` }
              placeholder="Time"
              name="time"
              autoComplete="off"
              value={reservation.time}
              onChange={(e) => setReservation((prevReservation) => ({...prevReservation, time: e.target.value }))}
            />

            { errors && errors.time && (
               <div
                className="reservation-page__input-content-error"
                id="time-error"
              >
                { errors.time }
              </div>
            )}
           
          </div>
        </div>

        { errors && errors.generalError && (
           <div
            className="reservation-page__form-error reservation-page__input-content-error"
            id="form-error"
          >{ errors.generalError }</div>
        )}
       

        <div className="reservation-page__button">
          <FormButton title="Reserve"></FormButton>
        </div>
      </form>
    </section>
  );
}

export default ReservationPage;
