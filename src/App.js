import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { supabase } from "./lib/supabase";
import Navbar from "./components/Navbar";
import SignInPopup from "./components/SignInPopup";
import SignUpPopup from "./components/SignUpPopup";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./components/ResumeUpload";
import IntroPage from "./pages/IntroPage";  // Import IntroPage
import Footer from "./components/Footer"; // Import Footer

export default function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />

        <div className="flex-grow">
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/upload" element={<ResumeUpload />} />
              </>
            ) : (
              // ✅ Pass setShowSignIn to IntroPage
              <Route path="/" element={<IntroPage setShowSignIn={setShowSignIn} />} />
            )}
          </Routes>
        </div>

        <Footer /> {/* ✅ Ensure Footer is always displayed */}

        {showSignIn && (
          <SignInPopup setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />
        )}
        {showSignUp && (
          <SignUpPopup setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />
        )}
      </div>
    </Router>
  );
}
