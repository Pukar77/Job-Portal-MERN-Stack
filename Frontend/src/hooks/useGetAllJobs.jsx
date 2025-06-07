import axios from "axios";
import React, { useEffect } from "react";
import { JOB_API } from "../../utils/api";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../redux/job-slice";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAlljobs = async () => {
      try {
        const res = await axios.get(`${JOB_API}/getjob`, {
          withCredentials: true,
        });
        if (res.data.success) {
            dispatch(setAllJobs(res.data.jobs));

        }
      } catch (error) {
        console.log("Some error occured in fetch all job block ", error);
      }
    };
    fetchAlljobs();
  }, []);
};

export default useGetAllJobs;
