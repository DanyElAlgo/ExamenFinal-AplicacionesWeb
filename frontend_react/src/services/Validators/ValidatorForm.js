class ValidatorForm {

    #strategy = null;

    constructor(strategy) {
        this.#strategy = strategy;
    }

    validate(form) {

        if(this.#strategy == null)
            throw new Error("No existe una estrategia para validar el formulario");

        return this.#strategy.validate(form);
    }

    setStrategy(strategy) {
        this.#strategy = strategy;
    }

}

export default ValidatorForm;