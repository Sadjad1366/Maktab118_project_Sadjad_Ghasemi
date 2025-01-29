"use client";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";

const VideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const t = useTranslations("Video")

  return (
    <>
      <h2 className="text-2xl font-bold text-black my-8 rounded-lg">
{t('video_title')}      </h2>
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
              {t('video_fallback')}               </video>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoSection;
