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
import { FaEdit } from "react-icons/fa";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useNavigate } from "react-router-dom";

function AdminJobsTable() {
  const backendBaseUrl = "http://localhost:8000";
  const navigate = useNavigate();
  useGetAllCompanies();
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);

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
                      <div
                        onClick={() => {
                          navigate(`/admin/companies/${job._id}`);
                        }}
                        className="flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-150"
                      >
                        <FaEdit className="text-md" />
                        <span className="text-sm font-medium">Edit</span>
                      </div>

                      <div
                        onClick={() => {
                          navigate(`/admin/jobs/${job._id}/applicants`);
                        }}
                        className="flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-150"
                      >
                        <ImUsers size={42} className="text-3xl" />
                        <span className="text-sm font-medium">Applicants</span>
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
