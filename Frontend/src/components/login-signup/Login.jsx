import React, { useState } from "react";
import Navbar from "../shared-component/Navbar";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/auth-slice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleinput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (e) {
      console.log("Some error occured in handlesubmit in signup ", e);
      toast.error(e?.response?.data?.message || "somthing is missing");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-2 pt-10">
        {/* Added pt-24 to push below navbar (adjust if your navbar is taller) */}
        <div className="bg-white rounded-xl p-6 w-full max-w-lg border-2">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Login to continue your journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleinput}
                placeholder="you@example.com"
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
                name="password"
                value={input.password}
                onChange={handleinput}
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
                    checked={input.role === "student"}
                    onChange={handleinput}
                    className="accent-blue-600"
                  />
                  Student
                </label>
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={handleinput}
                    className="accent-blue-600"
                  />
                  Recruiter
                </label>
              </div>
            </div>
            {loading ? (
              <button
                type="button"
                disabled
                className="w-full flex items-center justify-center gap-2 bg-blue-400 text-white font-medium py-2 rounded-md cursor-not-allowed"
              >
                <AiOutlineLoading3Quarters className="animate-spin text-white text-xl" />
                Please wait...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
              >
                Login
              </button>
            )}

            {/* Submit */}
            {/* <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
            >
              Login
            </button> */}
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
