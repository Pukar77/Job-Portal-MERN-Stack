import React, { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/job-slice";

const filterData = [
  {
    filterType: "Location",
    array: ["Kathmandu", "Bhaktapur", "Lalitpur", "Nuwakot", "Dhading"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Data Science",
    ],
  },
];

function FilterCard() {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandeler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 w-64 border border-gray-200 max-h-[88vh] overflow-y-auto">
      <h1 className="font-bold text-blue-500 text-2xl mb-3">Filter Jobs</h1>
      <hr className="border-t-2 border-red-600 mb-4" />

      {filterData.map((data, index) => (
        <div key={index} className="mb-6">
          <h2 className="font-semibold text-lg text-gray-700 mb-2">
            {data.filterType}
          </h2>
          <RadioGroup value={selectedValue} onValueChange={changeHandeler}>
            {data.array.map((item, idx) => {
              const itemId = `r${index}-${idx}`;
              return (
                <div key={idx} className="flex items-center space-x-2 mb-1">
                  <RadioGroupItem id={itemId} value={item} />
                  <label
                    htmlFor={itemId}
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    {item}
                  </label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
}

export default FilterCard;
