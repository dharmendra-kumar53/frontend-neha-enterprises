import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../contexts/AppContext';
import { CartContext } from '../contexts/CartContext';

const CartPage = () => {
  const { user } = useContext(AppContext);
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const handleBuyNow = () => {
  if (!user) {
    toast.error("Please login to proceed with your order!");
    navigate('/login');
    return;
  }

  toast.success("Redirecting to address page...");
  navigate('/address'); // Redirecting to address input page first
};


  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  const increment = (id) => {
    const item = cartItems.find(i => i.id === id);
    if (item) updateQuantity(id, (item.quantity || 1) + 1);
  };

  const decrement = (id) => {
    const item = cartItems.find(i => i.id === id);
    if (item && (item.quantity || 1) > 1) {
      updateQuantity(id, (item.quantity || 1) - 1);
    }
  };

  return (
    <div className="min-h-[80vh] p-4 sm:p-8 bg-gray-50">
      <h1 className="text-3xl font-semibold mb-6">My Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">
          <p className="text-xl mb-4">🛒 Your cart is empty.</p>
          <button
            onClick={() => navigate('/furnitures')}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Explore Furniture
          </button>
        </div>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg shadow-sm bg-white"
            >
              <div className="flex items-center gap-4 w-full sm:w-2/3">
                <img
                  src={item.image || '/default-image.jpg'}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-gray-600 text-sm">Price: ₹{item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 sm:mt-0">
                <button
                  onClick={() => decrement(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="px-4 text-lg font-medium">{item.quantity || 1}</span>
                <button
                  onClick={() => increment(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>

              <div className="mt-4 sm:mt-0">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 border border-red-600 px-4 py-1 rounded hover:bg-red-600 hover:text-white transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}

          {/* Summary section */}
          <div className="mt-8 border-t pt-6 text-right max-w-4xl mx-auto">
            <p className="text-lg mb-2">Total Items: <strong>{totalItems}</strong></p>
            <p className="text-xl font-bold">Total Price: ₹{totalPrice.toFixed(2)}</p>
            <button
              onClick={handleBuyNow}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Proceed to Buy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
