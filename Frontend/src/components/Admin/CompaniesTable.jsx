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

function CompaniesTable() {
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
          <TableCell>
            <Avatar>
              <AvatarImage
                className="h-18 w-20"
                src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/06/Starbucks_Corporation_Logo_2011.svg-e1657703028844.png?auto=format&q=60&fit=max&w=930"
              />
            </Avatar>
          </TableCell>
          <TableCell>Company Name</TableCell>
          <TableCell>18-07-2024</TableCell>
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
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
