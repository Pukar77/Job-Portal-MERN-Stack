import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Popover } from "../ui/popover";
import { ImUsers } from "react-icons/im";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

function AdminJobsTable() {
  const backendBaseUrl = "http://localhost:8000/api/v1/job";
  const navigate = useNavigate();
  useGetAllCompanies();
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);

  // filter jobs on search
  useEffect(() => {
    const filteredJobs =
      allAdminJobs?.filter((job) => {
        if (!searchJobByText) return true;
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      }) || [];

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  // DELETE JOB FUNCTION (axios)
  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    console.log(jobId);
    try {
      // http://localhost:8000/api/v1/job/delete/686543fb2d2337b22797d672
      const response = await axios.delete(`${backendBaseUrl}/delete/${jobId}`, {
        withCredentials: true,
      });
      console.log(response.body);

      if (response.status === 200) {
        toast.success("Job deleted successfully!");
        // remove from UI
        setFilterJobs((prev) => prev.filter((job) => job._id !== jobId));
      } else {
        toast.error("Failed to delete job.");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!filterJobs || filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>
                You haven't posted any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name || "Untitled Job"}</TableCell>
                <TableCell>{job?.title || "Not specified"}</TableCell>
                <TableCell>{job.createdAt?.split("T")[0]}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger className="text-5xl cursor-pointer mb-7">
                      ...
                    </PopoverTrigger>
                    <PopoverContent className="bg-white rounded-xl shadow-lg p-4 w-36 border border-gray-200">
                      {/* Applicants */}
                      <div
                        onClick={() => {
                          navigate(`/admin/jobs/${job._id}/applicants`);
                        }}
                        className="flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-150"
                      >
                        <ImUsers size={20} />
                        <span className="text-sm font-medium">Applicants</span>
                      </div>

                      {/* Delete */}
                      <div
                        onClick={() => handleDelete(job._id)}
                        className="flex items-center gap-3 text-red-600 hover:text-red-800 hover:bg-red-100 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-150"
                      >
                        <FaTrash size={18} />
                        <span className="text-sm font-medium">Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
