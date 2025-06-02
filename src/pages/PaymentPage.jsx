import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Receive cartItems and deliveryAddress via react-router location.state
  const cartItems = location.state?.cartItems || [];
  const deliveryAddress = location.state?.deliveryAddress || {};

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.price * (item.quantity || 1)),
    0
  );

  // Place order with Cash on Delivery
  const handlePlaceOrderCOD = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please login to place an order.');
      navigate('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount: totalPrice,
          deliveryAddress: deliveryAddress,
          paymentMode: 'COD',
        }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();

      if (data.success) {
        alert('Order placed successfully with Cash on Delivery!');
        navigate('/my-orders');
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('❌ COD Order Error:', error);
      alert('Something went wrong while placing the order.');
    }
  };

  // Placeholder for online payment
  const handlePayOnline = () => {
    alert('Online payment method selected. Razorpay integration coming soon!');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl mb-4">No items to pay for.</h2>
        <button
          onClick={() => navigate('/furnitures')}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 bg-white rounded shadow flex flex-col md:flex-row gap-8">
      {/* Left Side: Address + Order Summary */}
      <div className="md:w-2/3 border p-6 rounded shadow-sm">
        <h2 className="text-3xl font-bold mb-6">Order Summary & Delivery</h2>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Delivery Address</h3>
          <p className="mb-1 font-medium">{deliveryAddress.fullName}</p>
          <p className="mb-1">{deliveryAddress.mobile}</p>
          <p>
            {deliveryAddress.house}, {deliveryAddress.area}, {deliveryAddress.district},{' '}
            {deliveryAddress.state} - {deliveryAddress.pinCode}
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Items</h3>
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={item.id || item._id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || '/default-image.jpg'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity || 1}</p>
                  </div>
                </div>
                <p className="font-semibold">
                  ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="text-right mt-6 text-2xl font-bold">
            Total Price: ₹{totalPrice.toFixed(2)}
          </div>
        </section>
      </div>

      {/* Right Side: Payment Methods */}
      <div className="md:w-1/3 border p-6 rounded shadow-sm flex flex-col justify-start">
        <h2 className="text-3xl font-bold mb-6 text-center">Payment Methods</h2>

        <button
          onClick={handlePlaceOrderCOD}
          className="mb-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          Cash on Delivery
        </button>

        <button
          onClick={handlePayOnline}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          Pay Online with Razorpay
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
