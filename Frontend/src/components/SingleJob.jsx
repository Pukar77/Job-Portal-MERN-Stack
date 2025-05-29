import React from "react";
import { Button } from "./ui/button";
import { FaRegBookmark } from "react-icons/fa";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "@/components/ui/badge";

function SingleJob() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300 space-y-4 border border-gray-200">
      {/* Header: Date and Bookmark */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <p>2 days ago</p>
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
          <AvatarImage src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/06/Starbucks_Corporation_Logo_2011.svg-e1657703028844.png?auto=format&q=60&fit=max&w=930" />
        </Avatar>
        <div>
          <h2 className="text-md font-semibold">Starbucks</h2>
          <p className="text-sm text-gray-500">Nepal</p>
        </div>
      </div>

      {/* Job Title and Description */}
      <div>
        <h1 className="font-bold text-lg mb-1">Frontend Developer</h1>
        <p className="text-sm text-gray-600 line-clamp-3">
          We are looking for a skilled Frontend Developer to join our dynamic
          team. You'll work on creating intuitive interfaces using React and
          Tailwind. Prior experience with component libraries is a plus.
        </p>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">2 Positions</Badge>
          <Badge variant="outline">Part Time</Badge>
          <Badge variant="outline">20 LPA</Badge>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex gap-3 pt-2">
        <Button className=" cursor-pointer" variant="outline">
          View Details
        </Button>
        <Button className=" cursor-pointer bg-blue-600">Save for Later</Button>
      </div>
    </div>
  );
}

export default SingleJob;
