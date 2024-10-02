import React, { useState } from 'react';
import { MdInbox } from 'react-icons/md';
import { LuPencil } from 'react-icons/lu';
import { MdOutlineStarBorder } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import { FaRegFile } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineClose } from 'react-icons/ai'; // Close icon
import { Link } from 'react-router-dom';
import ComposeBox from './ComposeBox'; // Import the ComposeBox component

const Sidebar = ({ isSidebarOpen, setSidebarOpen },props) => {
  const [isComposeOpen, setComposeOpen] = useState(false); // State to manage ComposeBox visibility

  const sidebarItems = [
    { id: 'inbox', label: 'Inbox', icon: <MdInbox />, page: "/" },
    { id: 'starred', label: 'Starred', icon: <MdOutlineStarBorder /> },
    { id: 'snoozed', label: 'Snoozed', icon: <FaRegClock /> },
    { id: 'sent', label: 'Sent', icon: <IoSendSharp /> },
    { id: 'draft', label: 'Draft', icon: <FaRegFile /> },
    { id: 'more', label: 'More', icon: <IoIosArrowDown /> },
  ];

  return (
    <div className='w-0 lg:w-[16%]'>
      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-full w-[60%] md:w-[100%] bg-[#F6F8FC] z-20 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static md:block`}
      >
        {/* Close Button for Mobile View */}
        <div className='flex justify-end md:hidden p-4'>
          <AiOutlineClose
            className='text-2xl cursor-pointer'
            onClick={() => setSidebarOpen(false)} // Close sidebar on click
          />
        </div>

        {/* Compose Button */}
        <button
          onClick={() => setComposeOpen(true)} // Show the ComposeBox when clicked
          className='flex gap-2 w-32 rounded-2xl m-2 bg-[#C2E7FF] h-14 justify-center items-center'
        >
          <LuPencil className='font-bold' />
          <p className='text-sm'>Compose</p>
        </button>

        {/* Sidebar List */}
        <ul className='flex flex-col gap-0'>
          {sidebarItems.map((item) => (
            <Link to={item.page} key={item.id}>
              <li
                className={`flex w-[80%] rounded-r-2xl pl-6 cursor-pointer h-9 justify-start items-center ${item.id === 'inbox' ? 'bg-[#D3E3FD] font-bold' : 'hover:bg-[#EAEBEF]'
                  }`}
              >
                {item.icon}
                <p className='text-sm ml-6'>{item.label}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Background Overlay for Mobile View */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black opacity-50 z-10 md:hidden'
          onClick={() => setSidebarOpen(false)} // Close sidebar on overlay click
        ></div>
      )}

      {/* ComposeBox Component */}
      {isComposeOpen && (
        <ComposeBox
          onClose={() => setComposeOpen(false)} // Close the ComposeBox on click
        />
      )}
    </div>
  );
};

export default Sidebar;
