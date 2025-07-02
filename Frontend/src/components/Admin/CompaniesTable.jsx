import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { FaEdit } from "react-icons/fa";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover } from "../ui/popover";

function CompaniesTable() {
  const navigate = useNavigate();
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const backendBaseUrl = "http://localhost:8000";

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

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
            filterCompany.map((company) => {
              const imageUrl = `${backendBaseUrl}${company.logo}`;

              return (
                <TableRow key={company._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        className="h-18 w-20"
                        src={imageUrl}
                        alt="logo"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default-logo.png"; // optional fallback
                        }}
                      />
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
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/${company._id}`)
                          }
                          className="flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-150"
                        >
                          <FaEdit className="text-md" />
                          <span className="text-sm font-medium">Edit</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
