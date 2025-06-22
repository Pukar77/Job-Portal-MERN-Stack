import React from "react";
import Navbar from "../shared-component/Navbar";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";

function Companies() {
  useGetAllCompanies();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Filter by name"
            className="px-4 py-2 border rounded-md w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={() => {
              navigate("/admin/companies/create");
            }}
            className="ml-4 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
}

export default Companies;
