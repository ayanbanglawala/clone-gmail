import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineControl } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { TbGridDots } from "react-icons/tb";
import { FaRegQuestionCircle } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import gmailLogo from '../assets/Gmail.png';

const Navbar = ({ isSidebarOpen, setSidebarOpen, pathCurr }) => {
  // Determine user status based on the current path
  const user = pathCurr !== '/login' && pathCurr !== '/register';

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = "/";
  }

  return (
    <div>
      {/* Main Navbar */}
      {user && (
        <div className='flex items-center justify-between p-2 bg-[#F6F8FC]'>
          {/* Left Section */}
          <div className='flex items-center'>
            <div
              className='w-10 rounded-full h-10 flex justify-center items-center hover:bg-[#E3E6E9]'
              onClick={() => setSidebarOpen(!isSidebarOpen)} // Toggle sidebar
            >
              <RxHamburgerMenu className='text-2xl cursor-pointer' />
            </div>
            <img
              src={gmailLogo}
              alt='Gmail Logo'
              className='w-8 ml-4'
            />
            <p className='ml-2 text-xl text-gray-700 hidden sm:flex'>Gmail</p>
          </div>

          <>
            {/* Search Bar */}
            <div className='flex-grow max-w-xl hidden sm:flex h-[50px]'>
              <div className='flex items-center bg-[#EAF1FB] px-4 py-2 rounded-full w-full'>
                <AiOutlineSearch className='text-gray-500 text-2xl' />
                <input
                  type='text'
                  placeholder='Search mail'
                  className='ml-4 bg-transparent focus:outline-none w-full text-lg'
                />
                <AiOutlineControl className='text-gray-500 text-2xl' />
              </div>
            </div>

            {/* Right Section */}
            <div className='flex items-center space-x-4 pr-4 gap-2'>
              <FaRegQuestionCircle className='text-xl text-gray-700 cursor-pointer' />
              <IoSettingsOutline className='text-2xl text-gray-700 cursor-pointer' />
              <TbGridDots className='text-xl text-gray-700 cursor-pointer' />
              <FaUserCircle className='text-3xl text-gray-700 cursor-pointer' />
              <RiLogoutBoxRLine className='text-2xl text-gray-700 cursor-pointer' onClick={logout} />
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default Navbar;
