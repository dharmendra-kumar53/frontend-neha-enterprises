import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PaymentPage = () => {
  const { state } = useLocation();
  const { address, cart } = state || {}; // Destructure address and cart
  const navigate = useNavigate();

  const [paymentMode, setPaymentMode] = useState('COD');
  const [loading, setLoading] = useState(false);

  // Create Razorpay order
  const createRazorpayOrder = async () => {
    try {
      const res = await axios.post('/api/create-order', {
        amount: cart.totalAmount,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      toast.error('Failed to create Razorpay order');
      return null;
    }
  };

  // Proceed to payment
  const handleProceedToPayment = async () => {
    // Check if address or cart data is missing
    if (!address || !cart || !cart.items || cart.items.length === 0) {
      toast.error('Missing address or cart data.');
      return;
    }

    // Handle Online Payment
    if (paymentMode === 'Online') {
      const orderData = await createRazorpayOrder();
      if (!orderData) return;

      const options = {
        key: 'rzp_test_54UAdXWifTDtPK', // Replace with your Razorpay key
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: 'FurniCart',
        description: 'Order Payment',
        image: '/logo192.png', // Optional logo
        handler: (response) => {
          // After successful payment, navigate to the Order Success page
          const order = {
            _id: orderData.orderId,
            items: cart.items,
            totalAmount: cart.totalAmount,
            deliveryAddress: address,
            paymentMode: 'Online',
            orderDate: new Date().toLocaleString(),
          };

          // Navigate to Order Success Page
          navigate('/order-success', { state: { order } });
          toast.success('Payment successful!');
        },
        prefill: {
          name: address.fullName,
          email: 'user@example.com',
          contact: address.mobile,
        },
        theme: {
          color: '#0f9d58',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      // Handle Cash on Delivery
      const order = {
        _id: new Date().getTime().toString(), // Use a timestamp as the order ID
        items: cart.items,
        totalAmount: cart.totalAmount,
        deliveryAddress: address,
        paymentMode: 'COD',
        orderDate: new Date().toLocaleString(),
      };

      // Navigate to Order Success Page for COD
      navigate('/order-success', { state: { order } });
      toast.success('Order placed with Cash on Delivery');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-screen">
      {/* Payment Method */}
      <div className="col-span-2 bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Choose Payment Method</h2>

        <div className="flex flex-col gap-4">
          <div
            onClick={() => setPaymentMode('COD')}
            className={`border rounded-lg p-4 cursor-pointer transition ${
              paymentMode === 'COD' ? 'border-green-600 bg-green-50' : 'border-gray-300'
            }`}
          >
            <h3 className="text-lg font-semibold mb-1">Cash on Delivery</h3>
            <p className="text-sm text-gray-500">Pay when the product is delivered.</p>
          </div>

          <div
            onClick={() => setPaymentMode('Online')}
            className={`border rounded-lg p-4 cursor-pointer transition ${
              paymentMode === 'Online' ? 'border-green-600 bg-green-50' : 'border-gray-300'
            }`}
          >
            <h3 className="text-lg font-semibold mb-1">Online Payment</h3>
            <p className="text-sm text-gray-500">Pay using UPI, Debit/Credit Card, Net Banking</p>
          </div>
        </div>

        <button
          onClick={handleProceedToPayment}
          disabled={loading}
          className={`mt-6 w-full py-3 rounded text-white text-lg font-medium ${
            paymentMode === 'COD' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading
            ? 'Processing...'
            : paymentMode === 'COD'
            ? 'Place Order (COD)'
            : 'Proceed to Pay'}
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {/* Check if address is available */}
        {address ? (
          <div className="text-sm mb-4">
            <h4 className="font-medium">Deliver to:</h4>
            <p>{address.fullName}, {address.house}, {address.area}</p>
            <p>{address.district}, {address.state} - {address.pinCode}</p>
            <p>Mobile: {address.mobile}</p>
          </div>
        ) : (
          <div className="text-sm text-red-600 mb-4">Address not available</div>
        )}

        {/* Check if cart items are available */}
        {cart && cart.items && cart.items.length > 0 ? (
          <div className="border-t pt-4">
            {cart.items.map((item, i) => (
              <div key={i} className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p>₹{item.price * item.quantity}</p>
              </div>
            ))}

            <div className="mt-4 border-t pt-4 flex justify-between font-semibold text-lg">
              <span>Total Items:</span>
              <span>{cart.items.length}</span>
            </div>

            <div className="mt-2 flex justify-between font-semibold text-xl text-green-700">
              <span>Total Amount:</span>
              <span>₹{Number(cart.totalAmount || 0).toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <div className="text-sm text-red-600 mb-4">No items in cart</div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
