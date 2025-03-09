import { useState, useEffect, useRef } from "react"; // ✅ Added useRef
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
import FAQs from "./components/FAQs";
import TandP from "./components/TandP";
import Support from "./components/Support";
import Careers from "./components/Careers";
import Footer from "./components/Footer";

export default function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const resumeUploadRef = useRef(null); // ✅ Added missing useRef

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
        <Navbar 
          setShowSignIn={setShowSignIn} 
          setShowSignUp={setShowSignUp}
          triggerResumeUpload={() => resumeUploadRef.current?.()} // ✅ Now resumeUploadRef is properly defined
        />

        {/* ✅ Main content must fill the available space */}
        <div className="flex-grow flex flex-col">
          <Routes>
            {/* ✅ Show IntroPage if user is not logged in */}
            <Route path="/" element={<IntroPage setShowSignIn={setShowSignIn} />} />

            {/* ✅ Protected Routes for logged-in users */}
            {user && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/upload" element={<ResumeUpload resumeUploadRef={resumeUploadRef} />} /> {/* ✅ Passed resumeUploadRef */}
              </>
            )}

            {/* ✅ Contact Pages */}
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/About" element={<About />} />
            <Route path="/FAQs" element={<FAQs />} />
            <Route path="/TandP" element={<TandP />} />
            <Route path="/Careers" element={<Careers />} />
            <Route path="/Support" element={<Support />} />
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
