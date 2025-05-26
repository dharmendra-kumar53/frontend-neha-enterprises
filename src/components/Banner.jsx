import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { CartContext } from '../contexts/CartContext';
import { AppContext } from '../contexts/AppContext';  // To get user info
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const trendingItems = [
    {
      id: 1,
      name: 'Modern Sofa',
      price: 499.99,
      image: assets.trending1,
    },
    {
      id: 2,
      name: 'Wooden Chair',
      price: 149.99,
      image: assets.trending2,
    },
    {
      id: 3,
      name: 'Dining Table',
      price: 299.99,
      image: assets.trending3,
    },
  ];

  const handleBuyNow = (item) => {
    if (!user) {
      alert("Please login to add items to your cart!");
      navigate('/login');  // Redirect to login page
      return;
    }

    addToCart(item);
    alert(`{item.name} has been added to your cart!`);
  };

  return (
    <div className="flex justify-center my-20 px-4">
      <div className="max-w-screen-xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#262626]">Trending Furniture</h1>
          <p className="text-lg text-gray-600 mt-3 sm:w-2/3 mx-auto">
            Simply browse through our extensive list of trusted Furniture.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-0">
          {trendingItems.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
              onClick={() => handleBuyNow(item)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover transform hover:scale-105 transition duration-300"
              />
              <div className="p-4 text-center bg-white">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600 mt-1">₹{item.price}</p>
                <p className="text-green-600 mt-2 font-medium">Click image to Buy Now</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
