export const LAYOUT_COMMAND = {
    CHANGE_BACKGROUND: 'change-background',
    TOGGLE_SOCIALS: 'toggle-socials',
    CHANGE_TITLE: 'change-title',
    TOGGLE_ADD_BUTTON: 'toggle-add-button',
    TOGGLE_FOOTER: 'toggle-footer'
};


export const LayoutCommandExecutor = {

    execute(command) {
        const layoutPage = document.querySelector('.layout-page');

        switch(command.name){
            case LAYOUT_COMMAND.CHANGE_BACKGROUND:
                const wrapper = layoutPage.querySelector(".layout-page__image-wrapper");
            
                if(!wrapper)
                    return;

                wrapper.style.setProperty("--image-url", `url(${command.args.url ?? ''})`);
                wrapper.style.setProperty("--image-width", `${command.args.width ?? '100%'}`);
                wrapper.style.setProperty("--image-height", `${command.args.height ?? '100%' }` )
                break;

            case LAYOUT_COMMAND.TOGGLE_SOCIALS:
                const socials = layoutPage.querySelector(".layout-page__socials");

                if(!socials)
                    return;

                socials.style.setProperty("--socials-display", `${command.args.show ? 'flex' : 'none'}`);
                break;

            case LAYOUT_COMMAND.CHANGE_TITLE:
                const titleElement = layoutPage.querySelector(".layout-page__title");

                if(!titleElement)
                    return;

                titleElement.innerText = command.args.title;
                break;

            case LAYOUT_COMMAND.TOGGLE_ADD_BUTTON:
                const addButton = layoutPage.querySelector(".layout-page__add-button");

                if(!addButton)
                    return;

                if(command.args.show === false){
                    addButton.style.setProperty("--add-button-display", `none`);
                }  
                else {
                    addButton.style.setProperty("--add-button-display", `flex`);
                    addButton.dataset.productId = command.args.productId;
                }

                break;
            
            case LAYOUT_COMMAND.TOGGLE_FOOTER:
                const footer = layoutPage.querySelector("footer");

                if(!footer)
                    return;

                footer.style.setProperty("--display-footer", `${command.args.show ? 'flex' : 'none'}`)
                break;
            
        }   
    },

    multipleExecute(commands) {
        for(const command of commands) {
            this.execute(command);
        }
            
    }
}