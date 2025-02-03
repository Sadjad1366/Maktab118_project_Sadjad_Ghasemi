"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { GrLogin } from "react-icons/gr";
import { IoMdCart } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FcManager } from "react-icons/fc";
import { useRouter } from "@/i18n/routing";
import { FiMenu, FiX } from "react-icons/fi";
import { className } from "@/utils/classNames";
import { fetchCart } from "@/redux/thunks/basketThunks";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import {
  clearCart,
  setGuestCart,
  clearDisabledButtons,
} from "@/redux/slices/basketSlice";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "../localSwitch/LocaleSwitcher";
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const role = Cookies.get("role");
  const token = Cookies.get("accessToken");
  const t = useTranslations("Navbar");

  const toggleMenu = () => setIsOpen(!isOpen);

  React.useEffect(() => {
    const checkRole = () => {
      setIsAdmin(role === "ADMIN");
    };
    checkRole();

    const userId = Cookies.get("userId") || null;
    if (userId !== currentUserId) {
      setCurrentUserId(userId);
      if (userId) {
        dispatch(fetchCart(userId));
      } else {
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        dispatch(setGuestCart(guestCart));
      }
    }
  }, [currentUserId, dispatch, role]);

  const exitHandler = () => {
    Cookies.remove("role");
    Cookies.remove("userId");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    localStorage.removeItem("guestCart");
    dispatch(clearCart());
    dispatch(clearDisabledButtons());
    router.push("/");
  };

  const items = useSelector((state: RootState) => state.basket.items) || [];
  return (
    <div className="w-full bg-gray-600 shadow-lg rounded-lg px-10 relative mb-5">
      <nav className="flex justify-between items-center px-1">
        <>
          <LocaleSwitcher />
        </>
        {/* Logo and Menu */}
        <div className="w-full flex justify-between md:justify-normal items-center px-5">
          <button
            className="xl:hidden text-gray-800 focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <FiX className="text-gray-300" size={48} />
            ) : (
              <FiMenu className="text-gray-300" size={36} />
            )}
          </button>
          <div className="flex items-center gap-x-4">
            <Image
              className="w-24 h-[100px] sm:w-36 sm:h-[120px]"
              src="/images/logo/ninja.svg"
              alt="Logo"
              width={144} // ✅ Define width
              height={120} // ✅ Define height
            />
            <p className="hidden xl:block text-slate-100 text-2xl font-semibold ">
              {t("ninjaGallery")}
            </p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex gap-x-8 px-24">
            <Link href="/" className="text-slate-100 hover:underline text-lg">
              {t("home")}
            </Link>
            <Link
              href="/products"
              className="text-slate-100 hover:underline text-lg"
            >
              {t("products")}
            </Link>
            <Link
              href="/category"
              className="text-slate-100 hover:underline text-lg"
            >
              {t("category")}
            </Link>
            <Link
              href="/aboutus"
              className="text-slate-100 hover:underline text-lg"
            >
              {t("aboutUs")}
            </Link>
            <Link
              href="/contactus"
              className="text-slate-100 hover:underline text-lg"
            >
              {t("contactUs")}
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-x-8 relative">
          {isAdmin && (
            <Link
              href="/admin/dashboard"
              className={className(
                "hidden md:flex items-center gap-x-2 px-1",
                "bg-blue-400 hover:bg-blue-500 text-white",
                "rounded-lg px-4 py-[8px]"
              )}
            >
              <p>{t("management")}</p>
              <FcManager />
            </Link>
          )}
          {!token ? (
            <Link
              href="/auth/login"
              className={className(
                "hidden md:flex items-center gap-x-2",
                "bg-gray-400 hover:bg-gray-500 text-white",
                "rounded-lg px-4 py-[8px]"
              )}
            >
              <GrLogin className="text-xl" />
              <p>{t("login")}</p>
            </Link>
          ) : (
            <button
              onClick={exitHandler}
              className={className(
                "hidden md:flex items-center gap-x-2",
                "bg-red-400 hover:bg-red-500 text-white",
                "rounded-lg px-4 py-[8px]"
              )}
            >
              <GrLogin className="text-xl" />
              <p>{t("logout")}</p>
            </button>
          )}

          {/* Cart Dropdown */}
          <div
            className="relative flex flex-col"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link
              href="/cart"
              className={className(
                "hidden md:flex items-center gap-x-2",
                "bg-gray-400 hover:bg-gray-500 text-white",
                "rounded-lg px-5 py-2 transition duration-300 shadow-md"
              )}
            >
              <div className="relative py-1 px-2">
                <IoMdCart />
                <div className="absolute -top-1 left-6 bg-red-600 flex justify-center items-center rounded-full w-4 h-4 p-1">
                  {Array.isArray(items) ? items.length : 0}
                </div>
              </div>
            </Link>
            {/* Dropdown Content */}
            {isDropdownOpen && (
              <div className="absolute -right-36 top-11 w-72 bg-slate-100 shadow-lg rounded-lg z-30 overflow-hidden">
                {Array.isArray(items) && items.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {items.slice(0, 10).map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between p-2 hover:bg-gray-100"
                      >
                        <div className="flex items-center gap-x-2">
                          <Image
                            src={`backend-6us4acis1-sadjad1366s-projects.vercel.app/images/products/images/${item.image}`}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded"
                            width={40} // ✅ Define width
                            height={40} // ✅ Define height
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-700">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.quantity} {t("pcs")}
                              {(item.quantity * item.price).toLocaleString()}
                              {t("currency")}
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
                        {t("viewCart")}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <p className="text-center py-4 text-gray-500">
                    {t("emptyCart")}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={className(
            "xl:hidden flex flex-col bg-slate-300",
            "text-black gap-2 rounded-md p-2 h-screen absolute top-full left-0 w-full shadow-lg z-20"
          )}
        >
          <Link
            href="/"
            className="bg-slate-100 rounded-xl text-center text-lg p-2 hover:underline"
          >
            {t("home")}
          </Link>
          <Link
            href="/products"
            className="bg-slate-100 rounded-xl text-center text-lg p-2 hover:underline"
          >
            {t("products")}
          </Link>
          <Link
            href="/category"
            className="bg-slate-100 rounded-xl text-center text-lg p-2 hover:underline"
          >
            {t("category")}
          </Link>
          <Link
            href="/aboutus"
            className="bg-slate-100 rounded-xl text-center text-lg p-2 hover:underline"
          >
            {t("aboutUs")}
          </Link>
          <Link
            href="/contactus"
            className="bg-slate-100 rounded-xl text-center text-lg p-2 hover:underline"
          >
            {t("contactUs")}
          </Link>

          <div className="flex flex-col gap-y-3 mt-">
            {!token ? (
              <Link
                className={className(
                  "flex items-center justify-center gap-x-2",
                  "bg-gray-400 hover:bg-gray-500 text-white",
                  "rounded-lg px-4 py-[6px] transition duration-300 shadow-md"
                )}
                href="/auth/login"
              >
                <GrLogin className="text-xl" />
                <p> {t("login")}</p>
              </Link>
            ) : (
              <button
                onClick={exitHandler}
                className={className(
                  "flex items-center justify-center gap-x-2",
                  "bg-gray-400 hover:bg-gray-500 text-white",
                  "rounded-lg px-4 py-[6px] transition duration-300 shadow-md"
                )}
              >
                <GrLogin className="text-xl text-red-500" />
                <p className="text-red-500"> {t("logout")}</p>
              </button>
            )}
            <Link
              className={className(
                "flex items-center justify-center gap-x-2",
                "bg-gray-400 hover:bg-gray-500 text-white",
                "rounded-lg px-5 py-2 transition duration-300 shadow-md"
              )}
              href="/cart"
            >
              <div className="relative flex justify-center items-center">
                <IoMdCart className="text-xl" />
                <div
                  className={className(
                    "absolute flex justify-center items-center",
                    "left-5 -top-1 bg-red-600 rounded-full w-4 h-4"
                  )}
                >
                  {items.length}
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
