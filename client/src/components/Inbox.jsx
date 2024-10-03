import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import online from "../assets/online.png";

const Inbox = () => {
  const navigate = useNavigate();
  const [emails, setEmails] = useState([]); // State to store emails
  const [from, setFrom] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = token.split(".")[1]; // Get the payload part
      const decodedPayload = JSON.parse(atob(payload)); // Decode from Base64
      setFrom(decodedPayload.email); // Set the sender email
      fetchEmails(token, decodedPayload.email); // Fetch emails after setting email
    } else {
      navigate("/login"); // Redirect to login if no token
    }
  }, [navigate]);

  // Handle the star click event
  const handleStar = async (id, currentStarredStatus) => {
    try {
      const updatedStarred = !currentStarredStatus; // Toggle the starred status
      const response = await fetch("https://server-apis-3aoh.onrender.com/starred", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id, starred: updatedStarred }), // Use the correct body structure
      });

      const updatedMail = await response.json();
      console.log("Updated Mail:", updatedMail);

      // Update the local emails state with the new starred status
      setEmails((prevEmails) =>
        prevEmails.map((email) =>
          email._id === id ? { ...email, starred: updatedStarred } : email
        )
      );
    } catch (err) {
      console.log("Error updating starred status:", err);
    }
  };

  // Fetch emails from the server
  const fetchEmails = async (token, email) => {
    try {
      const response = await fetch("https://server-apis-3aoh.onrender.com/inbox", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }), // Send email in request body
      });

      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }

      const data = await response.json();
      setEmails(data); // Set fetched emails to state
    } catch (err) {
      console.error("Error fetching emails: ", err);
    }
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      {/* Email List */}
      <div className="overflow-y-auto">
        {emails.map((email) => (
          <div
            key={email._id}
            className="flex items-center justify-between border-b p-4 hover:bg-gray-100 cursor-pointer"
          >
            {/* Starred Icon */}
            <div className="flex items-center gap-4">
              <span onClick={() => handleStar(email._id, email.starred)}>
                {/* Call handleStar with id and starred status */}
                {email.starred ? (
                  <FaStar className="text-yellow-400" />
                ) : (
                  <FaRegStar className="text-gray-400" />
                )}
              </span>
              <Link to={`/mail/${email._id}`} onClick={console.log("J")
              }>
                {/* Sender and Email Details */}
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-gray-700">
                    {email.sender}
                  </span>
                  <span className="text-md text-gray-600">
                    <strong>{email.subject}</strong> -{" "}
                    {email.message.slice(0, 50)}...
                  </span>
                </div>
              </Link>
            </div>

            {/* Time */}
            <span className="text-sm text-gray-500 flex items-center gap-4">
              {!email.read && (
                <span>
                  <img src={online} width={"10px"} height={"10px"} alt="" />
                </span>
              )}
              {new Date(email.date).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inbox;
