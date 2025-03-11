import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // ✅ Added Navigate
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
import Mockinterview from "./components/Mockinterview";
import Certificate from "./components/Certificate";
import LearningCourses from "./components/LearningCourses";
import Footer from "./components/Footer";

export default function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state
  const resumeUploadRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription?.unsubscribe(); // ✅ Fix: Ensure proper cleanup
    };
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>; // ✅ Show a loading state while checking auth
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* ✅ Navbar */}
        <Navbar 
          setShowSignIn={setShowSignIn} 
          setShowSignUp={setShowSignUp}
          triggerResumeUpload={() => resumeUploadRef.current?.()} 
        />

        {/* ✅ Main content */}
        <div className="flex-grow flex flex-col">
          <Routes>
            {/* ✅ Public Routes */}
            <Route path="/" element={<IntroPage setShowSignIn={setShowSignIn} />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/About" element={<About />} />
            <Route path="/FAQs" element={<FAQs />} />
            <Route path="/TandP" element={<TandP />} />
            <Route path="/Careers" element={<Careers />} />
            <Route path="/Support" element={<Support />} />
            <Route path="/Mockinterview" element={<Mockinterview />} />
            <Route path="/Certificate" element={<Certificate />} />
            <Route path="/LearningCourses" element={<LearningCourses />} />

            {/* ✅ Protected Routes */}
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard /> : <Navigate to="/" />} 
            />
            <Route 
              path="/upload" 
              element={user ? <ResumeUpload resumeUploadRef={resumeUploadRef} /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>

        {/* ✅ Footer */}
        <Footer />

        {/* ✅ Authentication Popups */}
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
