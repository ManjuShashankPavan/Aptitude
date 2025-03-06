import React from "react";
import { useAuth } from "../context/AuthContext";  // ✅ Correct Import

export default function Navbar() {
  const { isAuthenticated, setShowSignIn, setShowSignUp, signOut } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">AI Interview Platform</h1>
        <ul className="flex space-x-6">
          <li><a href="#" className="text-white hover:underline">Home</a></li>
          <li><a href="#" className="text-white hover:underline">About</a></li>
          <li><a href="#" className="text-white hover:underline">Contact</a></li>
          {isAuthenticated ? (
            <li>
              <button onClick={signOut} className="text-white bg-red-500 px-4 py-2 rounded">
                Sign Out
              </button>
            </li>
          ) : (
            <>
              <li>
                <button onClick={() => setShowSignIn(true)} className="text-white bg-green-500 px-4 py-2 rounded">
                  Sign In
                </button>
              </li>
              <li>
                <button onClick={() => setShowSignUp(true)} className="text-white bg-yellow-500 px-4 py-2 rounded">
                  Sign Up
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
