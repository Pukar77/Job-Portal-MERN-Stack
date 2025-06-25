import React, { useState } from "react";
import Navbar from "../shared-component/Navbar";

function PostJob() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirement: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const changeEventHandeler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
      <label>Title</label>
      <input
        type="text"
        name="title"
        value={input.title}
        onChange={changeEventHandeler}
      />

      <label>description</label>

      <input
        type="text"
        name="description"
        value={input.description}
        onChange={changeEventHandeler}
      />

      <label>requirement</label>

      <input
        type="text"
        name="requirement"
        value={input.requirement}
        onChange={changeEventHandeler}
      />

       <input
        type="text"
        name="requirement"
        value={input.requirement}
        onChange={changeEventHandeler}
      />

       <input
        type="text"
        name="salary"
        value={input.salary}
        onChange={changeEventHandeler}
      />

        <input
        type="text"
        name="location"
        value={input.location}
        onChange={changeEventHandeler}
      />
    </div>
  );
}

export default PostJob;
