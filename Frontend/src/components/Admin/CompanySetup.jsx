import React, { useState } from "react";
import Navbar from "../shared-component/Navbar";
import { Button } from "../ui/button";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { COMPANY_API } from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function CompanySetup() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandeler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const res = await axios.put(`${COMPANY_API}/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (e) {
      console.log("Some error occured in companySetup page ", e);
      toast.error(e?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-8 mt-10">
        <form onSubmit={submitHandeler} className="space-y-6">
          <Button
            onClick={() => {
              navigate("/admin/companies");
            }}
            variant="outline"
            className="flex items-center gap-2 mb-4"
          >
            <IoMdArrowRoundBack className="text-lg" />
            <span>Back</span>
          </Button>

          <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">
            Company Setup
          </h1>

          <div className="space-y-1">
            <label className="block font-medium text-gray-600">
              Company Name
            </label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company name"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-medium text-gray-600">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Short description"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-medium text-gray-600">Website</label>
            <input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://yourcompany.com"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-medium text-gray-600">Location</label>
            <input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company address or city"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-medium text-gray-600">Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0 file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
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
              Update
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default CompanySetup;
