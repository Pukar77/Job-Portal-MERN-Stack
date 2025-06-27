import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/job-slice";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandeller = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="flex flex-col items-center justify-start px-6 pt-6 bg-white ">
      <span className="inline-block bg-indigo-100 text-indigo-800 px-4 py-1.5 rounded-full font-semibold text-sm shadow-sm mb-4 select-none">
        Your Skills, Our Search, Perfect Match. 😊
      </span>

      <h1 className="max-w-lg text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-8 leading-snug">
        "You're not just another applicant — and we're not just another{" "}
        <p className="text-blue-600">Job Board."</p>
      </h1>

      <div className="relative w-full max-w-md">
        <input
          type="text"
          className="w-full border border-indigo-400 rounded-full shadow-md pl-5 pr-14 py-3 text-gray-800 placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
          placeholder="Search your dream job"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button
          onClick={searchJobHandeller}
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-600 hover:text-indigo-800 focus:outline-none"
          aria-label="Search"
        >
          <FaSearch size={20} className="cursor-pointer" />
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
