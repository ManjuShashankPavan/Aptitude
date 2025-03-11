import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignInPopup = ({ setShowSignIn, setShowSignUp }) => {
  const { signIn, signInWithGoogle, signInWithGitHub, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email) {
      setError("Email is required!");
      setLoading(false);
      return;
    }

    if (resetMode) {
      // ✅ Forgot Password
      const errorMessage = await resetPassword(email);
      if (errorMessage) {
        setError(errorMessage);
      } else {
        setError("Password reset link sent to your email.");
        setTimeout(() => setResetMode(false), 3000); // Auto-switch back to sign-in
      }
      setLoading(false);
      return;
    }

    // ✅ Normal Sign In
    const errorMessage = await signIn(email, password);
    if (errorMessage) {
      setError(errorMessage);
    } else {
      setShowSignIn(false);
      navigate("/dashboard");
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    const errorMessage = await signInWithGoogle();
    if (errorMessage) setError(errorMessage);
    setLoading(false);
  };

  const handleGitHubSignIn = async () => {
    setLoading(true);
    setError("");
    const errorMessage = await signInWithGitHub();
    if (errorMessage) setError(errorMessage);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center">
          {resetMode ? "Reset Password" : "Sign In"}
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSignIn} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          {!resetMode && (
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Processing..." : resetMode ? "Send Reset Link" : "Sign In"}
          </button>
        </form>

        {!resetMode && (
          <>
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg mt-2"
            >
              Sign in with Google
            </button>
            <button
              onClick={handleGitHubSignIn}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg mt-2"
            >
              Sign in with GitHub
            </button>
          </>
        )}

        <p className="mt-4 text-center">
          {resetMode ? (
            <span
              onClick={() => setResetMode(false)}
              className="text-blue-600 cursor-pointer"
            >
              Back to Sign In
            </span>
          ) : (
            <>
              Forgot password?{" "}
              <span
                onClick={() => setResetMode(true)}
                className="text-blue-600 cursor-pointer"
              >
                Reset here
              </span>
            </>
          )}
        </p>

        <p className="mt-2 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => {
              setShowSignIn(false);
              setShowSignUp(true);
            }}
            className="text-blue-600 cursor-pointer"
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInPopup;
