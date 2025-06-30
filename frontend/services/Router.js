import Command from "./Command/Command.js";
import { IMAGE_PAGES } from "./conf/ImagePagesConst.js";
import { LAYOUT_COMMAND, LayoutCommandExecutor } from "./Command/LayoutCommand.js";

class Router {

    init() {
        window.addEventListener("popstate", (event) => {
            event.preventDefault();
            this.go(event.state.route, false);
        });

        this.go(location.pathname);
    }
    
    go(route, addToHistory = true) {

        if(addToHistory)
            history.pushState({ route }, "", route);

        const mainContent = document.querySelector(".layout-page__content-main");
        let contentElement = null;
        const pageConfig = {};

        switch(route) {
            case "/":
                contentElement = document.createElement("front-page");
                pageConfig.url = IMAGE_PAGES.FRONT_PAGE.url;
                pageConfig.title = IMAGE_PAGES.FRONT_PAGE.title;
                pageConfig.width = IMAGE_PAGES.FRONT_PAGE.width;
                pageConfig.height = IMAGE_PAGES.FRONT_PAGE.height;
                pageConfig.socials = IMAGE_PAGES.FRONT_PAGE.socials;
                pageConfig.footer = IMAGE_PAGES.FRONT_PAGE.footer;

                break;

            case "/menu":
                contentElement = document.createElement("menu-page");
                pageConfig.url = IMAGE_PAGES.MENU_PAGE.url;
                pageConfig.title = IMAGE_PAGES.MENU_PAGE.title;
                pageConfig.width = IMAGE_PAGES.MENU_PAGE.width;
                pageConfig.height = IMAGE_PAGES.MENU_PAGE.height;
                pageConfig.socials = IMAGE_PAGES.MENU_PAGE.socials;
                pageConfig.footer = IMAGE_PAGES.MENU_PAGE.footer;

                break;

            case "/about":
                contentElement = document.createElement("about-page");
                pageConfig.url = IMAGE_PAGES.ABOUT_PAGE.url;
                pageConfig.title = IMAGE_PAGES.ABOUT_PAGE.title;
                pageConfig.width = IMAGE_PAGES.ABOUT_PAGE.width;
                pageConfig.height = IMAGE_PAGES.ABOUT_PAGE.height;
                pageConfig.socials = IMAGE_PAGES.ABOUT_PAGE.socials;
                pageConfig.footer = IMAGE_PAGES.ABOUT_PAGE.footer;
                break;
            case "/book":
                contentElement = document.createElement("reservation-page");
                pageConfig.url = IMAGE_PAGES.BOOK_TABLE_PAGE.url;
                pageConfig.title = IMAGE_PAGES.BOOK_TABLE_PAGE.title;
                pageConfig.width = IMAGE_PAGES.BOOK_TABLE_PAGE.width;
                pageConfig.height = IMAGE_PAGES.BOOK_TABLE_PAGE.height;
                pageConfig.socials = IMAGE_PAGES.BOOK_TABLE_PAGE.socials;
                pageConfig.footer = IMAGE_PAGES.BOOK_TABLE_PAGE.footer;

                break;
            case "/contact":
                contentElement = document.createElement("contact-page");
                pageConfig.url = IMAGE_PAGES.CONTACT_PAGE.url;
                pageConfig.title = IMAGE_PAGES.CONTACT_PAGE.title;
                pageConfig.width = IMAGE_PAGES.CONTACT_PAGE.width;
                pageConfig.height = IMAGE_PAGES.CONTACT_PAGE.height;
                pageConfig.socials = IMAGE_PAGES.CONTACT_PAGE.socials;
                pageConfig.footer = IMAGE_PAGES.CONTACT_PAGE.footer;
                break;
                
            case "/blog":
                contentElement = document.createElement("blog-page");
                pageConfig.url = IMAGE_PAGES.BLOG_PAGE.url;
                pageConfig.title = IMAGE_PAGES.BLOG_PAGE.title;
                pageConfig.width = IMAGE_PAGES.BLOG_PAGE.width;
                pageConfig.height = IMAGE_PAGES.BLOG_PAGE.height;
                pageConfig.socials = IMAGE_PAGES.BLOG_PAGE.socials;
                pageConfig.footer = IMAGE_PAGES.BLOG_PAGE.footer;
                break;
            case "/signup":
                contentElement = document.createElement("registration-page");
                pageConfig.url = IMAGE_PAGES.SIGN_UP_PAGE.url;
                pageConfig.title = IMAGE_PAGES.SIGN_UP_PAGE.title;
                pageConfig.width = IMAGE_PAGES.SIGN_UP_PAGE.width;
                pageConfig.height = IMAGE_PAGES.SIGN_UP_PAGE.height;
                pageConfig.socials = IMAGE_PAGES.SIGN_UP_PAGE.socials;
                pageConfig.footer = IMAGE_PAGES.SIGN_UP_PAGE.footer; 
                break;
            case "/login":
                contentElement = document.createElement("login-page");
                pageConfig.url = IMAGE_PAGES.LOGIN_PAGE.url;
                pageConfig.title = IMAGE_PAGES.LOGIN_PAGE.title;
                pageConfig.width = IMAGE_PAGES.LOGIN_PAGE.width;
                pageConfig.height = IMAGE_PAGES.LOGIN_PAGE.height;
                pageConfig.socials = IMAGE_PAGES.LOGIN_PAGE.socials;
                pageConfig.footer = IMAGE_PAGES.LOGIN_PAGE.footer;
                break;

            case "/cart":
                contentElement = document.createElement("cart-page");
                pageConfig.url = IMAGE_PAGES.CART_PAGE.url;
                pageConfig.title = IMAGE_PAGES.CART_PAGE.title;
                pageConfig.width = IMAGE_PAGES.CART_PAGE.width;
                pageConfig.height = IMAGE_PAGES.CART_PAGE.height;
                pageConfig.socials = IMAGE_PAGES.CART_PAGE.socials;
                pageConfig.footer = IMAGE_PAGES.CART_PAGE.footer;
                break;

            case "/blog/create":
                contentElement = document.createElement("blog-create-page");
                pageConfig.url = IMAGE_PAGES.BLOG_CREATE_PAGE.url;
                pageConfig.title = IMAGE_PAGES.BLOG_CREATE_PAGE.title;
                pageConfig.width = IMAGE_PAGES.BLOG_CREATE_PAGE.width;
                pageConfig.height = IMAGE_PAGES.BLOG_CREATE_PAGE.height;
                pageConfig.socials = IMAGE_PAGES.BLOG_CREATE_PAGE.socials;
                pageConfig.footer = IMAGE_PAGES.BLOG_CREATE_PAGE.footer;

                break;

            default:
                if(route.startsWith("/blog/")) {
                    contentElement = document.createElement("blog-detail-page");
                    const paramId = route.substring(route.lastIndexOf("/") + 1);
                    contentElement.dataset.blogId = paramId;

                    pageConfig.url = IMAGE_PAGES.BLOG_DETAIL_PAGE.url;
                    pageConfig.title = IMAGE_PAGES.BLOG_DETAIL_PAGE.title;
                    pageConfig.width = IMAGE_PAGES.BLOG_DETAIL_PAGE.width;
                    pageConfig.height = IMAGE_PAGES.BLOG_DETAIL_PAGE.height;
                    pageConfig.socials = IMAGE_PAGES.BLOG_DETAIL_PAGE.socials;
                    pageConfig.footer = IMAGE_PAGES.BLOG_DETAIL_PAGE.footer;
                }
                
                break;

        }

        if(!contentElement)
            return;
        

        if(mainContent.firstElementChild)
            mainContent.firstElementChild.remove();

        mainContent.appendChild(contentElement);

        const commands = [];
        commands.push(new Command(LAYOUT_COMMAND.CHANGE_BACKGROUND, { url: pageConfig.url, width: pageConfig.width, height: pageConfig.height }));
        commands.push(new Command(LAYOUT_COMMAND.CHANGE_TITLE, { title: pageConfig.title }));
        commands.push(new Command(LAYOUT_COMMAND.TOGGLE_SOCIALS, { show: pageConfig.socials }));
        commands.push(new Command(LAYOUT_COMMAND.TOGGLE_ADD_BUTTON, { show: false }));
        commands.push(new Command(LAYOUT_COMMAND.TOGGLE_FOOTER, { show: pageConfig.footer }));

        LayoutCommandExecutor.multipleExecute(commands);

        window.scrollY = 0;
        window.scrollX = 0;
    }


    
    
}


const router = new Router();
export default router;