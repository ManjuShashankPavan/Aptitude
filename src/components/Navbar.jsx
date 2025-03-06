import React from "react";

export default function Navbar({ setShowSignIn, setShowSignUp }) {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">AI Interview Platform</h1>
        <ul className="flex space-x-6">
          <li>
            <a href="#" className="text-white hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">
              Contact
            </a>
          </li>
          <li>
            <button
              onClick={() => setShowSignIn(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Sign In
            </button>
          </li>
          <li>
            <button
              onClick={() => setShowSignUp(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Sign Up
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
