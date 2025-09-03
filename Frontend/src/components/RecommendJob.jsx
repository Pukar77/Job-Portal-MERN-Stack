"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/shared-component/Navbar";

function JobRecommendationCard({ job, rank, navigate }) {
  const DaysAgoFunction = (mongodbtime) => {
    const createdAt = new Date(mongodbtime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const getExperienceLevel = (level) => {
    const levels = {
      1: "Entry Level",
      2: "Junior Level",
      3: "Mid Level",
      4: "Senior Level",
      5: "Expert Level",
    };
    return levels[level] || `${level} Years`;
  };

  const matchScore = Number(job.similarity_score * 10).toFixed(1);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 space-y-4 border border-gray-200 relative overflow-hidden">
      {/* Match Score Badge */}
      <div className="absolute top-4 right-4">
        <div
          className={`text-white px-3 py-1 rounded-full text-sm font-semibold ${
            job.similarity_score >= 5.5
              ? "bg-gradient-to-r from-green-500 to-emerald-500"
              : job.similarity_score >= 4.5
              ? "bg-gradient-to-r from-yellow-500 to-orange-500"
              : "bg-gradient-to-r from-red-500 to-pink-500"
          }`}
        >
          {matchScore}% Match
        </div>
      </div>

      {/* Rank Badge */}
      <div className="absolute top-4 left-4">
        <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
          #{rank}
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between text-sm text-gray-500 pt-8">
        <p>
          {DaysAgoFunction(job.createdAt) === 0
            ? "Today"
            : `${DaysAgoFunction(job.createdAt)} days ago`}
        </p>
        <button className="rounded-full w-8 h-8 flex items-center justify-center p-1 border border-gray-300 hover:border-gray-400 transition-colors">
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-lg">
            {job.title.charAt(0)}
          </span>
        </div>
        <div>
          <h2 className="text-md font-semibold text-gray-900">
            Company name: {job.company}
          </h2>
          <p className="text-sm text-gray-500 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {job.location}
          </p>
        </div>
      </div>

      {/* Job Title and Description */}
      <div>
        <h1 className="font-bold text-xl mb-2 text-gray-900">{job.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {job.description.length > 200
            ? `${job.description.substring(0, 200)}...`
            : job.description}
        </p>
      </div>

      {/* Job Details */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
          {job.position} Position{job.position > 1 ? "s" : ""}
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
          {job.jobType}
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
          ${job.Salary}k
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
          {getExperienceLevel(job.experienceLevel)}
        </span>
      </div>

      {/* Requirements */}
      {job.requirements && job.requirements.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Key Requirements:
          </h4>
          <div className="text-xs text-gray-600">
            {job.requirements.slice(0, 2).map((req, index) => (
              <div key={index} className="flex items-start mb-1">
                <span className="text-blue-500 mr-2">•</span>
                <span className="line-clamp-1">{req.trim()}</span>
              </div>
            ))}
            {job.requirements.length > 2 && (
              <span className="text-blue-600 text-xs">
                +{job.requirements.length - 2} more requirements
              </span>
            )}
          </div>
        </div>
      )}

      {/* Match Score Progress Bar */}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={() => navigate(`/description/${job._id}`)}
          className="flex-1 px-4 py-2 border border-gray-300 text-white  bg-blue-600 rounded-lg hover:bg-black transition-colors font-medium cursor-pointer"
        >
          View Details
        </button>
      </div>

      {/* Job ID */}
      <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-100">
        Job ID: {job._id}
      </div>
    </div>
  );
}

function RecommendJob() {
  const [file, setFile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError("");
      setRecommendations([]);
    } else {
      setError("Please select a valid PDF file.");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setError("");
      setRecommendations([]);
    } else {
      setError("Please drop a valid PDF file.");
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a PDF file to upload.");
      return;
    }

    setLoading(true);
    setError("");
    setRecommendations([]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error fetching recommendations");
      } else {
        // Filter jobs with similarity_score > 4.0
        const filteredJobs = data.filter((job) => job.similarity_score > 4.0);

        if (filteredJobs.length === 0) {
          setError(
            "Oops! Currently, your CV does not match any available jobs. Try updating your resume or check back later."
          );
          setRecommendations([]);
        } else {
          setError("");
          setRecommendations(filteredJobs);
        }
      }
    } catch (err) {
      setError("Something went wrong while processing your resume.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError("");
    setRecommendations([]);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              AI Job Recommender
            </h1>
            <p className="text-lg text-gray-600">
              Upload your resume and get personalized job recommendations
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            {/* File Upload */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Upload Your Resume (PDF)
              </label>

              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  dragActive
                    ? "border-blue-500 bg-blue-50"
                    : file
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {file ? (
                  <div className="space-y-3">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={removeFile}
                      className="text-sm text-red-600 hover:text-red-800 font-medium"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        Drop your PDF here, or click to browse
                      </p>
                      <p className="text-sm text-gray-500">
                        Maximum file size: 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !file}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                loading || !file
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Resume...</span>
                </div>
              ) : (
                <button className="cursor-pointer">
                  Get Job Recommendations
                </button>
              )}
            </button>

            {/* Error / No Match Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-red-800 font-medium">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Top Job Recommendations ({recommendations.length})
                </h3>
              </div>

              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                {recommendations.map((job, i) => (
                  <JobRecommendationCard
                    key={job._id}
                    job={job}
                    rank={i + 1}
                    navigate={navigate}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Powered by ApplyRush • No data stored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendJob;
