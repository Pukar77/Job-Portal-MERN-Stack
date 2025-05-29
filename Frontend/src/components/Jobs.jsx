import React from "react";
import Navbar from "./shared-component/Navbar";
import FilterCard from "./FilterCard";
import SingleJob from "./SingleJob";

const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];

function Jobs() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-6">
        <div className="flex gap-5">
          <div className="w-1/5">
            <FilterCard />
          </div>
          {jobArray.length <= 0 ? (
            <span>No jobs available</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {jobArray.map((item, index) => (
                  <div key={index}>
                    <SingleJob />
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
