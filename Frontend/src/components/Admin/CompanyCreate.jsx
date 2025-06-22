import React, { useState } from "react";
import Navbar from "../shared-component/Navbar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API } from "../../../utils/api";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/CompanySlice";

function CompanyCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { companyName, description, website, location } = companyInfo;

  const changeEventHandler = (e) => {
    setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value });
  };

  const registerCompany = async () => {
    const formData = new FormData();
    formData.append("companyName", companyInfo.companyName);
    formData.append("description", companyInfo.description);
    formData.append("website", companyInfo.website);
    formData.append("location", companyInfo.location);
    if (companyInfo.file) {
      formData.append("file", companyInfo.file);
    }
    try {
      const res = await axios.post(`${COMPANY_API}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setSingleCompany(res.data.company));
        // const companyId = res.data?.company?._id;
        // navigate(`/admin/companies/${companyId}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto mt-16 bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Your Company Name
        </h1>
        <p className="text-gray-500 mb-6">
          Please provide your company name below.
        </p>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company Name
        </label>
        <input
          type="text"
          name="companyName"
          placeholder="Google, Microsoft, etc."
          value={companyInfo.companyName}
          onChange={changeEventHandler}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-6"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company Description
        </label>
        <textarea
          placeholder="Google, Microsoft, etc."
          name="description"
          value={companyInfo.description}
          onChange={changeEventHandler}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-6"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company website
        </label>
        <input
          placeholder="www.company.com"
          name="website"
          value={companyInfo.website}
          onChange={changeEventHandler}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-6"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company Location
        </label>
        <input
          placeholder="Kathmandu, Bhaktapur...."
          name="location"
          value={companyInfo.location}
          onChange={changeEventHandler}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-6"
        />
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company Logo
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setCompanyInfo({ ...companyInfo, file: e.target.files[0] })
          }
          className="w-full mb-6"
        />

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button className="cursor-pointer" onClick={registerCompany}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CompanyCreate;
