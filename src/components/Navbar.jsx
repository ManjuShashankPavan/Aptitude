import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Navbar({ setShowSignIn, setShowSignUp }) {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("User Data:",user); // Debugging: Log the user data
      setUser(user);
    };

    fetchUser();

    // Listen for auth sstate changes
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      console.log("Sesion Data:",session?.user);
      setUser(session?.user || null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleGitHubSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: "github" });
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-white text-xl font-bold">AI Interview Platform</h1>
      <ul className="flex space-x-6 items-center">
        <li>
          <a href="/" className="text-white hover:underline">Home</a>
        </li>
        <li>
          <a href="#" className="text-white hover:underline">About</a>
        </li>
        <li>
          <a href="#" className="text-white hover:underline">Contact</a>
        </li>

        {user ? (
          <div className="relative">
                <img
                    src={
                     user?.user_metadata?.avatar_url ||  
                     user?.user_metadata?.picture ||  
                     " "  
                    }
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
          <>
            <li>
              <button
                onClick={() => setShowSignIn(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Sign In
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  </nav>
  );
}
