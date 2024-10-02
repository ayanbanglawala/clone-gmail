import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import online from "../assets/online.png"

const Inbox = () => {
    const navigate = useNavigate();
    const [emails, setEmails] = useState([]); // State to store emails
    const [from, setFrom] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = token.split('.')[1]; // Get the payload part
            const decodedPayload = JSON.parse(atob(payload)); // Decode from Base64
            setFrom(decodedPayload.email); // Set the sender email
            fetchEmails(token, decodedPayload.email); // Fetch emails after setting email
        } else {
            navigate('/login'); // Redirect to login if no token
        }
    }, [navigate]);

    const handleStar = () => {
        console.log("hello");
        
    }

    const fetchEmails = async (token, email) => {
        try {
            const response = await fetch("https://server-apis-3aoh.onrender.com/inbox", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ email }), // Send email in request body
            });

            if (!response.ok) {
                throw new Error('Failed to fetch emails');
            }

            const data = await response.json();
            setEmails(data); // Set fetched emails to state
        } catch (err) {
            console.error("Error fetching emails: ", err);
        }
    };
    console.log(emails);
    
    return (
        <div className='w-full p-4 bg-white rounded-lg shadow-md'>
            {/* Email List */}
            <div className='overflow-y-auto'>
                {emails.map((email) => (
                    <Link to={`/mail/${email._id}`} key={email._id}>
                        <div
                            className='flex items-center justify-between border-b p-4 hover:bg-gray-100 cursor-pointer'
                        >
                            {/* Starred Icon */}
                            <div className='flex items-center gap-4'>
                                <span onClick={handleStar}>
                                    {email.starred ? (
                                        <FaStar className='text-yellow-400' />
                                    ) : (
                                        <FaRegStar className='text-gray-400' />
                                    )}
                                </span>

                                {/* Sender and Email Details */}
                                <div className='flex flex-col'>
                                    <span className='font-bold text-sm text-gray-700'>
                                        {email.sender}
                                    </span>
                                    <span className='text-md text-gray-600'>
                                        <strong>{email.subject}</strong> - {email.message.slice(0, 50)}...
                                    </span>
                                </div>
                            </div>

                            {/* Time */}
                            <span></span>
                            <span className='text-sm text-gray-500 flex items-center gap-4'>{!email.read && (<span><img src={online} width={'10px'} height={'10px'} alt="" /></span>)}{new Date(email.date).toLocaleTimeString()}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Inbox;
