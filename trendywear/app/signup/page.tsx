"use client";

import { MdArrowBack } from "react-icons/md";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md mx-auto px-6 py-12 select-none">
        {/* Back */}
        <div className="mb-10 text-left">
          <a
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-[#c1121f] transition-colors"
          >
            <MdArrowBack className="text-base mr-1" />
            Back to Store
          </a>
        </div>

        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Create Account
          </h2>
          <p className="text-gray-500">
            Please enter your details to sign up.
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
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="block w-full px-2 py-2 border-0 border-b-2 border-gray-300 bg-transparent focus:ring-0 focus:border-[#c1121f] transition-colors"
            />
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="block w-full px-2 py-2 border-0 border-b-2 border-gray-300 bg-transparent focus:ring-0 focus:border-[#c1121f] transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full px-2 py-2 border-0 border-b-2 border-gray-300 bg-transparent focus:ring-0 focus:border-[#c1121f] transition-colors"
            />
          </div>

          {/* Reconfirm Password */}
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Reconfirm Password
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              className="block w-full px-2 py-2 border-0 border-b-2 border-gray-300 bg-transparent focus:ring-0 focus:border-[#c1121f] transition-colors"
            />
          </div>

          {/* Remember / Terms */}
          <div className="flex items-start mt-6">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-[#c1121f] border-gray-300 rounded focus:ring-[#c1121f] bg-transparent"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-500">
              I agree to the{" "}
              <a href="#" className="text-[#c1121f] hover:text-[#a1121f] transition-colors">
                Terms & Conditions
              </a>
            </label>
          </div>

          {/* Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 rounded shadow text-sm font-bold text-white bg-[#c1121f] hover:bg-[#a91c1c] hover:text-white transition-colors duration-300 ease-in-out"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Bottom */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-bold text-[#c1121f] hover:text-[#a1121f] transition-colors"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
