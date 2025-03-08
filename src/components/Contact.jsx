import React from "react";

export default function Contact() {
  return (
    <div className="p-6 max-w-lg mx-auto border rounded-lg shadow-lg mt-20">
      <h1 className="text-2xl font-bold">Send Message</h1>

      <h4 className="mt-4">Full Name</h4>
      <input
        type="text"
        className="w-full p-2 border rounded-md"
        placeholder="Enter your name"
      />

      <h4 className="mt-4">Email</h4>
      <input
        type="email"
        className="w-full p-2 border rounded-md"
        placeholder="Enter your email"
      />

      <h4 className="mt-4">Type your Message...</h4>
      <textarea
        className="w-full p-2 border rounded-md"
        placeholder="Write your message"
        rows="4"
      ></textarea>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700">
        Send
      </button>
    </div>
  );
}
