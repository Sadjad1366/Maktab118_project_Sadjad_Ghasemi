"use client"
import { useState, useEffect } from "react";
import { getAllOrdersReq } from "@/apis/order.service";
import Link from "next/link";
import React from "react";
import { FaSort } from "react-icons/fa";

export default  function OrderPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<"all" | "delivered" | "pending">("all");
  const [loading, setLoading] = useState(true);
  const ordersPerPage = 6;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrdersReq();
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on deliveryStatus
  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "delivered") return order.deliveryStatus === true;
    if (filterStatus === "pending") return order.deliveryStatus === false;
    return true;
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Get current page orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handle filter change
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    if (id === "1") setFilterStatus("all");
    else if (id === "2") setFilterStatus("delivered");
    else if (id === "3") setFilterStatus("pending");
    setCurrentPage(1); // Reset to first page on filter change
  };

  if (loading) {
    return <div className="text-center">در حال بارگذاری...</div>;
  }

  return (
    <div className="overflow-x-auto sm:rounded-lg bg-slate-300 lg:w-[800px] p-3">
      <div className="flex justify-between items-center py-3 px-2">
        <h2 className="text-slate-600 font-semibold text-xl">مدیریت سفارش ها</h2>
        <div className="flex justify-center items-center gap-x-2">
          <label className="text-sm text-slate-600" htmlFor="1">
            همه سفارش ها
          </label>
          <input
            id="1"
            className="text-xl"
            type="radio"
            name="order"
            checked={filterStatus === "all"}
            onChange={handleFilterChange}
          />

          <label className="text-sm text-slate-600" htmlFor="2">
            سفارش های تحویل شده
          </label>
          <input
            id="2"
            className="text-xl"
            type="radio"
            name="order"
            checked={filterStatus === "delivered"}
            onChange={handleFilterChange}
          />

          <label className="text-sm text-slate-600" htmlFor="3">
            سفارش های در انتظار ارسال
          </label>
          <input
            id="3"
            className="text-xl"
            type="radio"
            name="order"
            checked={filterStatus === "pending"}
            onChange={handleFilterChange}
          />
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
          {currentOrders.map((order) => (
            <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td
                scope="row"
                className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                admin
              </td>
              <td className="px-2 py-4">{order.totalPrice.toLocaleString()} تومان</td>
              <td className="px-2 py-4">{new Date(order.createdAt).toLocaleString()}</td>
              <td className="px-1 py-4 text-right">
                <Link
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 underline"
                >
                  بررسی سفارش
                </Link>
              </td>
            </tr>
          ))}
          {currentOrders.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-4">
                هیچ سفارشی وجود ندارد.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center py-3">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          قبلی
        </button>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 mx-2 py-1 rounded ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
