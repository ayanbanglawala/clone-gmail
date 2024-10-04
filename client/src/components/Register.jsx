import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import googleLogo from '../assets/gmail.png'; // Import the Google logo image

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://server-apis-3aoh.onrender.com/register', formData);
      setMessage(response.data.message);  // Display success message
    } catch (error) {
      setMessage(error.response.data.error || 'Registration failed!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-md">
        {/* Google Logo */}
        <div className="flex justify-center mb-6">
          <img src={googleLogo} alt="Google Logo" className="w-32" />
        </div>

        {/* Title */}
        <h2 className="mb-8 text-2xl font-semibold text-center text-gray-800">
          Create your Google Account
        </h2>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your username"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your email address"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        {/* Login Redirect */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link className="text-blue-600 hover:underline" to={"/login"}>
              Login here
            </Link>
          </p>
        </div>

        {/* Display message */}
        {message && (
          <div className="mt-4 p-2 text-center bg-green-100 text-green-800 rounded-md">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
