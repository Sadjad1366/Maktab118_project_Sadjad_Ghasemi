"use client";
import { className } from "@/utils/classNames";
import Image from "next/image";
import Link from "next/link";
import { IoMdCart } from "react-icons/io";
import { GrLogin } from "react-icons/gr";


const Navbar: React.FC = () => {
  return (
    <div className="bg-gray-800 shadow-lg rounded-lg">
      <nav className="flex justify-between items-center container mx-auto py-4 px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-x-20">
          <div className="flex items-center gap-x-3">
            <div className="bg-white rounded-full p-2 shadow-md">
              <p className="text-indigo-600 font-bold text-lg">LOGO</p>
            </div>
            <p className="text-white text-lg font-semibold tracking-wide">
              گالری ساعت نیجا
            </p>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-x-6">
            <Link
              href="/products"
              className="text-white hover:text-indigo-200 transition duration-300"
            >
              صفحه اصلی
            </Link>
            <Link
              href="/products"
              className="text-white hover:text-indigo-200 transition duration-300"
            >
              فروشگاه
            </Link>
            <Link
              href="/aboutus"
              className="text-white hover:text-indigo-200 transition duration-300"
            >
              درباره ما
            </Link>
            <Link
              href="/contactus"
              className="text-white hover:text-indigo-200 transition duration-300"
            >
              تماس با ما
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-x-4">
        <Link
  className="flex items-center justify-center gap-x-2 bg-gray-500 hover:bg-gray-700 text-white rounded-lg px-4 py-[6px] transition duration-300 shadow-md"
  href="/login"
>
  <GrLogin className="text-xl" />
  <span>ورود</span>
</Link>



          <Link
            className="flex items-center gap-x-2 bg-gray-500 hover:bg-gray-700 text-white rounded-lg px-5 py-2 transition duration-300 shadow-md"
            href="/carts"
          >
            <IoMdCart className="text-lg" />
            <span className="text-sm">(0)</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
