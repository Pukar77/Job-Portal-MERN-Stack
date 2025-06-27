import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white mt-10 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Your Applied Jobs
      </h2>

      <div className="overflow-x-auto">
        <Table className="w-full text-sm text-left text-gray-700">
          <TableHeader>
            <TableRow className="bg-gray-100 border-b border-gray-200">
              <TableHead className="py-3 px-4 w-[120px]">Date</TableHead>
              <TableHead className="py-3 px-4">Job Role</TableHead>
              <TableHead className="py-3 px-4">Company</TableHead>
              <TableHead className="py-3 px-4">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allAppliedJobs.length <= 0 ? (
              <span>You haven't applied for any job</span>
            ) : (
              allAppliedJobs.map((appliedJob) => (
                <TableRow
                  key={appliedJob._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <TableCell className="py-3 px-4">
                    {appliedJob.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell className="py-3 px-4 font-medium">
                    {appliedJob?.job?.title}
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    {appliedJob?.job?.company?.name}
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <Badge
                      className={`${
                        appliedJob?.status === "rejected"
                          ? "bg-red-400"
                          : appliedJob?.status === "pending"
                          ? "bg-gray-400"
                          : "bg-green-400"
                      }`}
                    >
                      {appliedJob?.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AppliedJobTable;
