import axios from "axios";
import React, { useEffect } from "react";
import { JOB_API } from "../../utils/api";
import { useDispatch } from "react-redux";

import { setAllAdminJobs } from "../redux/job-slice";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminjobs = async () => {
      try {
        const res = await axios.get(`${JOB_API}/getadminjob`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log("Some error occured in fetch all job block ", error);
      }
    };
    fetchAllAdminjobs();
  }, []);
};

export default useGetAllAdminJobs;
