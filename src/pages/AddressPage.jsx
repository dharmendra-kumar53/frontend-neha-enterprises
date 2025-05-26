import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { toast } from 'react-toastify';

const AddressPage = () => {
  const { cart, user, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    mobile: '',
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
      toast.error('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();
        const a = data.address;

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
        toast.error('Location fetch failed');
      }
    });
  };

  const handleProceedToPayment = () => {
    // Validate address
    for (let [key, val] of Object.entries(address)) {
      if (!val.trim()) {
        toast.warning(`Please fill ${key}`);
        return;
      }
    }

    // Even if cart is empty, proceed to PaymentPage
    navigate('/payment', {
      state: {
        address,
        cart,  // Pass cart data here
      },
    });
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
              className="px-4 py-2 rounded bg-green-600 text-white "
            >
              Use Current Address
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['fullName', 'mobile', 'house', 'area', 'district', 'state', 'pinCode'].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.replace(/([A-Z])/g, ' $1')}
                value={address[field]}
                onChange={handleChange}
                className="border px-4 py-2 rounded"
              />
            ))}
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
