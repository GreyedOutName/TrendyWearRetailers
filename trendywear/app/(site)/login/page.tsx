"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "../context/UserContext";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUser();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setUser(data.user);

    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md mx-auto px-6 py-12 select-none">
        {/* Back */}
        <div className="mb-10 text-left">
          <a
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors"
          >
            <MdArrowBack className="text-base mr-1" />
            Back to Store
          </a>
        </div>

        {/* Heading */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Sign In
          </h2>
          <p className="text-gray-500">
            Sign in with your email and password.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-2 py-2 border-0 border-b-2 border-gray-300 bg-transparent focus:ring-0 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <span className="text-xs font-medium text-primary text-gray-400 ">
                Forgot password?
              </span>
            </div>

            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-2 py-2 border-0 border-b-2 border-gray-300 bg-transparent focus:ring-0 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 rounded shadow text-sm font-bold text-white bg-[#c1121f] hover:bg-[#a91c1c] hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        {/* Bottom */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-bold text-[#c1121f] hover:text-[#a1121f] transition-colors"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
