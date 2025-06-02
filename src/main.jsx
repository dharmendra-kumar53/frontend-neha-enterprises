import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AppContextProvider from "./contexts/AppContext"; // adjust this path as per your project
import { CartProvider } from "./contexts/CartContext"; // only if you still need this
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <CartProvider> {/* Optional: remove if not needed */}
          <App />
        </CartProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
