import React, { useState, useContext } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { CartContext } from '../contexts/CartContext';
import { AppContext } from '../contexts/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const { cartItems } = useContext(CartContext); // ✅ Use inside the component
  const { token, logout } = useContext(AppContext); // ✅ Same here

  return (
    <div className='sticky top-0 z-50 bg-white flex items-center justify-between text-sm py-5 mb-6 border-b border-b-gray-400'>
      
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className='w-70 cursor-pointer'
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Navbar links */}
      <ul className='hidden md:flex items-center justify-center gap-12 font-medium text-lg'>
        <li><NavLink to="/" className={({ isActive }) => isActive ? "text-indigo-600 font-semibold" : "text-gray-700"}>HOME</NavLink></li>
        <li><NavLink to="/furnitures" className={({ isActive }) => isActive ? "text-indigo-600 font-semibold" : "text-gray-700"}>ALL FURNITURE</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? "text-indigo-600 font-semibold" : "text-gray-700"}>ABOUT</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => isActive ? "text-indigo-600 font-semibold" : "text-gray-700"}>CONTACT</NavLink></li>
      </ul>

      {/* Right Side */}
      <div className='flex items-center gap-4'>

        {/* Cart */}
        <div
        className="relative flex items-center gap-1 cursor-pointer"
        onClick={() => navigate('/cart')}
      >
        <img src={assets.cart_icon} alt="Cart" className="w-6 h-6" />
        <span className="text-gray-700">Cart</span>
        {cartItems.length > 0 && (
          <span className="absolute top-[-6px] right-[-10px] bg-red-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow">
            {cartItems.length}
          </span>
        )}
      </div>

        {/* User Menu */}
        {token ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-6 rounded-full' src={assets.profile_pic} alt="User Icon" />
            <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown Icon" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4'>
                <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('/my-orders')} className='hover:text-black cursor-pointer'>My Order</p>
                <p className='text-red-500 cursor-pointer' onClick={() => { logout(); navigate('/'); setShowMenu(false); }}>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-700 text-white px-8 py-3 mr-2 rounded-full font-light hidden md:block"
          >
            Create account
          </Link>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className='w-6 md:hidden'
          src={assets.menu_icon}
          alt="Menu Icon"
        />

        {/* Mobile Side Menu */}
        {showMenu && (
          <div className="fixed top-0 right-0 w-3/4 h-full bg-white z-30 p-6 shadow-lg md:hidden">
            <div className="flex justify-end">
              <button onClick={() => setShowMenu(false)} className="text-xl font-bold">×</button>
            </div>
            <ul className="flex flex-col gap-6 mt-8 text-lg font-medium">
              <li><Link to="/" onClick={() => setShowMenu(false)}>Home</Link></li>
              <li><Link to="/furnitures" onClick={() => setShowMenu(false)}>All Furniture</Link></li>
              <li><Link to="/about" onClick={() => setShowMenu(false)}>About</Link></li>
              <li><Link to="/contact" onClick={() => setShowMenu(false)}>Contact</Link></li>

              {!token ? (
                <li>
                  <Link to="/login" onClick={() => setShowMenu(false)} className="bg-blue-700 text-white px-8 py-3 rounded-full font-light block text-center">Create account</Link>
                </li>
              ) : (
                <>
                  <li><Link to="/my-profile" onClick={() => setShowMenu(false)}>My Profile</Link></li>
                  <li><Link to="/my-orders" onClick={() => setShowMenu(false)}>My Order</Link></li>
                  <li><button onClick={() => { logout(); navigate('/'); setShowMenu(false); }} className="text-red-500 text-left w-full">Logout</button></li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
