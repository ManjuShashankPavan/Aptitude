import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

export default function Navbar({ setShowSignIn, setShowSignUp }) {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/"); // Redirect to home after logout
  };

  const handleDashboardClick = () => {
    if (user) {
      navigate("/dashboard"); // ✅ Navigate to dashboard if user is signed in
    } else {
      setShowSignIn(true); // ✅ Show sign-in popup if user is not signed in
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-blue-600 p-2 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src="/SpeaQ.png" alt="SpeaQ Logo" className="h-10" />
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6 items-center">
          <li>
            <Link to="/" className="text-white hover:underline">Home</Link>
          </li>

          {/* Dashboard Button - Click to check login status */}
          <li>
            <button
              onClick={handleDashboardClick}
              className="text-white hover:underline"
            >
              Dashboard
            </button>
          </li>

          {user ? (
            // User Profile & Logout Dropdown
            <div className="relative">
              <img
                src={user?.user_metadata?.avatar_url || "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Sign In Button
            <li>
              <button
                onClick={() => setShowSignIn(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Sign In
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
