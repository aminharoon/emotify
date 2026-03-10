import React from "react";
import { Link } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";

const Home = () => {
  const { laoding, user, handleLogout } = useAuth();
  console.log(user);
  return (
    <div className=" bg-gradient-to-b from-slate-950 to-slate-900 px-4 py-16 text-slate-100">
      <div className="mx-auto max-w-4xl text-center">
        {/* Hero Section */}
        <div className="space-y-6">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Moodifym {user.username}
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-slate-400 sm:text-xl">
            Express yourself, track your emotions, and discover patterns in your
            daily mood. Start your journey to better emotional awareness today.
          </p>

          <div className="pt-4">
            <button
              onClick={() => handleLogout()}
              className="inline-block rounded-lg bg-red-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-500"
            >
              logout
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid gap-8 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
            <div className="mb-4 text-4xl">🎭</div>
            <h3 className="text-lg font-semibold">Track Emotions</h3>
            <p className="mt-2 text-sm text-slate-400">
              Monitor your daily emotional states with ease
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
            <div className="mb-4 text-4xl">📊</div>
            <h3 className="text-lg font-semibold">Analyze Patterns</h3>
            <p className="mt-2 text-sm text-slate-400">
              Discover insights about your emotional trends
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
            <div className="mb-4 text-4xl">💡</div>
            <h3 className="text-lg font-semibold">Gain Awareness</h3>
            <p className="mt-2 text-sm text-slate-400">
              Build better emotional intelligence over time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
