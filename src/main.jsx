import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AppContextProvider from "./contexts/AppContext";
import { CartProvider } from "./contexts/CartContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Router should be at the top */}
      <AppContextProvider> {/* ✅ Now this can safely use useNavigate */}
        <CartProvider>
          <App />
        </CartProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
