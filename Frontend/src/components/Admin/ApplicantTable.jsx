import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";

const shortListingStatus = ["Accepted", "Rejected"];

function ApplicantTable() {
  const { applicants } = useSelector((store) => store.application);
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => {
              return (
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>johndoe@example.com</TableCell>
                  <TableCell>+123456789</TableCell>
                  <TableCell>
                    <a
                      href="#"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      View Resume
                    </a>
                  </TableCell>
                  <TableCell>2025-06-26</TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="p-1 rounded hover:bg-gray-100">
                          <MoreHorizontal className="text-gray-600 cursor-pointer" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        {shortListingStatus.map((status, index) => (
                          <div
                            key={index}
                            className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                          >
                            <span>{status}</span>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantTable;
