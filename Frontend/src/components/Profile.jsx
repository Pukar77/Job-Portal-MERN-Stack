import React, { useState } from "react";
import Navbar from "./shared-component/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { FaEdit } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { MdOutlineContactPhone } from "react-icons/md";
import { Badge } from "./ui/badge";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/auth-slice";

// const skills = ["HTML", "CSS", "MONGODB"]; // You can fill this array with some skill strings to test
const isResume = true;

function Profile() {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white mt-10 p-8 rounded-xl shadow-md space-y-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={user.profile.profilePhoto}
              alt="User"
              className="rounded-full"
            />
          </Avatar>
          <div>
            <h1 className="text-xl font-bold">{user?.fullname}</h1>
            <p className="text-sm text-gray-600">{user?.profile?.bio}</p>
          </div>
          <div className="ml-auto">
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="flex items-center gap-2 cursor-pointer"
            >
              <FaEdit />
              Edit
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex items-center gap-10 text-gray-700">
          <div className="flex items-center gap-2">
            <IoIosMail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineContactPhone />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills */}
        <div>
          {Array.isArray(user?.profile?.skills) &&
          user.profile.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.profile.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))}
            </div>
          ) : (
            <span className="text-sm text-gray-500">
              Does not have any skills yet.
            </span>
          )}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mt-4 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Resume
          </label>
          {isResume ? (
            <a
              target="_blank"
              href={user.profile.resume}
              className="text-blue-600 hover:underline font-semibold"
            >
              📄 {user.profile.resumeOriginalName}
            </a>
          ) : (
            <span className="text-sm text-red-500">
              ❌ User hasn't uploaded the resume
            </span>
          )}
        </div>
      </div>
      <div>
        <h1 className="text-blue-600 text-center font-bold text-2xl mt-8">
          Applied Job
        </h1>
        {/* esma chai applied job ko lai table banaune, for that i have created a component name AppliedJobTable */}
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
