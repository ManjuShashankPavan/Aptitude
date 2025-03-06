import React from "react";
import Navbar from "./components/Navbar"; 
import SignInPoup from "./components/SignInPopup";
import SignUpPopup from "./components/SignUpPopup";

function App() {
  return (
    <div>
      <Navbar /> 
      <h2 className="text-center mt-10 text-2xl">
        Welcome to AI Interview Platform
      </h2>
      <SignInPoup />
      <SignUpPopup />
    </div>
  );
}

export default App;
