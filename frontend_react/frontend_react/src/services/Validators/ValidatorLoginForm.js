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
        else if(form.password.length <= 4) {
            errors.password = "La contraseña no debe ser menor a 6 caracteres";
        }

        if(Object.keys(errors).length === 0)
            errors = null

        return errors;
    }
}

export default ValidatorLoginForm;