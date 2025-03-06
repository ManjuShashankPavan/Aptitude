import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import SignInPopup from "./SignInPopup"; // Import the SignInPopup component

export default function SignUpPopup() {
  const { setShowSignUp, signIn } = useAuth();

  // State to store form data
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Control popup state
  const [showSignIn, setShowSignIn] = useState(false);

  // Function to handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      {showSignIn ? (
        <SignInPopup setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>

            {/* First Name */}
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full p-2 border rounded mb-3"
              value={form.firstName}
              onChange={handleChange}
            />

            {/* Last Name */}
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full p-2 border rounded mb-3"
              value={form.lastName}
              onChange={handleChange}
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border rounded mb-3"
              value={form.email}
              onChange={handleChange}
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full p-2 border rounded mb-3 pr-10"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>

            {/* Confirm Password */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-2 border rounded mb-3"
              value={form.confirmPassword}
              onChange={handleChange}
            />

            {/* Register Button */}
            <button
              onClick={signIn}
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Register
            </button>

            {/* Sign In Option */}
            <p className="text-center text-sm text-gray-600 mt-3">
              Already have an account?{" "}
              <span
                onClick={() => setShowSignIn(true)}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Sign in
              </span>
            </p>

            {/* Close Button */}
            <button
              onClick={() => setShowSignUp(false)}
              className="w-full mt-2 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
