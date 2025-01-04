import Link from "next/link";
import { PiCloudCheckLight } from "react-icons/pi";

export default function SuccessPage() {
  return (
    <div className="relative w-full bg-success-pattern h-screen flex justify-center items-center ">
      <div className="absolute w-full max-w-md mt-7 opacity-95">
        <div
          className="bg-white rounded-lg shadow-lg text-center overflow-hidden animate-fade-in-up"
          style={{
            animation: "fade-in-up 0.5s ease-out",
          }}
        >
          {/* Header */}
          <div className="bg-green-500 text-white py-6 relative">
            <div
              className="flex justify-center mb-2 animate-bounce"
              style={{
                animation: "bounce 1.5s infinite",
              }}
            >
              <PiCloudCheckLight className="w-14 h-14" />
            </div>
            <h2 className="text-2xl font-semibold">نتیجه پرداخت </h2>
          </div>

          {/* Body */}
          <div className="p-6 text-gray-700 text-lg">
            مشتری گرامی، سفارشتان ثبت گردید. برای همانگی زمان ارسال با شما تماس
            گرفته خواهد شد
          </div>

          {/* Footer */}
          <div className="bg-gray-100 p-4 w-full">
            <Link href="/" className="w-full py-2 px-8 bg-green-500 text-white rounded-lg hover:bg-green-600 transform hover:scale-105 transition duration-300">
            صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
