import React from "react";

function Navbar() {
  return (
    <div className="bg-white">
      <div className="flex justify-around items-center leading-normal">
        <div>
          <h1>
            Apply <span>Rush</span>
          </h1>
        </div>

        <div>
          <ul className="flex gap-15">
            <li>Home</li>
            <li>Job</li>
            <li>Browse</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
