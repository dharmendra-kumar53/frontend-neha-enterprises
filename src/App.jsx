// src/App.jsx
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyOrder from "./pages/MyOrder";
import Login from "./pages/Login";
import Furnitures from "./pages/Furnitures";
import Product from "./components/Product";
import CartPage from "./pages/CartPage";
import AddressPage from "./pages/AddressPage";
import PaymentPage from "./pages/PaymentPage";
// import OrderSuccessPage from "./pages/OrderSuccessPage";

// Context
import AppProvider, { AppContext } from "./contexts/AppContext";

// AppRoutes component to access context
function AppRoutes() {
  const { user } = useContext(AppContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/furnitures" element={<Furnitures />} />
      <Route path="/furnitures/:speciality?" element={<Furnitures />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Protected Routes */}
      <Route
        path="/my-profile"
        element={user ? <MyProfile /> : <Navigate to="/login" />}
      />
      <Route
        path="/my-orders"
        element={user ? <MyOrder /> : <Navigate to="/login" />}
      />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/address" element={<AddressPage />} />
      {/* <Route path="/order-success" element={<OrderSuccessPage />} /> */}


      {/* Payment Route - Protected */}
      <Route
        path="/payment"
        element={user ? <PaymentPage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <div className="mx-4 sm:mx-[10%]">
        <Navbar />
        <AppRoutes />
        <Footer />
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </AppProvider>
  );
}

export default App;
