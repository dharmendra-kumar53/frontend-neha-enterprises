import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { toast } from 'react-toastify';

const AddressPage = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const [address, setAddress] = useState({
    fullName: user?.name || '',
    mobile: user?.phone || '',
    house: '',
    area: '',
    district: '',
    state: '',
    pinCode: '',
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleUseCurrentAddress = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();
        const a = data.address || {};

        setAddress({
          fullName: user?.name || '',
          mobile: user?.phone || '',
          house: a.house_number || '',
          area: a.suburb || a.neighbourhood || a.village || '',
          district: a.city || a.county || a.town || '',
          state: a.state || '',
          pinCode: a.postcode || '',
        });

        toast.success('Address autofilled!');
      } catch (err) {
        toast.error('Failed to fetch address from location');
      }
    });
  };

  const handleProceedToPayment = () => {
    // Validate address fields
    for (let [key, val] of Object.entries(address)) {
      if (!val.trim()) {
        toast.warning(`Please fill in ${key}`);
        return;
      }
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty. Please add items to proceed.');
      navigate('/furnitures');
      return;
    }

    // Navigate to payment page with address and cartItems
    navigate('/payment', { state: { deliveryAddress: address, cartItems } });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

      <div className="bg-white shadow rounded-lg p-6 space-y-8">
        {/* Delivery Address */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Delivery Address</h3>
            <button
              onClick={handleUseCurrentAddress}
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              Use Current Address
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="fullName"
              placeholder="Full Name"
              value={address.fullName}
              onChange={handleChange}
              className="border px-4 py-2 rounded"
            />
            <input
              name="mobile"
              placeholder="Mobile Number"
              value={address.mobile}
              onChange={handleChange}
              className="border px-4 py-2 rounded"
            />
            <input
              name="house"
              placeholder="House/Flat No."
              value={address.house}
              onChange={handleChange}
              className="border px-4 py-2 rounded"
            />
            <input
              name="area"
              placeholder="Area/Locality"
              value={address.area}
              onChange={handleChange}
              className="border px-4 py-2 rounded"
            />
            <input
              name="district"
              placeholder="District"
              value={address.district}
              onChange={handleChange}
              className="border px-4 py-2 rounded"
            />
            <input
              name="state"
              placeholder="State"
              value={address.state}
              onChange={handleChange}
              className="border px-4 py-2 rounded"
            />
            <input
              name="pinCode"
              placeholder="PIN Code"
              value={address.pinCode}
              onChange={handleChange}
              className="border px-4 py-2 rounded"
            />
          </div>
        </div>

        {/* Proceed to Payment */}
        <div>
          <button
            onClick={handleProceedToPayment}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
