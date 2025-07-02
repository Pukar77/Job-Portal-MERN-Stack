import React from "react";
import { Button } from "./ui/button";
import { FaRegBookmark } from "react-icons/fa";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

function SingleJob({ job }) {
  const backendBaseUrl = "http://localhost:8000";
  const navigate = useNavigate();

  const DaysAgoFunction = (mongodbtime) => {
    const createdAt = new Date(mongodbtime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300 space-y-4 border border-gray-200">
      {/* Header: Date and Bookmark */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <p>
          {" "}
          {DaysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${DaysAgoFunction(job?.createdAt)}`}{" "}
          days ago{" "}
        </p>
        <Button
          variant="outline"
          className="rounded-full size-8 flex items-center justify-center p-1"
        >
          <FaRegBookmark className="text-gray-600" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4">
        <Avatar className="size-12">
          <AvatarImage src={`${backendBaseUrl}${job?.company?.logo}`} />
        </Avatar>
        <div>
          <h2 className="text-md font-semibold">{job?.company?.name}</h2>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      {/* Job Title and Description */}
      <div>
        <h1 className="font-bold text-lg mb-1">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{job?.position} Positions</Badge>
          <Badge variant="outline">{job?.jobType}</Badge>
          <Badge variant="outline">{job?.Salary}</Badge>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex gap-3 pt-2">
        <Button
          onClick={() => {
            navigate(`/description/${job?._id}`);
          }}
          className=" cursor-pointer"
          variant="outline"
        >
          View Details
        </Button>
        <Button className=" cursor-pointer bg-blue-600">Save for Later</Button>
      </div>
    </div>
  );
}

export default SingleJob;
