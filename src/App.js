import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { supabase } from "./lib/supabase";
import Navbar from "./components/Navbar";
import SignInPopup from "./components/SignInPopup";
import SignUpPopup from "./components/SignUpPopup";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./components/ResumeUpload";
import IntroPage from "./pages/IntroPage";
import ContactUs from "./components/ContactUs";
import Contact from "./components/Contact";
import About from "./components/About";
import Footer from "./components/Footer";

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
      <div className="flex flex-col min-h-screen">
        {/* ✅ Navbar at the top */}
        <Navbar setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />

        {/* ✅ Main content must fill the available space */}
        <div className="flex-grow flex flex-col">
          <Routes>
            {/* ✅ Show IntroPage if user is not logged in */}
            <Route path="/" element={<IntroPage setShowSignIn={setShowSignIn} />} />

            {/* ✅ Protected Routes for logged-in users */}
            {user && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/upload" element={<ResumeUpload />} />
              </>
            )}

            {/* ✅ Contact Pages */}
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/About" element={<About />} />
          </Routes>

        </div>

        {/* ✅ Footer should always be at the bottom */}
        <Footer />

        {/* ✅ Popups for authentication */}
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
