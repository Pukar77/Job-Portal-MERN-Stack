import React from "react";
import Navbar from "./shared-component/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarusel from "./CategoryCarusel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";

function Home() {
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
