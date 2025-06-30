class ValidatorWithoutSession {

    validate(form) {
        let errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{8}$/;

        if(form.name == null || !form.name.trim())
            errors.name = "The name is required";

        if(form.phoneNumber == null || !form.phoneNumber.trim())
            errors.phoneNumber = "The phone is required";
        else if(!phoneRegex.test(form.phoneNumber))
            errors.phoneNumber = "The phone is invalid. It must have 8 digits";

        if(form.email == null || !form.email.trim())
            errors.email = "The email is required";
        else if(!emailRegex.test(form.email))
            errors.email = "The email is invalid";

        if(form.guests == null || !form.guests.trim())
            errors.guests = "At least one guest is required to book";

        if(form.date == null || !form.date.trim())
            errors.date = "Invalid date";

        if(form.time == null || !form.time.trim())
            errors.time = "Invalid time";

        if(Object.keys(errors).length === 0)
            return null;

        return errors;
    }
}


export default ValidatorWithoutSession;