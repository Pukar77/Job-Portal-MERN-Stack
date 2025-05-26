import React from "react";
import Navbar from "./shared-component/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarusel from "./CategoryCarusel";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="mt-3">
        <HeroSection />
        <CategoryCarusel />
      </div>
    </div>
  );
}

export default Home;
