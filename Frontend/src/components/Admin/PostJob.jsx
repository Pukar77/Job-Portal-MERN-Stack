import React, { useState } from "react";
import Navbar from "../shared-component/Navbar";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API } from "../../../utils/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function PostJob() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({
      ...input,
      companyId: selectedCompany._id,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.message) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (e) {
      console.log("Some error occured in submit handler in post job", e);
      toast.error(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto bg-white p-8 mt-10 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Post a Job
        </h2>
        <form onSubmit={submitHandler} className="space-y-5">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              Requirement
            </label>
            <textarea
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Salary</label>
            <input
              type="text"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Job Type</label>
            <input
              type="text"
              name="jobType"
              value={input.jobType}
              onChange={changeEventHandler}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              Experience Level
            </label>
            <input
              type="text"
              name="experience"
              value={input.experience}
              onChange={changeEventHandler}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              No of Positions
            </label>
            <input
              type="text"
              name="position"
              value={input.position}
              onChange={changeEventHandler}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {companies.length > 0 ? (
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                Select Company
              </label>
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className=" border border-gray-300 rounded-md px-3 py-2">
                  <SelectValue placeholder="Choose a company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company?.name?.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <p className="text-center text-red-700">
              *You have to register a company before posting a job
            </p>
          )}

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
              Post Job
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default PostJob;
