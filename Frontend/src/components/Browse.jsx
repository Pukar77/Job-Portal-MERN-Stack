import React, { useEffect } from "react";
import Navbar from "./shared-component/Navbar";
import SingleJob from "./SingleJob";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../redux/job-slice";
import useGetAllJobs from "../hooks/useGetAllJobs";

function Browse() {
  useGetAllJobs(); // fetch all jobs
  const dispatch = useDispatch();
  const { alljobs, searchedQuery } = useSelector((store) => store.job);

  // Reset query when leaving page
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  // Filter jobs based on searchedQuery
  const filteredJobs = searchedQuery
    ? alljobs.filter((job) => {
        const query = searchedQuery.toLowerCase();
        return (
          job.title.toLowerCase().includes(query) ||
          job.company?.name.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.jobType.toLowerCase().includes(query)
        );
      })
    : alljobs; // if no search, show all

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-10 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Search Results{" "}
          <span className="text-blue-600">({filteredJobs.length})</span>
        </h1>

        {filteredJobs.length === 0 ? (
          <p className="text-gray-500 text-center">No jobs found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <SingleJob key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Browse;
