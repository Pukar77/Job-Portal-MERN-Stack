import React, { useEffect, useState } from "react";
import Navbar from "../shared-component/Navbar";
import { Button } from "../ui/button";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "../../redux/job-slice";

function AdminJobs() {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Filter by name"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className="px-4 py-2 border rounded-md w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={() => {
              navigate("/admin/jobs/create");
            }}
            className="ml-4 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            New Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
}

export default AdminJobs;
