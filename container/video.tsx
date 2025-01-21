"use client";
import React, { useRef } from "react";

const VideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => {
    videoRef.current?.play();
  };

  const handlePause = () => {
    videoRef.current?.pause();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-black my-8 rounded-lg">
        ویدیوی معرفی فروشگاه
      </h2>
      <div className="bg-slate-200 py-10 rounded-lg">
        <div className="container mx-auto px-10">
          <div className="relative flex justify-center">
            {/* Video Element */}
            {/* <video autoplay muted> */}
            <video
              autoPlay
              ref={videoRef}
              className="rounded-lg shadow-lg max-w-full w-full h-[700px] lg:w-3/4"
              controls
              poster="/images/brandstory/design.webp"
            >
              <source src="/videos/sajad.mp4" type="video/mp4" />
              مرورگر شما از پخش این ویدیو پشتیبانی نمی‌کند.
            </video>
          </div>

          {/* Play/Pause Buttons */}
          {/* <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handlePlay}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              پخش ویدیو
            </button>
            <button
              onClick={handlePause}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              توقف ویدیو
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
