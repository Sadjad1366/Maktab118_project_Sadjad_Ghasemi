// app/admin/dashboard/page.tsx
"use client";

import React from "react";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
  FaChartLine,
  FaClock,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";
import { className } from "@/utils/classNames";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

// Define TypeScript interfaces for your data
interface IStatistics {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  pendingOrders: number;
}

interface ISalesData {
  labels: string[];
  data: number[];
}

const DashboardPage: React.FC = () => {
  // Fake Statistics Data
  const statistics: IStatistics = {
    totalOrders: 1200,
    totalRevenue: 850000000, // in your currency
    totalUsers: 450,
    pendingOrders: 75,
  };

  // Fake Sales Data for the Chart
  const salesData: ISalesData = {
    labels: [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ],
    data: [
      70000000, 80000000, 75000000, 90000000, 85000000, 95000000, 100000000,
      105000000, 98000000, 110000000, 115000000, 120000000,
    ],
  };

  // Fake Dollar Price
  const dollarPrice: number = 42000; // Example: 42,000 تومان

  // Fake Recent Orders Data
  const recentOrders = [
    {
      orderId: "#ORD1001",
      user: "کاربر 1",
      status: "تحویل شده",
      date: "1402/09/15",
      amount: "۵۰۰۰۰۰ تومان",
    },
    {
      orderId: "#ORD1002",
      user: "کاربر 2",
      status: "در انتظار",
      date: "1402/09/16",
      amount: "۷۰۰۰۰۰ تومان",
    },
    {
      orderId: "#ORD1003",
      user: "کاربر 3",
      status: "تحویل شده",
      date: "1402/09/17",
      amount: "۶۰۰۰۰۰ تومان",
    },
    {
      orderId: "#ORD1004",
      user: "کاربر 4",
      status: "لغو شده",
      date: "1402/09/18",
      amount: "۰ تومان",
    },
    {
      orderId: "#ORD1005",
      user: "کاربر 5",
      status: "در انتظار",
      date: "1402/09/19",
      amount: "۸۰۰۰۰۰ تومان",
    },
  ];

  // Fake User Activity Log Data
  const userActivities = [
    {
      user: "کاربر 1",
      activity: "ثبت سفارش جدید #ORD1001",
      time: "۱۴۰۲/۰۹/۱۵ ۱۰:۳۰ صبح",
      avatar: "/profile-placeholder.png",
    },
    {
      user: "کاربر 2",
      activity: "آپدیت پروفایل",
      time: "۱۴۰۲/۰۹/۱۵ ۱۱:۰۰ صبح",
      avatar: "/profile-placeholder.png",
    },
    {
      user: "کاربر 3",
      activity: "لغو سفارش #ORD1004",
      time: "۱۴۰۲/۰۹/۱۵ ۱:۱۵ بعدازظهر",
      avatar: "/profile-placeholder.png",
    },
    {
      user: "کاربر 4",
      activity: "ثبت سفارش جدید #ORD1005",
      time: "۱۴۰۲/۰۹/۱۵ ۲:۰۰ بعدازظهر",
      avatar: "/profile-placeholder.png",
    },
    {
      user: "کاربر 5",
      activity: "تغییر رمز عبور",
      time: "۱۴۰۲/۰۹/۱۵ ۳:۳۰ بعدازظهر",
      avatar: "/profile-placeholder.png",
    },
  ];

  return (
    <div className="w-full p-6">
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Orders */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center">
          <FaShoppingCart className="text-blue-500 text-4xl mr-4" />
          <div>
            <p className="text-gray-500">تعداد سفارشات</p>
            <p className="text-2xl font-bold">{statistics.totalOrders}</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center">
          <FaDollarSign className="text-green-500 text-4xl mr-4" />
          <div>
            <p className="text-gray-500">کل درآمد</p>
            <p className="text-2xl font-bold">
              {statistics.totalRevenue.toLocaleString()} تومان
            </p>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center">
          <FaUsers className="text-purple-500 text-4xl mr-4" />
          <div>
            <p className="text-gray-500">تعداد کاربران</p>
            <p className="text-2xl font-bold">{statistics.totalUsers}</p>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center">
          <FaBoxOpen className="text-yellow-500 text-4xl mr-4" />
          <div>
            <p className="text-gray-500">سفارشات در انتظار</p>
            <p className="text-2xl font-bold">{statistics.pendingOrders}</p>
          </div>
        </div>
      </div>

      {/* Charts and Dollar Price */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaChartLine className="mr-2" /> نمودار فروش ماهانه
          </h2>
          <Line
            data={{
              labels: salesData.labels,
              datasets: [
                {
                  label: "فروش (تومان)",
                  data: salesData.data,
                  fill: true,
                  backgroundColor: "rgba(59, 130, 246, 0.2)",
                  borderColor: "#3b82f6",
                  tension: 0.4,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top" as const,
                },
                title: {
                  display: false,
                  text: "Monthly Sales",
                },
              },
            }}
          />
        </div>

        {/* Dollar Price */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaDollarSign className="mr-2" /> قیمت دلار
            </h2>
            <p className="text-4xl font-bold text-green-500">
              {dollarPrice.toLocaleString()} تومان
            </p>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 text-sm">
              آخرین به‌روزرسانی: {new Date().toLocaleString("fa-IR")}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaShoppingCart className="mr-2" /> سفارشات اخیر
        </h2>
        <table className="min-w-full divide-y divide-white">
          <thead className="bg-gray-100">
            <tr>
              <th
                className={className(
                  "px-6 py-3 text-right text-xs",
                  "font-medium text-gray-500 uppercase tracking-wider"
                )}
              >
                سفارش شماره
              </th>
              <th
                className={className(
                  "px-6 py-3 text-right text-xs",
                  "font-medium text-gray-500 uppercase tracking-wider"
                )}
              >
                کاربر
              </th>
              <th
                className={className(
                  "px-6 py-3 text-right text-xs",
                  "font-medium text-gray-500 uppercase tracking-wider"
                )}
              >
                وضعیت
              </th>
              <th
                className={className(
                  "px-6 py-3 text-right text-xs",
                  "font-medium text-gray-500 uppercase tracking-wider"
                )}
              >
                تاریخ
              </th>
              <th
                className={className(
                  "px-6 py-3 text-right text-xs",
                  "font-medium text-gray-500 uppercase tracking-wider"
                )}
              >
                مبلغ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-white">
            {recentOrders.map((order, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.orderId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.user}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === "تحویل شده"
                        ? "bg-green-100 text-green-800"
                        : order.status === "در انتظار"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                  {order.amount}
                </td>
              </tr>
            ))}
            {/* If no orders */}
             {recentOrders.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                >
                  هیچ سفارشی وجود ندارد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* User Activity Log */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaClock className="mr-2" /> فعالیت‌های اخیر کاربران
        </h2>
        <ul className="space-y-4">
          {userActivities.map((activity, index) => (
            <li key={index} className="flex items-center">
              <img
                src={activity.avatar}
                alt={`${activity.user} avatar`}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {activity.user}
                </p>
                <p className="text-sm text-gray-500">{activity.activity}</p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </li>
          ))}
          {/* If no activities */}
          {userActivities.length === 0 && (
            <li className="text-sm text-gray-500 text-center">
              هیچ فعالیتی ثبت نشده است.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
