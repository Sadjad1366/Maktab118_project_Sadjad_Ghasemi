// app/admin/layout.tsx
"use client";

import AdminGuard from "@/components/AdminGaurd";
import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaCogs,
  FaShoppingCart,
  FaChartBar,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaBars,
} from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { className } from "@/utils/classNames";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations("DashboardLayout");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleReports = () => {
    setIsReportsOpen(!isReportsOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
  const logOut = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("role");
    Cookies.remove("_id");
    Cookies.remove("userId");
    router.push("/admin");
  };

  return (
    <AdminGuard>
      <div className="flex h-screen bg-bretling-pattern">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "w-48 xl:w-64" : "w-16"
          } bg-slate-600 text-white flex flex-col transition-width duration-300 opacity-90`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            {isSidebarOpen && (
              <h1 className="text-2xl font-bold">{t("title")}</h1>
            )}
            <button onClick={toggleSidebar} className="focus:outline-none">
              <FaBars />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="px-2">
              {/* Dashboard Link */}
              <li className="my-2 py-2 hover:bg-gray-200 hover:text-gray-800 transition-colors focus:outline-none">
                <Link href="/">
                  <div className="flex items-center px-2">
                    <IoHome className="text-lg" />
                    {isSidebarOpen && <span className="mr-3 px-2">{t("home")}</span>}
                  </div>
                </Link>
              </li>
              <li className="my-2 py-2 hover:bg-gray-200 hover:text-gray-800 transition-colors focus:outline-none">
                <Link href="/admin/dashboard">
                  <div className="flex items-center px-2">
                    <FaTachometerAlt className="text-lg" />
                    {isSidebarOpen && (
                      <span className="mr-3 px-2">{t("dashboard")}</span>
                    )}
                  </div>
                </Link>
              </li>

              {/* Products Link */}
              <li className="my-2 py-2 hover:bg-gray-200 hover:text-gray-800 transition-colors focus:outline-none">
                <Link href="/admin/dashboard/products">
                  <div className="flex items-center px-2">
                    <FaBoxOpen className="text-lg" />
                    {isSidebarOpen && (
                      <span className="mr-3 px-2">{t("products")}</span>
                    )}
                  </div>
                </Link>
              </li>

              {/* Orders Link */}
              <li className="my-2 py-2 hover:bg-gray-200 hover:text-gray-800 transition-colors focus:outline-none">
                <Link href="/admin/dashboard/orders">
                  <div className="flex items-center px-2">
                    <FaShoppingCart className="text-lg" />
                    {isSidebarOpen && (
                      <span className="mr-3 px-2">{t("orders")}</span>
                    )}
                  </div>
                </Link>
              </li>

              {/* Users Link */}
              <li className="my-2 py-2 hover:bg-gray-200 hover:text-gray-800 transition-colors focus:outline-none">
                <Link href="/admin/dashboard/entity">
                  <div className="flex items-center px-2">
                    <FaBoxOpen className="text-lg" />
                    {isSidebarOpen && (
                      <span className="mr-3 px-2">{t("entity")}</span>
                    )}
                  </div>
                </Link>
              </li>

              {/* Reports with Submenu */}
              <li className="my-2">
                <button
                  onClick={toggleReports}
                  className="w-full flex items-center p-2 rounded hover:bg-gray-200 hover:text-gray-800 transition-colors focus:outline-none"
                >
                  <FaChartBar className="text-lg" />
                  {isSidebarOpen && (
                    <span className="mr-3 px-2">{t("reports.title")}</span>
                  )}
                  {isSidebarOpen &&
                    (isReportsOpen ? (
                      <FaChevronUp className="ml-auto" />
                    ) : (
                      <FaChevronDown className="ml-auto" />
                    ))}
                </button>
                {isReportsOpen && isSidebarOpen && (
                  <ul className="ml-6 mt-2">
                    <li className="my-1">
                      <Link
                        className="px-2"
                        href="/admin/dashboard/reports/sales"
                      >
                        {t("reports.sales")}
                      </Link>
                    </li>
                    <li className="my-1">
                      <Link
                        className="px-2"
                        href="/admin/dashboard/reports/users"
                      >
                        {t("reports.users")}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Settings with Submenu */}
              <li className="my-2">
                <button
                  onClick={toggleSettings}
                  className={className(
                    "w-full flex items-center p-2 rounded hover:bg-gray-200",
                    "hover:text-gray-800 transition-colors focus:outline-none"
                  )}
                >
                  <FaCogs className="text-lg" />
                  {isSidebarOpen && <span className="mr-3 px-2">{t('setting.title')}</span>}
                  {isSidebarOpen &&
                    (isSettingsOpen ? (
                      <FaChevronUp className="ml-auto" />
                    ) : (
                      <FaChevronDown className="ml-auto" />
                    ))}
                </button>
                {isSettingsOpen && isSidebarOpen && (
                  <ul className="ml-6 mt-2">
                    <li className="my-1">
                      <Link
                        className="px-2"
                        href="/admin/dashboard/settings/profile"
                      >
                        {t('setting.profile')}
                      </Link>
                    </li>
                    <li className="my-1">
                      <Link
                        className="px-2"
                        href="/admin/dashboard/settings/security"
                      >
                        {t('setting.security')}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>

          {/* Profile & Logout */}
          <div className="p-4 border-t border-gray-300">
            <div className="flex items-center mb-4">
              {isSidebarOpen && (
                <div>
                  <p className="text-lg font-medium">{t('manager')}</p>
                  <p className="text-lg text-gray-300">admin@example.com</p>
                </div>
              )}
            </div>
            {/* <Link href="/logout"> */}
            <div
              onClick={logOut}
              className="flex items-center gap-x-2 hover:cursor-pointer"
            >
              <FaSignOutAlt className="text-lg" />
              {isSidebarOpen && <span className="ml-3">{t('logout')}</span>}
            </div>
            {/* </Link> */}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-center items-center">{children}</div>
        </div>
      </div>
    </AdminGuard>
  );
}
