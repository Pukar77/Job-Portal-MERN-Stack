import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { APPLICATION_API } from "../../utils/api";
import { setAllAppliedJobs } from "../redux/job-slice";

function useGetAppliedJob() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJob = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API}/getjob`, {
          withCredentials: true,
        });

        console.log(res.data);

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
        }
      } catch (error) {
        console.log("some error occured in useGetAppliedJob page ", error);
      }
    };
    fetchAppliedJob();
  }, []);
}

export default useGetAppliedJob;
