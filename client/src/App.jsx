import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inbox from './components/Inbox';
import Body from './components/Body';
import Mail from './components/Mail';
import Login from './components/Login';
import Register from './components/Register';

// Component to capture and set the current path
function CurrentPath({ setPath }) {
  const location = useLocation();
  const path = location.pathname; // Get the current path
  setPath(path); // Update the path state in the parent component
  return null; // This component doesn't need to render anything
}

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State for Sidebar visibility
  const [currentPath, setCurrentPath] = useState(""); // State for the current path

  return (
    <div className="bg-[#F6F8FC] h-screen">
      {/* Pass state to Navbar for Sidebar toggle */}
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} pathCurr={currentPath} />
      
      {/* Use BrowserRouter with basename for GitHub Pages */}
      <BrowserRouter basename="/clone-gmail">
        {/* Render CurrentPath to get the current path */}
        <CurrentPath setPath={setCurrentPath} />
        
        <Routes>
          {/* Wrap Inbox and Mail inside the Body component using nested routes */}
          <Route path="/" element={<Body isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />}>
            <Route index element={<Inbox />} /> {/* Default child route */}
            <Route path="mail/:id" element={<Mail />} /> {/* Mail component with dynamic ID */}
          </Route>

          {/* Define Login and Register routes separately */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
