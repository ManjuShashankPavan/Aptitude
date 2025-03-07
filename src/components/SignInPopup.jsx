import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function SignInPopup({ setShowSignIn, setShowSignUp }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignIn = async () => {
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error?.message.includes("Email not confirmed")) {
      alert("Please verify your email before logging in.");
    } else if (error) {
      setError(error.message);
    } else {
      window.location.reload();
    }
  };

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const handleGitHubSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: "github" });
  };

  const handleClose = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>

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
            {showPassword ? "🙈" : "👁"}
          </button>
        </div>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <button
          onClick={handleSignIn}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 text-white p-2 rounded mt-2"
        >
          Sign In with Google
        </button>

        <button
          onClick={handleGitHubSignIn}
          className="w-full bg-gray-900 text-white p-2 rounded mt-2"
        >
          Sign In with GitHub
        </button>

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
