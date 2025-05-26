import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderSuccessPage = () => {
  const { state } = useLocation();
  const { order } = state || {}; // Destructure order from the state

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Order #{order._id}</h1>
      <p>Your order has been placed successfully!</p>

      <h3 className="mt-6 text-xl font-semibold">Items:</h3>
      {order.items.map((item) => (
        <div key={item.id} className="mb-2">
          <p>{item.name} - ₹{item.price} x {item.quantity}</p>
        </div>
      ))}

      <h3 className="mt-6 text-xl font-semibold">Delivery Address:</h3>
      <p>{order.deliveryAddress.fullName}</p>
      <p>{order.deliveryAddress.phone}</p>
      <p>{order.deliveryAddress.fullAddress}</p>

      <h3 className="mt-6 text-xl font-semibold">Total:</h3>
      <p>₹{order.totalAmount}</p>
    </div>
  );
};

export default OrderSuccessPage;
