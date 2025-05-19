import React from "react";
import { FaUserTie } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function Navbar() {
  const user = false;

  return (
    <header className="bg-white shadow-md px-6 py-4">
      <nav className="flex justify-between items-center  ">
        {/* Logo Section */}
        <div className="text-2xl font-bold text-gray-800">
          Apply <span className="text-blue-600">Rush</span>
        </div>

        {/* Nav Links + Avatar */}
        <div className="flex items-center gap-8">
          <ul className="flex gap-6 text-gray-700 font-medium">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">
              <Link to="/"> Home</Link>
            </li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">
              Job
            </li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">
              Browse
            </li>
          </ul>

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
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-48 mt-2 shadow-lg rounded-lg p-4 text-sm text-gray-800">
                <div className="font-semibold">Alex Rimal</div>
                <p className="text-xs text-gray-500 mb-3">alex@email.com</p>
                <ul className="space-y-2">
                  <div className="flex flex-col items-start">
                    <Button
                      className="hover:text-blue-600 cursor-pointer"
                      variant="link"
                    >
                      <FaUserTie />
                      Profile
                    </Button>

                    <Button
                      className="hover:text-blue-600 cursor-pointer"
                      variant="link"
                    >
                      <IoSettings />
                      Setting
                    </Button>

                    <Button
                      className="hover:text-blue-600 cursor-pointer"
                      variant="link"
                    >
                      <MdOutlineLogout />
                      Logout
                    </Button>
                  </div>
                </ul>
              </PopoverContent>
            </Popover>
          )}

          {/* Avatar Popover */}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
