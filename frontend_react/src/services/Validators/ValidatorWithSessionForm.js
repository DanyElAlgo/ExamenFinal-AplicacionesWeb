class ValidatorWithSessionForm {

    validate(form) {
        let errors = {};

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


export default ValidatorWithSessionForm;