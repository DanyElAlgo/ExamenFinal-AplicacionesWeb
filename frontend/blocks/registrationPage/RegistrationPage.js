import BaseHTMLElement from "../base/BaseHTMLElement.js";
import ValidatorForm from "../../services/Validators/ValidatorForm.js";
import ValidatorSignUpForm from "../../services/Validators/ValidatorSignUpForm.js";

const validator = new ValidatorForm(new ValidatorSignUpForm());

class RegistrationPage extends BaseHTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.init();
    }

    async init() {
        await this.loadHTML("/blocks/registrationPage/registrationPage.template");

        const form = this.shadowRoot.querySelector(".registration-page__form");
        const formButton = this.shadowRoot.querySelector("form-button");

        const inputs = Array.from(this.shadowRoot.querySelectorAll(".registration-page__input"));
        const link = this.shadowRoot.querySelector(".registration-page__link");

        link.addEventListener("click", () => {
            globalThis.app.router.go("/login");
        })

        form.addEventListener("input", () => {
            let formFilled = true;

            for(let input of inputs) {
                if(input.value == null || !input.value.trim()){
                    formFilled = false;
                }
            }

            if(formFilled){
                formButton.dataset.state = "enabled";
            }
            else {
                formButton.dataset.state = "disabled";
            }
        });

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if(!this.validateForm())
                return;

            this.submitForm();
        })
    }

    validateForm() {
        const inputs = Array.from(this.shadowRoot.querySelectorAll(".registration-page__input"));
        const errorMessages = Array.from(this.shadowRoot.querySelectorAll(".registration-page__input-content-error"));

        for(let input of inputs) {
            input.classList.contains("registration-page__input--error") && input.classList.remove("registration-page__input--error");
        }

        for(let message of errorMessages){
            message.textContent = "";
        }

        const nameInput = this.shadowRoot.querySelector('[name="name"]');
        const phoneInput = this.shadowRoot.querySelector('[name="phone"]');
        const emailInput = this.shadowRoot.querySelector('[name="email"]');
        const passwordInput = this.shadowRoot.querySelector('[name="password"]');
        const confirmPasswordInput = this.shadowRoot.querySelector('[name="confirm-password"]');
        const addressInput = this.shadowRoot.querySelector('[name="address"]');


        const nameError = this.shadowRoot.getElementById("name-error");
        const phoneError = this.shadowRoot.getElementById("phone-error");
        const emailError = this.shadowRoot.getElementById("email-error");
        const passwordError = this.shadowRoot.getElementById("password-error");
        const confirmPasswordError = this.shadowRoot.getElementById("confirm-password-error");
        const addressError = this.shadowRoot.getElementById("address-error");


        const errors = validator.validate({
            name: nameInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            confirmPassword: confirmPasswordInput.value,
            address: addressInput.value
        });

        if(errors) {

            errors.name && nameInput.classList.add("registration-page__input--error");
            errors.phone && phoneInput.classList.add("registration-page__input--error");
            errors.email && emailInput.classList.add("registration-page__input--error");
            errors.password && passwordInput.classList.add("registration-page__input--error");
            errors.confirmPassword && confirmPasswordInput.classList.add("registration-page__input--error");
            errors.address && addressInput.classList.add("registration-page__input--error");

            nameError.textContent = errors.name ?? "";
            phoneError.textContent = errors.phone ?? "";
            emailError.textContent = errors.email ?? "";
            passwordError.textContent = errors.password ?? "";
            confirmPasswordError.textContent = errors.confirmPassword ?? "";
            addressError.textContent = errors.address ?? "";

            return false;
        }

        return true;
    }


    submitForm() {
    
        const formError = this.shadowRoot.querySelector(".registration-page__form-error");
        formError.textContent = "";

        const hasError = Math.random() < 0.5;

        if(hasError) {
            formError.textContent = "Email is already in use";
        }
        else {
           const inputs = Array.from(this.shadowRoot.querySelectorAll(".registration-page__input"));

           for(const input of inputs)
                input.value = "";
        }
    }

}


customElements.define("registration-page", RegistrationPage);
export default RegistrationPage;