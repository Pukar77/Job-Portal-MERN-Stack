import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

function JobDescription() {
  const isApplied = false;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto mt-10 space-y-6 border border-gray-200">
      {/* Job Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Frontend Developer
        </h1>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">2 Positions</Badge>
          <Badge variant="outline">Part Time</Badge>
          <Badge variant="outline">20 LPA</Badge>
        </div>
      </div>

      {/* Job Description Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-1">
          Job Details
        </h2>
        <hr className="border-t-2 border-red-500 mb-4" />

        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Role:</strong> <span>Frontend Developer</span>
          </p>
          <p>
            <strong>Location:</strong> <span>Kathmandu</span>
          </p>
          <p>
            <strong>Description:</strong>{" "}
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit,
              molestiae? Doloribus quasi pariatur perferendis eum sint. Porro
              iusto veritatis deleniti?
            </span>
          </p>
          <p>
            <strong>Experience:</strong> <span>2 years</span>
          </p>
          <p>
            <strong>Salary:</strong> <span>12 LPA</span>
          </p>
          <p>
            <strong>Total Applicants:</strong> <span>4</span>
          </p>
          <p>
            <strong>Posted Date:</strong> <span>23-04-2025</span>
          </p>
        </div>

        {/* Apply Button */}
        <div>
          <Button
            disabled={isApplied}
            className={`w-full text-white py-2 mt-2 font-semibold transition-colors cursor-pointer ${
              isApplied
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
