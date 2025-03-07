import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Navbar({ setShowSignIn, setShowSignUp }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log(user); // Debugging: Log the user data
      setUser(user);
    };

    fetchUser();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
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
        <ul className="flex space-x-6">
          <li>
            <a href="#" className="text-white hover:underline">Home</a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">About</a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">Contact</a>
          </li>

          {user ? (
            <li className="flex items-center space-x-4">
              <span className="text-white">Welcome, {user.email}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              {/* <li>
                <button
                  onClick={handleGitHubSignIn}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Login with GitHub
                </button>
              </li> */}
              <li>
                <button
                  onClick={() => setShowSignIn(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Sign In
                </button>
              </li>
              {/* <li>
                <button
                  onClick={() => setShowSignUp(true)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Sign Up
                </button>
              </li> */}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
