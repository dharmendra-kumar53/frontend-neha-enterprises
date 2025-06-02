import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { furnitureItems } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // On component mount: check for token, validate user & load cart
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      axios
        .get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${localToken}` },
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
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse saved cart:", e);
        setCart([]);
      }
    }
  }, []);

  // Add item to cart and persist in localStorage
  const addToCart = (item) => {
    setCart((prev) => {
      const updatedCart = [...prev, item];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Remove item from cart by id
  const removeFromCart = (itemId) => {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item._id !== itemId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Clear entire cart and persist empty cart
  const clearCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  // Handle login: set user & token, save to localStorage, redirect
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
      setTimeout(() => navigate(redirectPath), 100);
    } else {
      navigate("/cart");
    }
  };

  // Handle logout: clear all and redirect to home
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken("");
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
    navigate("/");
  };

  // Provide all state and handlers via context
  const value = {
    furnitureItems,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    user,
    setUser,
    token,
    setToken,
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
