"use client";
import React, { useState } from "react";
import { className } from "@/utils/classNames";
import Link from "next/link";
import { IoMdCart } from "react-icons/io";
import { GrLogin } from "react-icons/gr";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-600 shadow-lg rounded-lg">
      <nav className="flex justify-between items-center container mx-auto py-4 px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-x-20">
          <div className="flex items-center gap-x-3">

              <img src="/images/logo/ninja.svg" />

            <p className="hidden sm:block text-slate-100 text-2xl font-semibold tracking-wide">
              گالری ساعت نینجا
            </p>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex gap-x-6">
            <Link
              href="/"
              className="text-slate-100 hover:underline transition duration-300"
            >
              صفحه اصلی
            </Link>
            <Link
              href="/products"
              className="text-slate-100 hover:underline transition duration-300"
            >
              فروشگاه
            </Link>
            <Link
              href="/aboutus"
              className="text-slate-100 hover:underline transition duration-300"
            >
              درباره ما
            </Link>
            <Link
              href="/contactus"
              className="text-slate-100 hover:underline transition duration-300"
            >
              تماس با ما
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-x-4">
          <Link
            className={className(
              "hidden md:flex items-center justify-center",
              "gap-x-2 bg-gray-400 hover:bg-gray-500 text-white",
              "rounded-lg px-4 py-[6px] transition duration-300 shadow-md"
            )}
            href="/auth/login"
          >
            <GrLogin className="text-xl" />
            <p className="pb-2">ورود</p>
          </Link>

          <Link
            className={className(
              "hidden md:flex items-center gap-x-2",
              "bg-gray-400 hover:bg-gray-500 text-white",
              "rounded-lg px-5 py-2 transition duration-300 shadow-md"
            )}
            href="/carts"
          >
            <IoMdCart className="text-lg" />
            <span className="text-md size-7">(0)</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Links */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <nav className="flex flex-col items-center gap-y-4 py-4">
            <Link
              href="/"
              className="text-gray-800 hover:text-indigo-600 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              صفحه اصلی
            </Link>
            <Link
              href="/products"
              className="text-gray-800 hover:text-indigo-600 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              فروشگاه
            </Link>
            <Link
              href="/aboutus"
              className="text-gray-800 hover:text-indigo-600 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              درباره ما
            </Link>
            <Link
              href="/contactus"
              className="text-gray-800 hover:text-indigo-600 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              تماس با ما
            </Link>
          </nav>
          <div className="flex flex-col gap-y-2 p-2">
            <Link
              className={className(
                "flex justify-center items-center",
                "gap-x-2 bg-gray-400 hover:bg-gray-500 text-white",
                "rounded-lg px-4 py-[6px] transition duration-300 shadow-md"
              )}
              href="/auth/login"
            >
              <GrLogin className="text-xl" />
              <p className="pb-2">ورود</p>
            </Link>

            <Link
              className={className(
                "flex justify-center gap-x-2",
                "bg-gray-400 hover:bg-gray-500 text-white",
                "rounded-lg px-5 py-2 transition duration-300 shadow-md"
              )}
              href="/carts"
            >
              <span className="text-md">سبد خرید</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
