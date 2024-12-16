"use client";
import React, { useState } from "react";
import { className } from "@/utils/classNames";
import Link from "next/link";
import { IoMdCart } from "react-icons/io";
import { GrLogin } from "react-icons/gr";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const items = useSelector((state: RootState) => state.basket.items);

  return (
    <div className="w-full bg-gray-600 shadow-lg rounded-lg px-10">
      <nav className="flex justify-between items-center container mx-auto px-6">
        <div className="w-full flex justify-between md:justify-normal items-center gap-x-20">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-800 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX className="text-gray-300" size={48} /> : <FiMenu size={36} className="relative text-gray-300"/>}
          </button>
          <div className="flex items-center gap-x-3">

              <img className="w-24 h-[140px] sm:size-36" src="/images/logo/ninja.svg" />

            <p className="hidden xl:block text-slate-100 text-2xl font-semibold tracking-wide">
              گالری ساعت نینجا
            </p>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex gap-x-6">
            <Link
              href="/"
              className="text-slate-100 hover:underline transition duration-300 text-lg"
            >
              صفحه اصلی
            </Link>
            <Link
              href="/products"
              className="text-slate-100 hover:underline transition duration-300 text-lg"
            >
              فروشگاه
            </Link>
            <Link
              href="/category"
              className="text-slate-100 hover:underline transition duration-300 text-lg"
            >
              دسته بندی
            </Link>
            <Link
              href="/gallery"
              className="text-slate-100 hover:underline transition duration-300 text-lg"
            >
              گالری
            </Link>
            <Link
              href="/aboutus"
              className="text-slate-100 hover:underline transition duration-300 text-lg"
            >
              درباره ما
            </Link>
            <Link
              href="/contactus"
              className="text-slate-100 hover:underline transition duration-300 text-lg"
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
            href="/cart"
          >
            <IoMdCart className="text-lg" />
            <span className="text-md size-7">({items.length})</span>
          </Link>


        </div>
      </nav>

      {/* Mobile Navigation Links */}
      {isOpen && (
        <div className="lg:hidden  bg-white shadow-lg h-screen rounded-b-lg fixed z-20 left-0 right-1">
          <nav className="flex flex-col items-center gap-y-4 py-4">
            <Link
              href="/"
              className="text-gray-800 md:text-3xl hover:text-indigo-600 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              صفحه اصلی
            </Link>
            <Link
              href="/products"
              className="text-gray-800 md:text-3xl hover:text-indigo-600 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              فروشگاه
            </Link>
            <Link
              href="/category"
              className="text-gray-800 md:text-3xl hover:text-indigo-600 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              دسته بندی
            </Link>
            <Link
              href="/aboutus"
              className="text-gray-800 md:text-3xl hover:text-indigo-600 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              درباره ما
            </Link>
            <Link
              href="/contactus"
              className="text-gray-800 md:text-3xl hover:text-indigo-600 transition duration-300"
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
              <p className="pb-2 md:text-3xl">ورود</p>
            </Link>

            <Link
              className={className(
                "flex justify-center items-center gap-x-2",
                "bg-gray-400 hover:bg-gray-500 text-white",
                "rounded-lg px-2 py-2 transition duration-300 shadow-md"
              )}
              href="/cart"
            >
              <span className="text-md md:text-3xl">سبد خرید</span>
              {/* <span className="text-xl">({items.length})</span> */}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
