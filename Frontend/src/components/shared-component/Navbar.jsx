import React from "react";
import { FaUserTie } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API } from "../../../utils/api";
import { setUser } from "../../redux/auth-slice";
import { toast } from "sonner";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const backendBaseUrl = "http://localhost:8000";
  const handleLogOut = async () => {
    try {
      const res = await axios.get(`${USER_API}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (e) {
      console.log("Some error occurred while logging out", e);
    }
  };

  return (
    <header className="bg-white shadow-md px-6 py-4">
      <nav className="flex justify-between items-center">
        {/* Left: Logo */}
        <div className="text-2xl font-bold text-gray-800">
          Apply <span className="text-blue-600">Rush</span>
        </div>

        {/* Right: Nav Links + Avatar/Auth */}
        <div className="flex items-center gap-8">
          {/* Nav Links */}
          {user && user.role === "recruiter" ? (
            <ul className="flex gap-6 text-gray-700 font-medium">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                <Link to="/admin/companies">Companies</Link>
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                <Link to="/admin/jobs">Jobs</Link>
              </li>
            </ul>
          ) : (
            <ul className="flex gap-6 text-gray-700 font-medium">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                <Link to="/jobs">Jobs</Link>
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                <Link to="/browse">Browse</Link>
              </li>

              {user ? (
                <li className="hover:text-blue-600 cursor-pointer transition-colors">
                  <Link to="/recommend">Recommend job</Link>
                </li>
              ) : (
                <span className="cursor-pointer"
                  onClick={() => {
                    toast.error("You must login to use this feature");
                  }}
                >
                  Recommend job
                </span>
              )}

              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                <Link to="/chatbot">Chat with AI</Link>
              </li>
            </ul>
          )}

          {/* Avatar or Login/Signup */}
          {!user ? (
            <div className="flex gap-4">
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Link to="/login">Login</Link>
              </Button>

              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 cursor-pointer"
              >
                <Link to="/signup">Signup</Link>
              </Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-blue-500 hover:ring-blue-600 transition-all duration-200">
                  <AvatarImage
                    src={`${backendBaseUrl}/${user.profile.profilePhoto}`}
                    alt="User"
                  />
                  <AvatarFallback>PP</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-48 mt-2 shadow-lg rounded-lg p-4 text-sm text-gray-800">
                <div className="font-semibold">{user.fullname}</div>
                <p className="text-xs text-gray-500 mb-3">{user.email}</p>
                <ul className="space-y-2">
                  <div className="flex flex-col items-start">
                    {user && user.role === "student" && (
                      <Button
                        className="hover:text-blue-600 cursor-pointer"
                        variant="link"
                      >
                        <FaUserTie />

                        <Link to="/profile" className="ml-2">
                          Profile
                        </Link>
                      </Button>
                    )}

                    <Button
                      onClick={handleLogOut}
                      className="hover:text-blue-600 cursor-pointer"
                      variant="link"
                    >
                      <MdOutlineLogout />
                      <span className="ml-2">Logout</span>
                    </Button>
                  </div>
                </ul>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
