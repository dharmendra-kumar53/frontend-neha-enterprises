import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders'); // API to fetch orders for the logged-in user
        setOrders(res.data.orders); // Set the orders to state
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading your orders...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>
      
      {orders.length === 0 ? (
        <div>No orders placed yet.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 shadow rounded-lg">
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">Order #{order._id.slice(-6)}</h3>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                  order.status === 'Completed' ? 'bg-green-200 text-green-800' :
                  'bg-red-200 text-red-800'
                }`}>{order.status}</span>
              </div>

              <p className="text-sm text-gray-500">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Payment Mode: {order.paymentMode}</p>

              <div className="mt-2">
                <h4 className="font-semibold">Items:</h4>
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between mb-2">
                    <div>
                      <p className="font-medium">{item.name} - ₹{item.price} x {item.quantity}</p>
                    </div>
                    <p>₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between font-semibold">
                <span>Total Amount:</span>
                <span>₹{order.totalAmount}</span>
              </div>

              <div className="mt-2">
                <h4 className="font-semibold">Delivery Address:</h4>
                <p>{order.deliveryAddress.fullName}</p>
                <p>{order.deliveryAddress.phone}</p>
                <p>{order.deliveryAddress.fullAddress}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
