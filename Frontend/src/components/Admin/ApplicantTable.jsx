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
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API } from "../../../utils/api";
const backendBaseUrl = "http://localhost:8000";

const shortListingStatus = ["Accepted", "Rejected"];

function ApplicantTable() {
  const { user } = useSelector((store) => store.auth);

  const { applicants } = useSelector((store) => store.application);
  const { applications } = useSelector((store) => store.application);
  console.log(applications);
  console.log(applicants);
  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (e) {
      console.log("Some error occured in applicantTable page ", e);
      toast.error(error.response.data.message);
    }
  };
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
                <TableRow key={item._id}>
                  <TableCell>{item?.applicant?.fullname}</TableCell>
                  <TableCell>{item?.applicant?.email}</TableCell>
                  <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                  <TableCell>
                    {item?.applicant?.profile?.resume ? (
                      <a
                        href={`${backendBaseUrl}/${item?.applicant?.profile?.resume}`}
                        target="_blank"
                      >
                        {item?.applicant?.fullname} CV
                      </a>
                    ) : (
                      // <a
                      //   href={`${backendBaseUrl}/${user.profile.resume}`}
                      //   target="_blank"
                      //   rel="noopener noreferrer"
                      //   className="text-blue-600 hover:underline font-semibold"
                      // >
                      //   📄 {user.profile.resumeOriginalName}
                      // </a>
                      // http://localhost:8000/uploads/536fdcbe-c8ff-4940-8cd7-71e9134719ff.pdf
                      <span>Resume not posted yet</span>
                    )}
                  </TableCell>

                  <TableCell>
                    {item?.applicant?.createdAt.split("T")[0]}
                  </TableCell>
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
                            onClick={() => {
                              statusHandler(status, item._id);
                            }}
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
