import React, { useContext } from "react";
import { CartContext } from '../contexts/CartContext';
import { AppContext } from '../contexts/AppContext';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const FurnitureCard = ({ item }) => {
  const { addToCart } = useContext(CartContext);   // ✅ use CartContext
  const { user } = useContext(AppContext);         // ✅ use AppContext for user
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("You need to log in to add items to your cart.");
      navigate("/login");
      return;
    }

    addToCart(item);
    toast.success(`${item.name} added to your cart! 🛒`);
  };

  return (
    <div className="flex justify-center p-1">
      <div className="w-[300px] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
        <div className="relative">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-48 object-cover"
          />
          {item.discountLabel && (
            <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {item.discountLabel}
            </span>
          )}
        </div>

        <div className="p-5 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
            <p className="text-gray-500 mt-1">{item.description}</p>
          </div>

          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">₹{item.price}</p>
              {item.originalPrice && (
                <p className="text-sm text-gray-500 line-through">
                  ₹{item.originalPrice}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <div className="text-yellow-400">★★★★</div>
              <div className="text-gray-300">★</div>
              <span className="text-sm text-gray-600 ml-1">
                ({item.rating})
              </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FurnitureCard;
