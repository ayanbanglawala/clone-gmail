import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Body = ({ isSidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Manually decode the token
        const payload = token.split('.')[1]; // Get the payload part
        const decodedPayload = JSON.parse(atob(payload)); // Decode from Base64

        const exp = decodedPayload.exp; // Expiration time
        const currentTime = Date.now() / 1000; // Current time in seconds

        if (exp < currentTime) {
          console.log("Token is expired");
          localStorage.removeItem('token');
          navigate("/login");
        } else {
          setUsername(decodedPayload.email); // Adjust based on your token structure
        }
      } catch (error) {
        console.error('Invalid token', error);
        localStorage.removeItem('token');
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);
console.log(username);

  return (
    <div className="flex">
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} email={username} /> {/* Pass username to Sidebar */}
      <div className='w-[100%] px-4'>
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
