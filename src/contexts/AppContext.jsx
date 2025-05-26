import React, { createContext, useEffect, useState } from "react";
import axios from "axios"; // axios import add kiya
import { furnitureItems } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // On mount: check localStorage for token, validate token by fetching profile,
  // and load cart from localStorage
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      axios
        .get("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        })
        .then((res) => {
          setUser(res.data.user);
          setToken(localToken);
        })
        .catch((err) => {
          console.error("Auto-login failed:", err);
          localStorage.clear();
          setUser(null);
          setToken("");
        });
    }

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Add item to cart and save in localStorage
  const addToCart = (item) => {
    setCart((prev) => {
      const updatedCart = [...prev, item];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Login handler: sets token, user and redirects
  const login = (userData) => {
    if (!userData || !userData.user || !userData.token) {
      console.error("Invalid login data:", userData);
      return;
    }

    setToken(userData.token);
    setUser(userData.user);

    localStorage.setItem("token", userData.token);
    localStorage.setItem("userEmail", userData.user.email);
    localStorage.setItem("userName", userData.user.name);

    const redirectPath = localStorage.getItem("redirectAfterLogin");
    if (redirectPath) {
      localStorage.removeItem("redirectAfterLogin");
      setTimeout(() => {
        navigate(redirectPath);
      }, 100);
    } else {
      navigate("/cart");
    }
  };

  // Logout handler: clear all and redirect home
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken("");
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
    navigate("/");
  };

  // Clear cart function
  const clearCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  // Context value to share
  const value = {
    furnitureItems,
    cart,
    addToCart,
    user,
    setUser,
    token,
    setToken,
    login,
    logout,
    clearCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
