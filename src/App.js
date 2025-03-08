import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignInPopup from "./components/SignInPopup";
import SignUpPopup from "./components/SignUpPopup";
import ProtectedPage from "./pages/ProtectedPage";
import Footer from "./components/Footer";

export default function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />

        <Routes>
          <Route path="/" element={<h1 className="text-center text-2xl mt-10">Home Page</h1>} />
          <Route path="/login" element={<SignInPopup setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />} />
          <Route path="/protected" element={<ProtectedPage />} />
        </Routes>

        {showSignIn && (
          <SignInPopup setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />
        )}
        {showSignUp && (
          <SignUpPopup setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />
        )}
      </div>
      <Footer />
    </Router>
  );
}
