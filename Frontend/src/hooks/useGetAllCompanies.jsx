import axios from "axios";
import React, { useEffect } from "react";
import { COMPANY_API } from "../../utils/api";
import { useDispatch } from "react-redux";
import { setCompanies } from "../redux/CompanySlice";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log("Some error occured in fetch all job block ", error);
      }
    };
    fetchCompanies();
  }, []);
};

export default useGetAllCompanies;
