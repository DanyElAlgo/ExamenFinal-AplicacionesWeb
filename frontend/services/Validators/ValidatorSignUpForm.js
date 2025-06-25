class ValidatorSignUpForm {

    validate(form) {
        let errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{8}$/;

        if(form.name == null || !form.name.trim())
            errors.name = "The name is required";

        if(form.phone == null || !form.phone.trim())
            errors.phone = "The phone is required";
        else if(!phoneRegex.test(form.phone))
            errors.phone = "The phone must only contain 8 digits";


        if(form.email == null || !form.email.trim())
            errors.email = "The email is required";
        else if(!emailRegex.test(form.email))
            errors.email = "The email is invalid";

        if(form.password == null || !form.password.trim())
            errors.password = "The password is required";

        if(form.confirmPassword == null || !form.confirmPassword.trim())
            errors.confirmPassword = "The confirm password is required";
        else if(form.confirmPassword != form.password)
            errors.confirmPassword = "Passwords do not match";

        if(form.address == null || !form.address.trim())
            errors.address = "Include an address for delivery";


        if(Object.keys(errors).length === 0)
            errors = null;

        return errors;
    }
}


export default ValidatorSignUpForm;