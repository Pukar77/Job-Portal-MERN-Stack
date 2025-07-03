import React from "react";
import Navbar from "./shared-component/Navbar";
import FilterCard from "./FilterCard";
import SingleJob from "./SingleJob";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

function Jobs() {
  const { alljobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(alljobs);
  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = alljobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(alljobs);
    }
  }, [alljobs, searchedQuery]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-6">
        <div className="flex gap-5">
          <div className="w-1/5">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>No jobs available</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <div key={job._id}>
                    <SingleJob job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
