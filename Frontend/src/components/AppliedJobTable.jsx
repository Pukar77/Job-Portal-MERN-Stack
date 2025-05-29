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

function AppliedJobTable() {
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
            {[1, 2, 3, 4].map((item, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <TableCell className="py-3 px-4">23-04-2025</TableCell>
                <TableCell className="py-3 px-4 font-medium">
                  Backend Developer
                </TableCell>
                <TableCell className="py-3 px-4">Rimal Technology</TableCell>
                <TableCell className="py-3 px-4">
                  <Badge className="bg-green-100 text-green-800 border border-green-300">
                    Selected
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AppliedJobTable;
