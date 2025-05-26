import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from "../contexts/AppContext";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, token } = useContext(AppContext);
  const navigate = useNavigate();

  const { login } = useContext(AppContext); // 👈 Only login function from AppContext
  const backendUrl = import.meta.env.VITE_API_URL;

  const onSubmitHandler = async (e) => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        console.log('IP Address:', data);
      })
      .catch(err => {
        document.getElementById('ipInfo').innerText = 'Error fetching IP';
        console.error(err);
      });
  e.preventDefault();
  try {
    let response;
    if (state === 'Sign Up') {
      // Await the signup POST request and assign response
      response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
    } else {
      // Await the login POST request and assign response
      response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
    }

    const { data } = response;

    if (data.success) {
      // Fetch user profile with the received token
      const profileResponse = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${data.token}` }
      });

      console.log("Profile response data:", profileResponse.data); // Debugging

      if (!profileResponse.data.user) {
        toast.error("Failed to fetch user profile");
        return; // Stop further execution if profile fetch failed
      }

      // Call login function from context with token and user data
      login({ token: data.token, user: profileResponse.data.user });

      toast.success(data.message);
      navigate('/'); // Redirect after successful login/signup
    } else {
      toast.error(data.message);
    }
  } catch (err) {
    console.error("Error:", err);
    toast.error(err.response?.data?.message || 'Something went wrong');
  }
};


useEffect(() => {
  if (user && token) {
    navigate('/');
  }
}, [user, token, navigate]);

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className="text-2xl font-semibold">
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </p>
          <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book order</p>

          {state === 'Sign Up' && (
            <div className="w-full">
              <p>Full Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                type="text"
                autoComplete="name"
                required
              />
            </div>
          )}

          <div className="w-full">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="email"
              autoComplete="email"
              required
            />
          </div>

          <div className="w-full">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="password"
              autoComplete={state === 'Login' ? 'current-password' : 'new-password'}
              required
            />
          </div>

          <button className="bg-blue-700 text-white w-full py-2 my-2 rounded-md text-base">
            {state === 'Sign Up' ? 'Create account' : 'Login'}
          </button>

          <p>
            {state === 'Sign Up' ? 'Already have an account?' : 'Create a new account?'}
            <span
              onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
              className="text-primary underline cursor-pointer"
            >
              {state === 'Sign Up' ? 'Login here' : 'Click here'}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
