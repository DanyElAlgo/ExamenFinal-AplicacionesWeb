import BaseHTMLElement from "../base/BaseHTMLElement.js";
import ValidatorForm from "../../services/Validators/ValidatorForm.js";
import ValidatorLoginForm from "../../services/Validators/ValidatorLoginForm.js";

const validator = new ValidatorForm(new ValidatorLoginForm());

class LoginPage extends BaseHTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    
    connectedCallback() {
        this.init();
    }
    
    async init() {
        await this.loadHTML("/blocks/loginPage/loginPage.template");

        const form = this.shadowRoot.querySelector(".login-page__form");

        const email = this.shadowRoot.querySelector('[name="email"]');
        const password = this.shadowRoot.querySelector('[name="password"]');
        const formButton = this.shadowRoot.querySelector("form-button");

        const linkRegistration = this.shadowRoot.querySelector(".login-page__link");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if(!this.validateForm())
                return;

            this.submitForm();
        });

        form.addEventListener("input", () => {
            if(email.value.trim() !== "" && password.value.trim() !== "") {
                formButton.dataset.state = "enable";
            }
            else {
                formButton.dataset.state = "disabled";
            }
                
        })

        linkRegistration.addEventListener("click", () => {
            globalThis.app.router.go("/signup");
        });

        
    }


    validateForm() {
        const email = this.shadowRoot.querySelector('[name="email"]');
        const password = this.shadowRoot.querySelector('[name="password"]');
        const errorEmail = this.shadowRoot.querySelector(".login-page__input-error--email");
        const errorPassword = this.shadowRoot.querySelector(".login-page__input-error--password");

        email.classList.contains("login-page__input--error") && email.classList.remove("login-page__input--error");
        password.classList.contains("login-page__input--error") && password.classList.remove("login-page__input--error");

        errorEmail.textContent = "";
        errorPassword.textContent = "";

        const errors = validator.validate({
            email: email.value,
            password: password.value
        });
        
        if(errors){
            errorEmail.textContent = (errors.email ?? "");
            errorPassword.textContent = (errors.password ?? "");
            errors.email && email.classList.add("login-page__input--error");
            errors.password && password.classList.add("login-page__input--error");

            return false;
        }
       
        return true;
    }


    submitForm() {
        const email = this.shadowRoot.querySelector('[name="email"]');
        const password = this.shadowRoot.querySelector('[name="password"]');
        const error = (Math.random() <= 0.5);

        const formError = this.shadowRoot.querySelector(".login-page__form-error");
        formError.textContent = "";
      
        if(error) {
            formError.textContent = "El correo o la contraseña es incorrecta. Intentalo de nuevo";
        }
        else {
            email.value = "";
            password.value = "";
        }
        
    }
}


customElements.define("login-page", LoginPage);
export default LoginPage;