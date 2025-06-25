class ValidatorLoginForm {

    validate(form) {
        let errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(form.email == null || !form.email.trim()) {
            errors.email = "El correo es requerido";
        }
        else if(!regex.test(form.email)) {
            errors.email = "El correo es invalido";
        }

        if(form.password == null || !form.password.trim()) {
            errors.password = "La contraseña es requerida";
        }

        if(Object.keys(errors).length === 0)
            errors = null

        return errors;
    }
}

export default ValidatorLoginForm;