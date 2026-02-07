import { useState } from "react";
import api, { setToken } from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    try {
      const res = await api.post("/users/register", { username, password });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);

      alert("Account created successfully 🎉");
      navigate("/home");
    } catch (err) {
      alert("User already exists. Please sign in.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
      <div className="bg-black/80 backdrop-blur-md rounded-lg shadow-2xl p-10 w-full max-w-md border border-gray-800">

        <h1 className="text-4xl font-extrabold text-red-600 text-center tracking-wide">
         Welcome! to Shopping Cart
        </h1>

        <p className="text-center text-gray-400 mt-2 mb-8">
          Create your account to get started
        </p>

        <div className="space-y-4">
          <input
            className="w-full bg-gray-800 text-white border border-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Choose a username"
            onChange={e => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Create a password"
            onChange={e => setPassword(e.target.value)}
          />

          <button
            onClick={signup}
            className="w-full bg-red-600 text-white py-3 rounded font-semibold hover:bg-red-700 transition"
          >
            Create Account
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?
          <span
            onClick={() => navigate('/')}
            className="text-white cursor-pointer ml-1 hover:underline"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
