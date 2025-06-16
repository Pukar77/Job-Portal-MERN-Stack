import React, { useEffect } from "react";
import Navbar from "./shared-component/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarusel from "./CategoryCarusel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  useGetAllJobs();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div className="mt-3">
        <HeroSection />
        <CategoryCarusel />
        <LatestJobs />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
