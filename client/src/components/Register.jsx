import React,{ useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-md transition duration-200"
          >
            Register
          </button>
          <p>Already have an account? <Link className='text-blue-600' to={"/login"}>Login here</Link></p>
        </form>

        {/* Display message */}
        {message && (
          <div className="mt-4 p-2 text-center bg-indigo-100 text-indigo-800 rounded-md">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
