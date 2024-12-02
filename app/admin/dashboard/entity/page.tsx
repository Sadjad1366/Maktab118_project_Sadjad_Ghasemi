import Link from "next/link";
import React from "react";

export default function entityPage() {
  return (
    <div className="overflow-x-auto sm:rounded-lg bg-slate-300 lg:w-[800px] p-3">
      <div className="flex justify-between py-3 px-2">
        <h2 className="text-slate-600 font-semibold text-xl">مدیریت موجودی و قیمت</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          ذخیره
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 bg-gray-200 border-y-2 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-2 py-3">
              نام محصول
            </th>
            <th scope="col" className="px-2 py-3">
              <div className="flex items-center">
                قیمت
              </div>
            </th>
            <th scope="col" className="px-2 py-3">
              <div className="flex items-center">
                موجودی
              </div>
            </th>
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
          </tr>
          {/* Add more rows here */}
        </tbody>
      </table>
    </div>
  );
}
