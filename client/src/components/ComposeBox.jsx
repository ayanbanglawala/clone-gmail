import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const ComposeBox = ({ onClose }) => {
    const navigate = useNavigate();
    const [to, setTo] = useState('');
    const [sub, setSubject] = useState('');
    const [msg, setMessage] = useState('');
    const [from, setFrom] = useState('');

    // Update formData dynamically on input change
    const formData = {
        sender: from,
        reciever: to,
        subject: sub,
        message: msg
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = token.split('.')[1]; // Get the payload part
            const decodedPayload = JSON.parse(atob(payload)); // Decode from Base64
            setFrom(decodedPayload.email); // Set the sender email
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://server-apis-3aoh.onrender.com/sendmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Mail sent successfully!");
                onClose(); // Optionally close the compose box after sending
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`); // Show error message
            }
        } catch (err) {
            console.error('Error:', err);
            alert("An error occurred while sending the email.");
        }
    };

    return (
        <div className="fixed bottom-5 right-5 w-[90%] md:w-[50%] lg:w-[40%] h-auto bg-white border border-gray-300 rounded-lg shadow-lg z-30">
            {/* Header */}
            <div className="flex justify-between items-center p-3 border-b">
                <h2 className="text-lg font-bold">New Message</h2>
                <AiOutlineClose className="text-xl cursor-pointer" onClick={onClose} />
            </div>

            <form onSubmit={handleSubmit}>

                {/* Content */}
                <div className="p-4">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="To"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="w-full border-b p-2 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Subject"
                            value={sub}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full border-b p-2 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            rows="8"
                            placeholder="Message"
                            value={msg}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full p-2 focus:outline-none resize-none"
                            required
                        ></textarea>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-3 border-t">
                    <button type='submit' className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Send
                    </button>
                    <button
                        type='button'
                        className="text-gray-600 hover:text-gray-900"
                        onClick={onClose}
                    >
                        Discard
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ComposeBox;
