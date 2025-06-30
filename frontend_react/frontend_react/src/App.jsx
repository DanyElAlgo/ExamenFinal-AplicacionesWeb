import { RouterProvider } from "react-router-dom"
import router from "./router"
import { LayoutProvider } from "./context/LayoutContext"
import { AuthContextProvider } from "./context/AuthContext"
import { CartContextProvider } from "./context/CartContext"

function App() {
  
  return (
    <>
      <AuthContextProvider>
        <CartContextProvider>
          <LayoutProvider>
            <RouterProvider router={router}/>
          </LayoutProvider>
        </CartContextProvider>
      </AuthContextProvider>
      
    </>
  )
}

export default App
