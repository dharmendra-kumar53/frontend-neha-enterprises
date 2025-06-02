import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/my-orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (error) {
        console.error('Fetch orders error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleCancelOrder = async (orderId) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/my-orders/cancel/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setOrders(prev =>
          prev.map(order =>
            order._id === orderId ? { ...order, status: 'Cancelled' } : order
          )
        );
        alert('Order cancelled successfully.');
      }
    } catch (error) {
      console.error('Cancel order error:', error);
      alert('Failed to cancel order.');
    }
  };

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (!token) return <p className="text-center py-8">Please login to view your orders.</p>;
  if (orders.length === 0) return <p className="text-center py-8">No orders found.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Orders</h1>
      {orders.map((order) => (
        <div key={order._id} className="bg-white rounded-2xl shadow-md border p-6 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div className="w-full md:w-2/3">
              <h2 className="font-semibold mb-2 text-gray-700">Order ID: {order._id}</h2>
              <p>Status: <strong className={`text-${order.status === 'Cancelled' ? 'red' : 'green'}-600`}>{order.status}</strong></p>
              <p>Payment Mode: <strong>{order.paymentMode}</strong></p>
              <p>Ordered On: <strong>{new Date(order.orderDate).toLocaleString()}</strong></p>
              <div className="mt-4 border-t pt-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between border-b py-2">
                    <p>{item.name} (Qty: {item.quantity})</p>
                    <p>₹{item.price}</p>
                  </div>
                ))}
              </div>
              <h3 className="mt-4 font-bold text-lg">Total: ₹{order.totalAmount}</h3>
            </div>
            <div className="w-full md:w-1/3 mt-6 md:mt-0 md:pl-6 border-l md:border-gray-200">
              <div>
                <strong>Delivery Address:</strong>
                <p className="text-gray-600">{order.deliveryAddress.fullName}, {order.deliveryAddress.mobile}</p>
                <p className="text-gray-600">{order.deliveryAddress.house}, {order.deliveryAddress.area}</p>
                <p className="text-gray-600">{order.deliveryAddress.district}, {order.deliveryAddress.state} - {order.deliveryAddress.pinCode}</p>
              </div>
              {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-xl shadow transition"
                >
                  Cancel Order
                </button>
              )}
              {order.status === 'Cancelled' && (
                <p className="mt-4 text-center text-red-500 font-medium">Order Cancelled</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
