import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";

function LatestJobs() {
  const { alljobs } = useSelector((store) => store.job);
  return (
    <div>
      <div className="w-[90%] m-auto ">
        <h1 className="py-7 px-7 font-bold text-2xl text-center ">
          "Opportunity Doesn't Knock — It Clicks.
          <span className="text-blue-600"> Explore Now!"</span>
        </h1>
        <div className="grid grid-cols-3 gap-4 my-5">
          {alljobs.length <= 0 ? (
            <span>No jobs have been posted yet</span>
          ) : (
            alljobs.map((job) => {
              return <JobCards key={job._id} job={job} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default LatestJobs;
