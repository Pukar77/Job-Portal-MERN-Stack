import React, { useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../redux/job-slice";

function JobDescription() {
  const isApplied = false;
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { singlejob } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchSingleJOb = async () => {
      try {
        const res = await axios.get(`${JOB_API}/getjob/${jobId}`, {
          withCredentials: true,
        });
        console.log(res);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (e) {
        console.log("Some error occured in job description block ", e);
      }
    };
    fetchSingleJOb();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto mt-10 space-y-6 border border-gray-200">
      {/* Job Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {singlejob?.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{singlejob?.position}</Badge>
          <Badge variant="outline">{singlejob?.jobType}</Badge>
          <Badge variant="outline">{singlejob?.Salary}</Badge>
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
            <strong>Role:</strong> <span>{singlejob?.title}</span>
          </p>
          <p>
            <strong>Location:</strong> <span>{singlejob?.location}</span>
          </p>
          <p>
            <strong>Description:</strong> <span>{singlejob?.description}</span>
          </p>
          <p>
            <strong>Experience:</strong>{" "}
            <span>{singlejob?.experienceLevel} Years</span>
          </p>
          <p>
            <strong>Salary:</strong> <span>{singlejob?.Salary}</span>
          </p>
          <p>
            <strong>Total Applicants:</strong>{" "}
            <span>{singlejob?.applications?.length}</span>
          </p>
          <p>
            <strong>Posted Date:</strong>{" "}
            <span>{singlejob?.createdAt.split("T")[0]}</span>
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
