import { createBrowserRouter } from "react-router-dom";
import FrontPage from "./pages/FrontPage/FrontPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ReservationPage from "./pages/ReservationPage/ReservationPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import CartPage from "./pages/CartPage/CartPage";
import BlogDetailPage from "./pages/BlogDetailPage/BlogDetailPage";
import LayoutPage from "./pages/LayoutPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPage />,
        children: [
            {
                index: true,
                element: <FrontPage />
            },
            {
                path: "/menu",
                element: <MenuPage />
            },
            {
                path: "/about",
                element: <AboutPage />
            },
            {
                path: "/book",
                element: <ReservationPage />
            },
            {
                path: "/contact",
                element: <ContactPage />
            },
            {
                path: "/blog",
                element: <BlogPage />
            },
            {
                path: "/signup",
                element: <RegistrationPage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/cart",
                element: <CartPage />
            },
            {
                path: "/blog/:id",
                element: <BlogDetailPage />
            }
        ]
    }

]);

export default router;