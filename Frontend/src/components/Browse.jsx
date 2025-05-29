import React from "react";
import Navbar from "./shared-component/Navbar";
import SingleJob from "./SingleJob";

const randomJob = [1, 2, 3,4,5,6,7];

function Browse() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-10 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Search Results{" "}
          <span className="text-blue-600">({randomJob.length})</span>
        </h1>

        {randomJob.length === 0 ? (
          <p className="text-gray-500 text-center">No jobs found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {randomJob.map((item, index) => (
              <div key={index}>
                <SingleJob />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Browse;
