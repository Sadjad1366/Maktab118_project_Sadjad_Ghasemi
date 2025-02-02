"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { className } from "@/utils/classNames";

// Interface for image data
interface ImageData {
  src: string;
}

// Image data array
const images: ImageData[] = [
  {
    src: "/images/sliding/slidingPhoto1.jpg",
  },
  {
    src: "/images/sliding/slidingPhoto2.jpg",
  },
  {
    src: "/images/sliding/slidingPhoto3.jpg",
  },
];

export default function ImageSlider(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const prevSlide = (): void => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 2500);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isHovered]);

  const handleMouseOver = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative w-full mt-2"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-[460px]">
        <Image
          src={images[currentIndex].src}
          alt={`Slider Image ${currentIndex + 1}`}
          layout="fill"
          objectFit="cover"
          className="rounded-xl transition-all cursor-pointer"
        />
        {/* Previous Button */}
        <button
          className={className("absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70",
            "text-white p-3 rounded-full transition-all duration-300")}
          onClick={prevSlide}
        >
          <ChevronLeft className="text-white" />
        </button>

        {/* Next Button */}
        <button
          className={className("absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70",
            "text-white p-3 rounded-full transition-all duration-300")}
          onClick={nextSlide}
        >
          <ChevronRight className="text-white" />
        </button>
      </div>
      <div className="flex justify-center py-1">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-10 mx-1 ${
              index === currentIndex
                ? "bg-slate-800 rounded-xl"
                : "bg-gray-300 rounded-xl"
            } transition-all duration-500 ease-in-out`}
          ></div>
        ))}
      </div>
    </div>
  );
}
