import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function SignUpPopup({ setShowSignIn, setShowSignUp }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    setError("");
    if (!form.firstName || !form.lastName) {
      setError("First name and last name are required");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          firstName: form.firstName,  
          lastName: form.lastName,
          avatar_url: "https://via.placeholder.com/150", // Default avatar URL
        },
      },
    });

    setLoading(false);

    if (error) setError(error.message);
    else alert("Check your email to verify your account!");
  };

  const handleClose = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="w-full p-3 border rounded-lg mb-3"
          value={form.firstName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="w-full p-3 border rounded-lg mb-3"
          value={form.lastName}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-3"
          value={form.email}
          onChange={handleChange}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg mb-3 pr-10"
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁‍🗨" : "👁"}
          </button>
        </div>

        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full p-3 border rounded-lg mb-3"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <button
          onClick={handleSignUp}
          className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-3">
          Already have an account?{" "}
          <span
            onClick={() => {
              setShowSignUp(false);
              setShowSignIn(true);
            }}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>

        <button
          onClick={handleClose}
          className="w-full mt-3 text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
