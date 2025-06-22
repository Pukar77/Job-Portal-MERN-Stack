import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Popover } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import React from "react";
import { FaEdit } from "react-icons/fa";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";

function CompaniesTable() {
  const { companies } = useSelector((store) => store.company);

  return (
    <div>
      <Table>
        <TableCaption>A list of your registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!companies || companies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>
                You haven't registered any company yet.
              </TableCell>
            </TableRow>
          ) : (
            companies.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage className="h-18 w-20" src={company.logo} />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt?.split("T")[0]}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger className="text-5xl cursor-pointer mb-7">
                      ...
                    </PopoverTrigger>
                    <PopoverContent className="bg-white rounded-xl shadow-lg p-4 w-36 border border-gray-200">
                      <div className="flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-150">
                        <FaEdit className="text-md" />
                        <span className="text-sm font-medium">Edit</span>
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

export default CompaniesTable;
