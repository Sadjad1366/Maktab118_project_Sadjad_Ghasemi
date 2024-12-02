import Link from "next/link";
import React from "react";
import { FaSort } from "react-icons/fa";

export default function orderPage() {
  return (
    <div className="overflow-x-auto sm:rounded-lg bg-slate-300 lg:w-[800px] p-3">
      <div className="flex justify-between items-center py-3 px-2">
        <h2 className="text-slate-600 font-semibold text-xl">
          مدیریت سفارش ها
        </h2>
        <div className="flex justify-center items-center gap-x-2">
          <label className="text-sm text-slate-600" htmlFor="1">
            همه سفارش ها
          </label>
          <input id="1" className="text-xl" type="radio" name="order" />

          <label className="text-sm text-slate-600" htmlFor="2">
            سفارش های تحویل شده
          </label>
          <input id="2" className="text-xl" type="radio" name="order" />

          <label className="text-sm text-slate-600" htmlFor="3">
            سفارش های در انتظار ارسال
          </label>
          <input id="3" className="text-xl" type="radio" name="order" />
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 border-b-2 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-2 py-3">نام کاربر</th>
            <th scope="col" className="px-2 py-3">
              <div className="flex items-center">مجموع مبلغ</div>
            </th>
            <th scope="col" className="px-2 py-3">
              <div className="flex items-center">
                <FaSort />
                زمان ثبت سفارش
              </div>
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17"
            </th>
            <td className="px-2 py-4">Laptop</td>
            <td className="px-2 py-4">$2999</td>
            <td className="px-1 py-4 text-right">
              <Link
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 underline"
              >
                بررسی سفارش{" "}
              </Link>
            </td>
          </tr>
          {/* Add more rows here */}
        </tbody>
      </table>
    </div>
  );
}
