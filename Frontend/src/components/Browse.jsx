import React, { useEffect } from "react";
import Navbar from "./shared-component/Navbar";
import SingleJob from "./SingleJob";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../redux/job-slice";
import useGetAllJobs from "../hooks/useGetAllJobs";

function Browse() {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { alljobs } = useSelector((store) => store.job);
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  });
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-10 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Search Results{" "}
          <span className="text-blue-600">({alljobs.length})</span>
        </h1>

        {alljobs.length === 0 ? (
          <p className="text-gray-500 text-center">No jobs found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {alljobs.map((job) => (
              <div>
                <SingleJob key={job._id} job={job} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Browse;
