import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function SignInPopup({ setShowSignIn, setShowSignUp }) {
  const { signIn } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>

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

        {/* Login Button */}
        <button
          onClick={signIn}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        {/* Sign Up Option */}
        <p className="text-center text-sm text-gray-600 mt-3">
          Don't have an account?{" "}
          <span
            onClick={() => {
              setShowSignIn(false);
              setShowSignUp(true);
            }}
            className="text-green-500 cursor-pointer hover:underline"
          >
            Create an account
          </span>
        </p>

        {/* Close Button */}
        <button
          onClick={() => setShowSignIn(false)}
          className="w-full mt-2 text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
