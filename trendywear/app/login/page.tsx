"use client";

import { MdArrowBack } from "react-icons/md";

export default function LoginPage() {
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
        <div className="mb-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Sign In
          </h2>
          <p className="text-gray-500">
            Please enter your details to sign in.
          </p>
        </div>

        {/* Form */}
        <form action="#" method="POST" className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email / Username  
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
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
              <a
                href="#"
                className="text-xs font-medium text-primary hover:text-red-700 transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full px-2 py-2 border-0 border-b-2 border-gray-300 bg-transparent focus:ring-0 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Remember */}
          <div className="flex items-center mt-6">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary bg-transparent"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-500">
              Remember me
            </label>
          </div>

          {/* Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 rounded shadow text-sm font-bold text-white bg-[#c1121f] hover:bg-[#a91c1c] hover:text-white transition-colors"
            >
              Sign In
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
