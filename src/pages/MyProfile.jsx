import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    image: assets.profile_pic,
    email: '',
    phone: '',
    address: { line1: '', line2: '' },
    gender: '',
    dob: '',
  });

  const [originalData, setOriginalData] = useState(null);
  const [previewImage, setPreviewImage] = useState(assets.profile_pic);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,  // <-- Correct header here
          },
        })
        .then((response) => {
          const user = response.data.user;
          const fullData = {
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            address: user.address || { line1: '', line2: '' },
            gender: user.gender || '',
            dob: user.dob || '',
            image: user.image || assets.profile_pic,
          };
          setUserData(fullData);
          setOriginalData(fullData);
          setPreviewImage(user.image || assets.profile_pic);
        })
        .catch((err) => {
          toast.error('Failed to fetch profile');
          console.error(err);
        });
    }
  }, []);

  const handleSave = () => {
    if (JSON.stringify(userData) === JSON.stringify(originalData)) {
      toast.info('No changes to update');
      setIsEdit(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      axios
        .put('http://localhost:5000/api/user/profile', userData, {
          headers: {
            Authorization: `Bearer ${token}`, // <-- Also here
          },
        })
        .then(() => {
          toast.success('Profile updated successfully');
          setOriginalData(userData);
          setIsEdit(false);
          setPreviewImage(userData.image);
        })
        .catch((err) => {
          toast.error('Failed to update profile');
          console.error(err);
        });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setUserData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md mt-8 text-sm space-y-5">
      <div className="flex flex-col items-center relative">
        <img
          className="w-20 h-20 rounded-full border-4 border-indigo-500 object-cover"
          src={previewImage}
          alt="Profile"
        />
        {isEdit && (
          <>
            <label
              htmlFor="profileImageInput"
              className="absolute top-14 right-12 bg-white rounded-full p-1 shadow cursor-pointer hover:bg-indigo-100"
              title="Change Profile Picture"
            >
              ✏️
            </label>
            <input
              id="profileImageInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </>
        )}
        {isEdit ? (
          <input
            type="text"
            className="text-xl font-semibold mt-3 text-neutral-900 bg-gray-100 px-2 py-1 rounded w-48 text-center"
            value={userData.name}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <p className="text-xl font-semibold mt-3 text-neutral-900">{userData.name}</p>
        )}
      </div>

      <hr className="border-gray-300" />

      <div>
        <p className="text-indigo-600 font-semibold mb-2">Contact Information</p>
        <div className="grid grid-cols-[100px_1fr] gap-y-2 gap-x-3 text-gray-800">
          <p className="font-medium">Email:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 px-2 py-1 rounded w-full"
              type="text"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
          ) : (
            <p className="text-blue-700">{userData.email}</p>
          )}

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 px-2 py-1 rounded w-full"
              type="text"
              value={userData.phone}
              onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <p className="text-blue-700">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="space-y-1">
              <input
                className="bg-gray-100 px-2 py-1 rounded w-full"
                type="text"
                placeholder="Line 1"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <input
                className="bg-gray-100 px-2 py-1 rounded w-full"
                type="text"
                placeholder="Line 2"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </div>
          ) : (
            <p className="text-gray-700 whitespace-pre-line">
              {userData.address.line1}
              {userData.address.line2 ? `\n${userData.address.line2}` : ''}
            </p>
          )}
        </div>
      </div>

      <div>
        <p className="text-indigo-600 font-semibold mb-2">Basic Information</p>
        <div className="grid grid-cols-[100px_1fr] gap-y-2 gap-x-3 text-gray-800">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="bg-gray-100 px-2 py-1 rounded w-36"
              value={userData.gender}
              onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-700">{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 px-2 py-1 rounded w-36"
              type="date"
              value={userData.dob}
              onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
            />
          ) : (
            <p className="text-gray-700">{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="text-center mt-5">
        <button
          onClick={() => {
            if (isEdit) {
              handleSave();
            } else {
              setIsEdit(true);
            }
          }}
          className="px-5 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-all"
        >
          {isEdit ? 'Save Information' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
