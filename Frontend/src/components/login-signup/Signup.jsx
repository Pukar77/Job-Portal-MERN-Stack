import React, { useState } from "react";
import Navbar from "../shared-component/Navbar";
import { Link } from "react-router-dom";

function Signup() {
  const [role, setRole] = useState("student");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-2 pt-10">
        {/* Added pt-24 to push below navbar (adjust if your navbar is taller) */}
        <div className="bg-white rounded-xl p-6 w-full max-w-lg border-2">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">
            Create an Account
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Sign up to find your dream job or hire top talent
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="98XXXXXXXX"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                I am a:
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={role === "student"}
                    onChange={() => setRole("student")}
                    className="accent-blue-600"
                  />
                  Student
                </label>
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={role === "recruiter"}
                    onChange={() => setRole("recruiter")}
                    className="accent-blue-600"
                  />
                  Recruiter
                </label>
              </div>
              <div className="mb-4">
                <label className=" text-gray-700 text-sm font-medium mb-1">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer file:cursor-pointer"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
