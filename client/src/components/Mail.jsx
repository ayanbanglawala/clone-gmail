import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaUserCircle, FaReply } from "react-icons/fa";

const Mail = () => {
  const { id } = useParams(); // Get the email ID from URL params
  const [fromM, setFrom] = useState("");
  const [sub, setSub] = useState("");
  const [msg, setMsg] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMail = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirect to login if no token is found
          return;
        }

        const response = await fetch("https://server-apis-3aoh.onrender.com/mailbyid", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ id }), // Send the email ID in request body
        });

        if (!response.ok) {
          throw new Error('Failed to fetch email details');
        }

        const data = await response.json();
        console.log(data);
        
        setFrom(data[0].sender); // Set the sender email
        setSub(data[0].subject); // Set the email subject
        setMsg(data[0].message); // Set the email message
        console.log(fromM, "h");
        
      } catch (err) {
        console.error("Error fetching the email details: ", err);
      }
    };

    fetchMail();
  }, [id, navigate]); // Dependency array: only re-fetch when `id` or `navigate` changes

  return (
    <div className='py-4 bg-white rounded-lg shadow-md flex flex-col'>
      {/* Header Section */}
      <div className='w-full flex items-center px-4 gap-10 text-gray-700'>
        <Link to="/">
          <IoMdArrowRoundBack className='cursor-pointer text-xl' />
        </Link>
        <Link to="/">
          <MdDelete className='cursor-pointer text-xl' />
        </Link>
      </div>

      {/* Subject Section */}
      <div className='w-full flex items-center px-4 gap-10 text-gray-700'>
        <h1 className='text-lg lg:text-xl m-0 my-5 lg:my-10 lg:m-10'>
          Subject : {sub}
        </h1>
      </div>
      
      <hr />

      {/* Sender Information */}
      <div className='w-full flex items-center px-4 gap-1 text-gray-700'>
        <FaUserCircle className='text-4xl m-5 text-gray-700 cursor-pointer' />
        <h1 className='text-md lg:text-lg'>
          <b>{fromM}</b>
        </h1>
      </div>

      {/* Message Section */}
      <div className='w-full flex items-center px-4 gap-1 text-gray-700'>
        <p className='text-md lg:text-xl m-0 my-5 lg:my-10 lg:m-10'>
          {msg}
        </p>
      </div>

      {/* Reply Button */}
      <div className='w-full flex items-center px-4 gap-1 text-gray-700'>
        <button className='flex h-[40px] px-5 items-center justify-center gap-2 border border-gray-600 hover:bg-gray-200 text-gray-600 rounded-full'>
          <FaReply /> Reply
        </button>
      </div>
    </div>
  );
};

export default Mail;
