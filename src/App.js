import { useState } from "react";
import Navbar from "./components/Navbar";
import SignInPopup from "./components/SignInPopup";
import SignUpPopup from "./components/SignUpPopup";

export default function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />
      {showSignIn && (
        <SignInPopup setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />
      )}
      {showSignUp && (
        <SignUpPopup setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />
      )}
    </div>
  );
}