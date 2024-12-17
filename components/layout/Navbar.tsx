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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const items = useSelector((state: RootState) => state.basket.items);

  return (
    <div className="w-full bg-gray-600 shadow-lg rounded-lg px-10 relative">
      <nav className="flex justify-between items-center container mx-auto px-6">
        <div className="w-full flex justify-between md:justify-normal items-center gap-x-20">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-800 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FiX className="text-gray-300" size={48} />
            ) : (
              <FiMenu size={36} className="relative text-gray-300" />
            )}
          </button>
          <div className="flex items-center gap-x-3">
            <img
              className="w-24 h-[140px] sm:size-36"
              src="/images/logo/ninja.svg"
              alt="Logo"
            />
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
        <div className="flex items-center gap-x-4 relative">
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

          {/* Cart Dropdown */}
          <div
            className="relative flex flex-col gap-y-2"
            onMouseEnter={() => setIsDropdownOpen(true)} // Open dropdown on hover
            onMouseLeave={() => setIsDropdownOpen(false)} // Close dropdown when leaving the wrapper
          >
            {/* Cart Link */}
            <Link
              href="/cart"
              className={className(
                "hidden md:flex items-center gap-x-2",
                "bg-gray-400 hover:bg-gray-500 text-white",
                "rounded-lg px-5 py-2 transition duration-300 shadow-md"
              )}
            >
              <IoMdCart className="text-lg" />
              <span className="text-md size-7">({items.length})</span>
            </Link>

            {/* Dropdown Content */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-12 w-72 bg-slate-100 shadow-lg rounded-lg z-30 overflow-hidden">
                {items.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">
                    سبد خرید شما خالی است
                  </p>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {items.slice(0, 5).map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between p-2 hover:bg-gray-100"
                      >
                        <div className="flex items-center gap-x-2">
                          <img
                            src={`http://localhost:8000/images/products/images/${item.image}`}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-700">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(item.quantity * item.price).toLocaleString()}{" "}
                              تومان
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                    <li className="text-center bg-gray-100 py-2">
                      <Link
                        href="/cart"
                        className="text-indigo-600 hover:underline text-sm"
                      >
                        مشاهده سبد خرید
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
