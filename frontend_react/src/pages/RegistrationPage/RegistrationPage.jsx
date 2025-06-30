import { useActionState, useEffect, useState } from "react";
import FormButton from "../../components/formButton/FormButton";
import { useLayout } from "../../context/LayoutContext";
import { LAYOUT_CONFIG } from "../../services/conf/LayoutConfigConst";
import ValidatorForm from "../../services/Validators/ValidatorForm";
import ValidatorSignUpForm from "../../services/Validators/ValidatorSignUpForm";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/Api/AuthAPI";
import { useAuthContext } from "../../context/AuthContext";

import "./registrationPage.css";


function RegistrationPage() {

  const { updateLayout } = useLayout();
  const [errors, setErrors] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: ""
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validator = new ValidatorForm(new ValidatorSignUpForm());
    const formErrors = validator.validate(form);

    setErrors(formErrors);

    if(formErrors)
      return;

    try {
      const token = await authService.createUser(form);

      login(token);
      navigate("/");

      setForm({
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: ""
      });
    }
    catch(error) {
      const generalError = { generalError: error.message };
      setErrors(generalError);
    }
  }

  const handleInput = () => {
    let disabled = false;

    for(const value of Object.values(form)) {
      if(!value || !value.trim()) {
        disabled = true;
        break;
      }
    }

    setButtonDisabled(disabled);
  }

  useEffect(() => {
    updateLayout(LAYOUT_CONFIG.SIGN_UP_PAGE);
  }, []);

  useEffect(() => {
    handleInput();
  }, [form])

  return (
    <section className="registration-page">
      <div className="registration-page__title">
        <div className="registration-page__logo">
          <img
            src="/assets/img/diamondIcon.svg"
            className="registration-page__logo-diamond"
          />
          <div className="registration-page__logo-line"></div>
        </div>

        <h1 className="registration-page__title-content">Registration</h1>

        <div className="registration-page__logo">
          <div className="registration-page__logo-line"></div>
          <img
            src="/assets/img/diamondIcon.svg"
            className="registration-page__logo-diamond"
          />
        </div>
      </div>

      <form action="" className="registration-page__form" onSubmit={handleSubmit}>
        <div className="registration-page__inputs">
          <div className="registration-page__group-form">
            <input
              type="text"
              className={`registration-page__input ${(errors && errors.name) ? "registration-page__input--error" : ""}`}
              placeholder="Name"
              name="name"
              autoComplete="off"
              value={form.name}
              onChange={(e) => setForm((prevForm) => ({...prevForm, name: e.target.value}))}
            />
            { errors && errors.name && (
              <div
                className="registration-page__input-content-error"
                id="name-error"
              >
                { errors.name }
              </div>
            )}
            
          </div>

          <div className="registration-page__group-form">
            <input
              type="text"
              className={`registration-page__input ${(errors && errors.phoneNumber) ? "registration-page__input--error" : ""}`}
              placeholder="Phone Number"
              name="phone"
              autoComplete="off"
              value={form.phoneNumber}
              onChange={(e) => setForm((prevForm) => ({...prevForm, phoneNumber: e.target.value}))}
            />
            { errors && errors.phoneNumber && (
              <div
                className="registration-page__input-content-error"
                id="phone-error"
              >
                { errors.phoneNumber }
              </div>
            )}
            
          </div>

          <div className="registration-page__group-form">
            <input
              type="text"
              className={`registration-page__input ${(errors && errors.email) ? "registration-page__input--error" : ""}`}
              placeholder="Email"
              name="email"
              autoComplete="off"
              value={form.email}
              onChange={(e) => setForm((prevForm) => ({...prevForm, email: e.target.value}))}
            />
            { errors && errors.email && (
              <div
                className="registration-page__input-content-error"
                id="email-error"
              >
                { errors.email }
              </div>
            )}
            
          </div>

          <div className="registration-page__group-form">
            <input
              type="password"
              className={`registration-page__input ${(errors && errors.password) ? "registration-page__input--error" : ""}`}
              placeholder="Password"
              name="password"
              autoComplete="off"
              value={form.password}
              onChange={(e) => setForm((prevForm) => ({...prevForm, password: e.target.value}))}
            />
            { errors && errors.password && (
               <div
                className="registration-page__input-content-error"
                id="password-error"
              >
                { errors.password }
              </div>
            )}
           
          </div>

          <div className="registration-page__group-form">
            <input
              type="password"
              className={`registration-page__input ${(errors && errors.confirmPassword) ? "registration-page__input--error" : ""}`}
              placeholder="Confirm password"
              name="confirm-password"
              autoComplete="off"
              value={form.confirmPassword}
              onChange={(e) => setForm((prevForm) => ({...prevForm, confirmPassword: e.target.value}))}
            />
            { errors && errors.confirmPassword && (
              <div
                className="registration-page__input-content-error"
                id="confirm-password-error"
              >
                { errors.confirmPassword }
              </div>
            )}
           
          </div>

          <div className="registration-page__group-form">
            <input
              type="text"
              className={`registration-page__input ${(errors && errors.address) ? "registration-page__input--error" : ""}`}
              placeholder="Address"
              name="address"
              autoComplete="off"
              value={form.address}
              onChange={(e) => setForm((prevForm) => ({...prevForm, address: e.target.value}))}
            />
            { errors && errors.address && (
               <div
                className="registration-page__input-content-error"
                id="address-error"
              >
                { errors.address }
              </div>
            )}
           
          </div>
          { errors && errors.generalError && (
            <div className="registration-page__form-error">{ errors.generalError }</div>
          )}
          
        </div>

        <div className="registration-page__button">
          <FormButton title="Register" disabled={buttonDisabled}></FormButton>
        </div>
      </form>

      <Link className="registration-page__link" to="/login">Go to login instead</Link>
    </section>
  );
}

export default RegistrationPage;
