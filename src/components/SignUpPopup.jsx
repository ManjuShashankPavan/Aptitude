import { useState } from "react";

export default function SignUpPopup({ setShowSignIn, setShowSignUp }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
            {showPassword ? "🙈" : "👁"}
          </button>
        </div>

        <button className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition">
          Register
        </button>

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
