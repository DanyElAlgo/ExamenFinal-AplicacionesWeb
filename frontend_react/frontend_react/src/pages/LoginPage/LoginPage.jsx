import { useEffect, useState } from "react";
import FormButton from "../../components/formButton/FormButton";
import { useLayout } from "../../context/LayoutContext";
import { LAYOUT_CONFIG } from "../../services/conf/LayoutConfigConst";
import { Link, useNavigate } from "react-router-dom";
import ValidatorForm from "../../services/Validators/ValidatorForm";
import ValidatorLoginForm from "../../services/Validators/ValidatorLoginForm";
import authService from "../../services/Api/AuthAPI";

import "./loginPage.css";
import { useAuthContext } from "../../context/AuthContext";

function LoginPage() {
  const { updateLayout } = useLayout();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [errors, setErrors] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    updateLayout(LAYOUT_CONFIG.LOGIN_PAGE);
  }, []);

  useEffect(() => {
    handleInputForm();
  }, [form])

  const handleInputForm = () => {
    let disableButton = false;

    for(const value of Object.values(form)) {
        if(!value || !value.trim()) {
            disableButton = true;
            break; 
        }
    }

    setButtonDisabled(disableButton);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    const validator = new ValidatorForm(new ValidatorLoginForm());
    const formErrors = validator.validate(form);

    setErrors(formErrors);

    if(formErrors)
        return;


    try {
        const token = await authService.login(form);
        login(token);
        navigate("/");

        setForm({
          email: "",
          password: "",
        })
    }
    catch(error) {
        const generalError = { generalError: error.message };
        setErrors(generalError);
    }
  }

  return (
    <section className="login-page">
      <div className="login-page__title">
        <div className="login-page__logo">
          <img
            src="/assets/img/diamondIcon.svg"
            className="login-page__logo-diamond"
          />
          <div className="login-page__logo-line"></div>
        </div>

        <h1 className="login-page__title-content">Login</h1>

        <div className="login-page__logo">
          <div className="login-page__logo-line"></div>
          <img
            src="/assets/img/diamondIcon.svg"
            className="login-page__logo-diamond"
          />
        </div>
      </div>

      <form action="" className="login-page__form" onSubmit={handleSubmit}>
        <div className="login-page__group-form">
          <input
            type="text"
            className={`login-page__input ${(errors && errors.email) ? "login-page__input--error": ""}`}
            placeholder="Email"
            name="email"
            autoComplete="off"
            value={form.email}
            onChange={(e) => setForm((prevForm) => ({...prevForm, email: e.target.value}))}
          />

          { errors && errors.email && (
            <div className="login-page__input-error login-page__input-error--email">{ errors.email }</div>
          )}

        </div>

        <div className="login-page__group-form">
          <input
            type="password"
            className={`login-page__input ${(errors && errors.password) ? "login-page__input--error": ""}`}
            placeholder="Password"
            name="password"
            autoComplete="off"
            value={form.password}
            onChange={(e) => setForm((prevForm) => ({...prevForm, password: e.target.value}))}
          />

          { errors && errors.password && (
            <div className="login-page__input-error login-page__input-error--password">{ errors.password }</div>
          )}
          
        </div>

        { errors && errors.generalError && (
            <div className="login-page__form-error login-page__input-error">{ errors.generalError }</div>
        )}
        

        <div className="login-page__button">
          <FormButton title="Login" disabled={buttonDisabled}></FormButton>
        </div>
      </form>

      <Link className="login-page__link" to="/signup">Go to registration instead</Link>
    </section>
  );
}

export default LoginPage;
