import React from "react";
import Navbar from "./shared-component/Navbar";
import FilterCard from "./FilterCard";
import SingleJob from "./SingleJob";
import { useSelector } from "react-redux";



function Jobs() {
  const {alljobs} = useSelector(store=>store.job);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-6">
        <div className="flex gap-5">
          <div className="w-1/5">
            <FilterCard />
          </div>
          {alljobs.length <= 0 ? (
            <span>No jobs available</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {alljobs.map((job) => (
                  <div key={job._id}>
                    <SingleJob job={job}/>
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
