import React from "react";
import { Badge } from "@/components/ui/badge";

function JobCards() {
  return (
    <div className="p-6 rounded-2xl shadow-md bg-white border border-gray-200 hover:shadow-xl transition duration-300 cursor-pointer space-y-4">
      {/* Company Info */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Company Name</h2>
          <p className="text-sm text-gray-500">Nepal</p>
        </div>
        <img
          src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/06/Starbucks_Corporation_Logo_2011.svg-e1657703028844.png?auto=format&q=60&fit=max&w=930"
          alt="Company Logo"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>

      {/* Job Info */}
      <div>
        <h3 className="text-lg font-bold text-blue-700 ">Frontend Developer</h3>
        <p className="text-sm text-gray-500 line-clamp-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem doloremque itaque corporis voluptatibus suscipit eos ullam dolorem voluptatem ad porro voluptates nihil alias, optio natus soluta voluptate iure possimus ratione.
          Were looking for a passionate developer with experience in React.js
          and Tailwind CSS.lorem20
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline">2 Positions</Badge>
        <Badge variant="outline">Part Time</Badge>
        <Badge variant="outline">20 LPA</Badge>
      </div>
    </div>
  );
}

export default JobCards;
