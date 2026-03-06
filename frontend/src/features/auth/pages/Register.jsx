import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    // console.log(username);
    await handleRegister({ username, email, password });
    navigate("/login");
  };
  return (
    <section className="rounded-xl bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
        <h1 className="text-2xl font-semibold">Register</h1>
        <p className="mt-1 text-sm text-slate-400">
          Create an account to get started.
        </p>

        <form onSubmit={handleRegisterSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="fullname"
              className="mb-1 block text-sm font-medium text-slate-300"
            >
              user name
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="fullname"
              type="text"
              placeholder="Enter User name"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none transition focus:border-sky-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-300"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none transition focus:border-sky-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-300"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="Enter password"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none transition focus:border-sky-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-500"
          >
            Sign Up
          </button>
          <p className="mt-4 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-sky-400 transition hover:text-sky-300"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
