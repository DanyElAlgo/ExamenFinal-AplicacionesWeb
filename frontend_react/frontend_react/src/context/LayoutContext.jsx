import { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export const useLayout = () => {
    const context = useContext(LayoutContext);

    if(!context)
        throw new Error("El proveedor debe ser utilizado");

    return context;
}

export const LayoutProvider = ({ children }) => {
    const [layoutConfig, setLayoutConfig] = useState({
        backgroundUrl: "/assets/img/front-page-image.jpg",
        backgroundWidth: "77%",
        backgroundHeight: "100%",
        title: "Sushi sensation",
        showSocials: true,
        showFooter: true,
        showAddbutton: true
    });

    const updateLayout = (newConfig) => {
        setLayoutConfig((prev) => ({...prev, ...newConfig}));
    }


    return (
        <LayoutContext.Provider value={{ layoutConfig, updateLayout }}>
            { children }
        </LayoutContext.Provider>
    );
}