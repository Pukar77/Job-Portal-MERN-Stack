import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center mb-4">
            Edit Your Profile
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4">
          {/* Name */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Number */}
          <div className="flex flex-col">
            <label
              htmlFor="number"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Number
            </label>
            <input
              id="number"
              name="number"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col">
            <label
              htmlFor="bio"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Bio
            </label>
            <input
              id="bio"
              name="bio"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Skills */}
          <div className="flex flex-col">
            <label
              htmlFor="skills"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Skills
            </label>
            <input
              id="skills"
              name="skills"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Resume */}
          <div className="flex flex-col">
            <label
              htmlFor="file"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Resume (PDF)
            </label>
            <input
              id="file"
              name="file"
              type="file"
              accept="application/pdf"
              className="border border-gray-300 rounded-md px-3 py-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
