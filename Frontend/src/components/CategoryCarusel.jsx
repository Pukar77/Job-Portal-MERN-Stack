import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "./ui/button";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Science",
  "UI/UX Design",
  "AI Engineer",
];

function CategoryCarusel() {
  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4 mt-12">
      
      <Carousel>
        <CarouselContent>
          {category.map((job, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/3 sm:basis-1/2 basis-full flex justify-center"
            >
              <Button className="bg-white text-gray-700 border border-gray-300 font-medium rounded-lg shadow-md px-6 py-3 hover:bg-gray-100 transition duration-300 cursor-pointer">
                {job}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="cursor-pointer" />
        <CarouselNext className="cursor-pointer" />
      </Carousel>
    </div>
  );
}

export default CategoryCarusel;
