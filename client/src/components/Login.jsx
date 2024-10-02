import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      }
      else {
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
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center">Login to Gmail Clone</h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 mt-2 border rounded"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 mt-2 border rounded"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
