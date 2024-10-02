import React from 'react';
import { useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaUserCircle } from 'react-icons/fa';
import { FaReply } from "react-icons/fa";

const Mail = () => {
  const { id } = useParams();
  return (
    <div className=' py-4 bg-white rounded-lg shadow-md flex flex-col'>
      {/* Header Section */}
      <div className='w-full flex items-center px-4 gap-10 text-gray-700'>
        <Link to={"/"}>
          <IoMdArrowRoundBack className='cursor-pointer text-xl' />
        </Link>
        <Link to={"/"}>
          <MdDelete className='cursor-pointer text-xl' />
        </Link>
      </div>
      <div className='w-full flex items-center px-4 gap-10 text-gray-700'>
        <h1 className='text-lg lg:text-xl  m-0 my-5 lg:my-10 lg:m-10'>
          Subject {id}: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, temporibus a architecto culpa id exercitationem optio placeat aperiam aut ea.
        </h1>

      </div>
      <hr />
      <div className='w-full flex items-center px-4 gap-1 text-gray-700'>
        <FaUserCircle className='text-4xl m-5  text-gray-700 cursor-pointer' />
        <h1 className='text-md lg:text-lg '>
          <b>hello@gmail.com</b>
        </h1>

      </div>
      <div className='w-full flex items-center px-4 gap-1 text-gray-700'>
        <p className='text-md lg:text-xl  m-0 my-5 lg:my-10 lg:m-10'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras viverra nibh ut nisi euismod, sed fringilla lacus dignissim. Phasellus sed leo eu justo viverra blandit. In sit amet purus turpis. Quisque non libero vel ligula bibendum pretium a non leo. Sed tincidunt, nisl eu facilisis tincidunt, neque arcu vehicula libero, sed vulputate nulla arcu a quam.
        </p>

      </div>
      <div className='w-full flex items-center px-4 gap-1 text-gray-700'>
        <button className='flex h-[40px] px-5 items-center justify-center gap-2 border border-gray-600 hover:bg-gray-200 text-gray-600 rounded-full'><FaReply/>Reply</button>

      </div>

    </div>
  );
}

export default Mail;
