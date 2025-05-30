import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/auth-slice";
import { USER_API } from "../../utils/api";
import { setLoading } from "../redux/auth-slice";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills || [],
    file: user?.profile?.resume || null,
  });

  const changeEventHandeler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandeler = async (e) => {
    e.preventDefault();
    //if we need to send file also, then we must convert all the input as file data
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API}/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        //redux ma login garda ko user information hunxa, so after update we need to update the redux store also with the new user
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (e) {
      console.log("Error in submitHandeler:", e);
      const errorMsg =
        e?.response?.data?.message || e?.message || "Something went wrong!";
      toast.error(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
    setOpen(false);
    console.log(input);
  };

  //file upload garna ko lagi
  const fileChangeHandeler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center mb-4">
            Edit Your Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandeler} className="space-y-4">
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
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandeler}
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
              onChange={changeEventHandeler}
              value={input.email}
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
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandeler}
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
              value={input.bio}
              onChange={changeEventHandeler}
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
              value={input.skills}
              onChange={changeEventHandeler}
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
              onChange={fileChangeHandeler}
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
              disabled={loading}
              className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
