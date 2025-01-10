"use client";
import Link from "next/link";
import { VscError } from "react-icons/vsc";

export default function FailPayment() {
  return (
    <div className="relative w-full bg-fail-pattern h-screen flex justify-center items-center ">
      <div className="absolute w-full max-w-md mt-7 opacity-95">
        <div
          className="bg-white rounded-lg shadow-lg text-center overflow-hidden animate-fade-in-up"
          style={{
            animation: "fade-in-up 0.5s ease-out",
          }}
        >
          {/* Header */}
          <div className="bg-red-500 text-white py-6 relative">
            <div
              className="flex justify-center mb-2 animate-bounce"
              style={{
                animation: "bounce 1.5s infinite",
              }}
            >
              <VscError className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-semibold">نتیجه پرداخت</h2>
          </div>

          {/* Body */}
          <div className="p-6 text-gray-700 text-lg">شما از پرداخت انصراف دادید.</div>

          {/* Footer */}
          <div className="bg-gray-100 p-4">
            <Link
              href="/"
              className="w-full py-2 px-8 bg-red-500 text-white rounded-lg hover:bg-red-600 transform hover:scale-105 transition duration-300"
            >
              صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
