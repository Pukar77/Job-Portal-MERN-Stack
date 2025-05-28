import React from "react";
import JobCards from "./JobCards";

const randomjobs = [1, 2, 3, 4, 5, 6, 7, 8];

function LatestJobs() {
  return (
    <div>
      <div className="w-[90%] m-auto ">
        <h1 className="py-7 px-7 font-bold text-2xl text-center ">
          "Opportunity Doesn't Knock — It Clicks.
          <span className="text-blue-600"> Explore Now!"</span>
        </h1>
        <div className="grid grid-cols-3 gap-4 my-5">
          {randomjobs.map((items, index) => {
            return <JobCards />;
          })}
        </div>
      </div>
    </div>
  );
}

export default LatestJobs;
