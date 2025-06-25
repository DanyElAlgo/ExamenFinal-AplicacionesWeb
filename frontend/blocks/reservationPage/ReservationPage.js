import BaseHTMLElement from "../base/BaseHTMLElement.js"
import authService from "../../services/AuthService.js";
import ValidatorForm from "../../services/Validators/ValidatorForm.js";
import ValidatorWithoutSession from "../../services/Validators/ValidatorWithoutSession.js";
import ValidatorWithSessionForm from "../../services/Validators/ValidatorWithSessionForm.js";


const validator = new ValidatorForm();

class ReservationPage extends BaseHTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.init();
    }

    async init(){ 
        await this.loadHTML("/blocks/reservationPage/reservationPage.template");

        const form = this.shadowRoot.querySelector(".reservation-page__form");

        if(authService.isLoggedIn()) {
            const inputs = this.shadowRoot.querySelector(".reservation-page__form-without-session");
            inputs.style.display = 'none';
        }

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            this.validateForm();
        })

    }


    validateForm() {
        const inputs = this.shadowRoot.querySelectorAll(".reservation-page__input");
        const errorMessages = this.shadowRoot.querySelectorAll(".reservation-page__input-content-error");

        for(const input of inputs) {
            input.classList.contains("reservation-page__input--error") && input.classList.remove("reservation-page__input--error");
        }

        for(const errorMessage of errorMessages){
            errorMessage.textContent = "";
        }

        let validForm = false;

        if(!authService.isLoggedIn()) {
            validForm = this.validateWithoutSessionForm();
            validForm = this.validateWithSessionForm() & validForm;
        }   
        else
            validForm = this.validateWithSessionForm();


        if(!validForm)
            return;

        this.submitForm();
       
    }


    validateWithSessionForm() {
        const guestsInput = this.shadowRoot.querySelector('[name="guests"]');
        const dateInput = this.shadowRoot.querySelector('[name="date"]');
        const timeInput = this.shadowRoot.querySelector('[name="time"]');

        const guestsError = this.shadowRoot.getElementById("guests-error");
        const dateError = this.shadowRoot.getElementById("date-error");
        const timeError = this.shadowRoot.getElementById("time-error");
        
        validator.setStrategy(new ValidatorWithSessionForm());

        const errors = validator.validate({
            guests: guestsInput.value,
            date: dateInput.value,
            time: timeInput.value
        });

        if(errors) {
            errors.guests && guestsInput.classList.add("reservation-page__input--error");
            errors.date && dateInput.classList.add("reservation-page__input--error");
            errors.time && timeInput.classList.add("reservation-page__input--error");

            guestsError.textContent = errors.guests ?? "";
            dateError.textContent = errors.date ?? "";
            timeError.textContent = errors.time ?? "";

            return false;
        }

        return true;
    }

    validateWithoutSessionForm() {
        const nameInput = this.shadowRoot.querySelector('[name="name"]');
        const phoneInput = this.shadowRoot.querySelector('[name="phone"]');
        const emailInput = this.shadowRoot.querySelector('[name="email"]');

        const nameError = this.shadowRoot.getElementById("name-error");
        const phoneError = this.shadowRoot.getElementById("phone-error");
        const emailError = this.shadowRoot.getElementById("email-error");

        
        validator.setStrategy(new ValidatorWithoutSession());

        const errors = validator.validate({
            name: nameInput.value,
            phone: phoneInput.value,
            email: emailInput.value
        });

        if(errors) {
            errors.name && nameInput.classList.add("reservation-page__input--error");
            errors.phone && phoneInput.classList.add("reservation-page__input--error");
            errors.email && emailInput.classList.add("reservation-page__input--error");

            nameError.textContent = errors.name ?? "";
            phoneError.textContent = errors.phone ?? "";
            emailError.textContent = errors.email ?? "";

            return false;
        }


        return true;
    }

    submitForm(){ 
        let success = false;
        const error = this.shadowRoot.getElementById("form-error");
        error.textContent = "";

        if(authService.isLoggedIn())
            success = this.submitWithSession();
        else 
            success = this.submitWithoutSession();

        if(!success){
            error.textContent = "Hubo un error al reservar. Intentalo denuevo";
        }

        const inputs = this.shadowRoot.querySelectorAll(".reservation-page__input");

        for(const input of inputs)
            input.value = "";

    }

    submitWithoutSession() {

        return false;
    }


    submitWithSession() {
       
        return false;
    }
}

customElements.define("reservation-page", ReservationPage);
export default ReservationPage;