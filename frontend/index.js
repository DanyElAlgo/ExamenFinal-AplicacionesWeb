import router from "./services/Router.js";
import Navbar from "./blocks/navbar/Navbar.js";
import FrontPage from "./blocks/frontPage/FrontPage.js";
import BadgeIcon from "./blocks/badge/Badge.js";
import ModalMenu from "./blocks/modalMenu/ModalMenu.js";
import MenuPage from "./blocks/menuPage/MenuPage.js";
import Buttton from "./blocks/button/Button.js"
import ProductCard from "./blocks/productCard/ProductCard.js";
import AboutPage from "./blocks/aboutPage/AboutPage.js";
import CartPage from "./blocks/cartPage/CartPage.js";
import FormButton from "./blocks/formButton/FormButton.js";
import LoginPage from "./blocks/loginPage/LoginPage.js"
import RegistrationPage from "./blocks/registrationPage/RegistrationPage.js";
import ReservationPage from "./blocks/reservationPage/ReservationPage.js";
import BlogPage from "./blocks/blogPage/BlogPage.js";
import BlogCard from "./blocks/blogCard/BlogCard.js";
import ContactPage from "./blocks/contactPage/ContactPage.js";
import BlogDetailPage from "./blocks/blogDetailPage/BlogDetailPage.js";
import BlogCreatePage from "./blocks/blogCreatePage/BlogCreatePage.js";

import layout from "./services/Layout.js";


globalThis.app = {};

app.isAuthenticated = false;
app.userId = -1;
app.router = router;

document.addEventListener("DOMContentLoaded", () => {
    const localStorageToken = localStorage.getItem("token");

    if(localStorageToken) {
        const userId = JSON.parse(atob(localStorageToken.split(".")[1])).id;
        app.isAuthenticated = true;
        app.userId = userId
    }

    app.router.init();
    layout.init();
    layout.addListeners();
});

document.addEventListener("reload-layout", () => {
    layout.init();
})

document.addEventListener("sign-out", () => {
    localStorage.removeItem("token");
    app.userId = -1;
    app.isAuthenticated = false;
    layout.init();
    globalThis.app.router.go("/");
})
