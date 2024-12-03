// app/admin/layout.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { FaTachometerAlt, FaBoxOpen, FaCogs, FaShoppingCart, FaUsers, FaChartBar, FaSignOutAlt, FaChevronDown, FaChevronUp, FaBars } from "react-icons/fa";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleReports = () => {
    setIsReportsOpen(!isReportsOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-blue-800 text-white flex flex-col transition-width duration-300`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {isSidebarOpen && <h1 className="text-2xl font-bold">مدیریت</h1>}
          <button onClick={toggleSidebar} className="focus:outline-none">
            <FaBars />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="px-2">
            {/* Dashboard Link */}
            <li className="my-2">
              <Link href="/admin/dashboard">
              <Link href="#" className="flex items-center p-2 rounded hover:bg-blue-700 transition-colors">
                  <FaTachometerAlt className="text-lg" />
                  {isSidebarOpen && <span className="mr-3">پنل مدیریت</span>}
                </Link>
              </Link>
            </li>

            {/* Products Link */}
            <li className="my-2">
              <Link href="/admin/dashboard/products">
              <Link href="#" className="flex items-center p-2 rounded hover:bg-blue-700 transition-colors">
                  <FaBoxOpen className="text-lg" />
                  {isSidebarOpen && <span className="mr-3">کالاها</span>}
                </Link>
              </Link>
            </li>

            {/* Orders Link */}
            <li className="my-2">
              <Link href="/admin/dashboard/orders">
              <Link href="#" className="flex items-center p-2 rounded hover:bg-blue-700 transition-colors">
                  <FaShoppingCart className="text-lg" />
                  {isSidebarOpen && <span className="mr-3">سفارشات</span>}
                </Link>
              </Link>
            </li>

            {/* Users Link */}
            <li className="my-2">
              <Link href="/admin/dashboard/users">
              <Link href="#" className="flex items-center p-2 rounded hover:bg-blue-700 transition-colors">
                  <FaUsers className="text-lg" />
                  {isSidebarOpen && <span className="mr-3">کاربران</span>}
                </Link>
              </Link>
            </li>

            {/* Reports with Submenu */}
            <li className="my-2">
              <button
                onClick={toggleReports}
                className="w-full flex items-center p-2 rounded hover:bg-blue-700 transition-colors focus:outline-none"
              >
                <FaChartBar className="text-lg" />
                {isSidebarOpen && <span className="mr-3">گزارشات</span>}
                {isSidebarOpen && (isReportsOpen ? <FaChevronUp className="ml-auto" /> : <FaChevronDown className="ml-auto" />)}
              </button>
              {isReportsOpen && isSidebarOpen && (
                <ul className="ml-6 mt-2">
                  <li className="my-1">
                    <Link href="/admin/dashboard/reports/sales">
                      <Link href="#" className="flex items-center p-2 rounded hover:bg-blue-600 transition-colors">
                        فروش
                      </Link>
                    </Link>
                  </li>
                  <li className="my-1">
                    <Link href="/admin/dashboard/reports/users">
                      <Link href="#" className="flex items-center p-2 rounded hover:bg-blue-600 transition-colors">
                        کاربران
                      </Link>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Settings with Submenu */}
            <li className="my-2">
              <button
                onClick={toggleSettings}
                className="w-full flex items-center p-2 rounded hover:bg-blue-700 transition-colors focus:outline-none"
              >
                <FaCogs className="text-lg" />
                {isSidebarOpen && <span className="mr-3">تنظیمات</span>}
                {isSidebarOpen && (isSettingsOpen ? <FaChevronUp className="ml-auto" /> : <FaChevronDown className="ml-auto" />)}
              </button>
              {isSettingsOpen && isSidebarOpen && (
                <ul className="ml-6 mt-2">
                  <li className="my-1">
                    <Link href="/admin/dashboard/settings/profile">
                      <Link href="#" className="flex items-center p-2 rounded hover:bg-blue-600 transition-colors">
                        پروفایل
                      </Link>
                    </Link>
                  </li>
                  <li className="my-1">
                    <Link href="/admin/dashboard/settings/security">
                      <Link href="#" className="flex items-center p-2 rounded hover:bg-blue-600 transition-colors">
                        امنیت
                      </Link>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Profile & Logout */}
        <div className="p-4 border-t border-blue-700">
          <div className="flex items-center mb-4">
            <img
              src="/profile-placeholder.png" // Replace with actual profile image
              alt="Profile"
              className="w-10 h-10 rounded-full mr-3"
            />
            {isSidebarOpen && (
              <div>
                <p className="text-sm font-medium">مدیر</p>
                <p className="text-xs text-gray-300">admin@example.com</p>
              </div>
            )}
          </div>
          <Link href="/logout">
            <Link href="#" className="flex items-center p-2 rounded hover:bg-blue-700 transition-colors">
              <FaSignOutAlt className="text-lg" />
              {isSidebarOpen && <span className="ml-3">خروج</span>}
            </Link>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Optional: Header for Mobile View */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <button onClick={toggleSidebar} className="text-2xl text-blue-800 focus:outline-none">
            <FaBars />
          </button>
          <h1 className="text-xl font-bold">مدیریت</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
