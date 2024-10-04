import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../assets/gmail.png'; // Download a Google logo image and import it

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    setError(""); // Reset error message on new attempt

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      // Backend API call for login
      const response = await fetch("https://server-apis-3aoh.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.userToken); // Log the received token
        localStorage.setItem('token', result.userToken); // Store JWT token securely
        navigate("/");
      } else {
        // Handle login failure
        const errorResult = await response.json();
        setError(errorResult.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login Error: ", err);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-md">
        {/* Google Logo */}
        <div className="flex justify-center mb-6">
          <img src={googleLogo} alt="Google Logo" className="w-32" />
        </div>

        {/* Title */}
        <h2 className="mb-8 text-2xl font-semibold text-center text-gray-800">
          Sign in
        </h2>

        {/* Error Message */}
        {error && <p className="mb-4 text-sm text-center text-red-500">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-6">
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email or phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Next
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center mt-4 mb-2">
          <hr className="w-full border-t border-gray-300" />
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Create account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
