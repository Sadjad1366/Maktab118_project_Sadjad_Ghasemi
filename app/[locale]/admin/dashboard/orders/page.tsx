// src/pages/admin/OrderPage.tsx
"use client";

import React from "react";
import { useState } from "react";
import { toJalaali } from "jalaali-js";
import { FaSort } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { PiSpinner } from "react-icons/pi";
import { useTranslations } from "next-intl";
import { getAllUsers } from "@/apis/user.service"; // Import the user service
import { IOrderGetAllRes } from "@/types/order.type";
import { getAllOrdersReq } from "@/apis/order.service";
import OrderModal from "@/components/modals/orderModal";

export default function OrderPage() {
  const ordersPerPage = 6;
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [orders, setOrders] = useState<IOrderGetAllRes[]>([]);
  const [orderToShow, setOrderToShow] = React.useState<string>("");
  const [usersMap, setUsersMap] = useState<Record<string, string>>({});
  const [deliveryStatus, setDeliveryStatus] = useState<null | true | false>(
    null
  );
  const [filterStatus, setFilterStatus] = useState<
    "all" | "delivered" | "pending"
  >("all");
  const t = useTranslations("OrdersManagement");

  React.useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const users = await getAllUsers();
        const map: Record<string, string> = {};
        users.forEach((user) => {
          map[user._id] = user.username;
        });
        setUsersMap(map);
      } catch (error) {
        console.error(`${t("errors.fetch_users")}`, error);
      }
    };

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getAllOrdersReq(
          currentPage,
          ordersPerPage,
          deliveryStatus === null ? undefined : deliveryStatus
        );
        setOrders(response.data.orders);
        setTotalPages(response.total_pages || 1);
      } catch (error) {
        console.error(`${t("errors.fetch_users")}`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
    fetchOrders();
  }, [currentPage, deliveryStatus, refreshTrigger]);

  const formattedDate = (date: string): string => {
    const gregorianDate: any = new Date(date);
    const jalaaliDate: any = toJalaali(
      gregorianDate.getFullYear(),
      gregorianDate.getMonth() + 1,
      gregorianDate.getDate()
    );
    return `${jalaaliDate.jy}/${jalaaliDate.jm}/${jalaaliDate.jd}`;
  };

  const openOrderModal = (orderId: string) => {
    setIsModalOpen(true);
    setOrderToShow(orderId);
  };

  const closeOrderModal = () => {
    setIsModalOpen(false);
  };

  // Filter orders based on deliveryStatus
  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "delivered") return order.deliveryStatus === true;
    if (filterStatus === "pending") return order.deliveryStatus === false;
    return true;
  });
  const handleOrderUpdate = () => {
    setRefreshTrigger((prev) => !prev);
  };

  const currentOrders = [...filteredOrders];

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handle filter change
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;

    if (id === "1") {
      setDeliveryStatus(null);
      setFilterStatus("all");
    } else if (id === "2") {
      setDeliveryStatus(true);
      setFilterStatus("delivered");
    } else if (id === "3") {
      setDeliveryStatus(false);
      setFilterStatus("pending");
    }
    setCurrentPage(1);
  };

  if (loading) {
    return <div className="text-center">{t("loading")}</div>;
  }

  return (
    <div className="overflow-x-auto sm:rounded-lg bg-slate-300 lg:w-[800px] p-3">
      <div className="flex justify-between items-center py-3 px-2">
        <h2 className="text-slate-600 font-semibold text-xl">{t("title")} </h2>
        <div className="flex justify-center items-center gap-x-2">
          <label className="text-sm font-semibold text-slate-600" htmlFor="1">
            {t("filters.all")}
          </label>
          <input
            id="1"
            className="text-xl"
            type="radio"
            name="order"
            checked={filterStatus === "all"}
            onChange={handleFilterChange}
          />

          <label className="text-sm font-semibold text-slate-600" htmlFor="2">
            {t("filters.delivered")}
          </label>
          <input
            id="2"
            className="text-xl"
            type="radio"
            name="order"
            checked={filterStatus === "delivered"}
            onChange={handleFilterChange}
          />

          <label className="text-sm font-semibold text-slate-600" htmlFor="3">
            {t("filters.pending")}
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
            <th className="px-2 py-3">{t("table.user")}</th>
            <th scope="col" className="px-2 py-3">
              <div className="flex items-center">{t("table.total_price")}</div>
            </th>
            <th scope="col" className="px-2 py-3">
              <div className="flex items-center">
                <FaSort />
                {t("table.order_date")}
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              {t("table.status")}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr
              key={order._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td
                scope="row"
                className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {usersMap[order.user] || "Unknown User"}
              </td>
              <td className="px-2 py-4">
                {order.totalPrice.toLocaleString()} {t("currency")}
              </td>
              <td className="px-2 py-4">{formattedDate(order.createdAt)}</td>
              <td className="px-1 py-4 text-right flex items-center gap-x-2">
                {order.deliveryStatus ? (
                  <>
                    <FaCheck className="text-green-500" />
                    <button
                      onClick={() => {
                        openOrderModal(order._id);
                      }}
                      className="font-medium text-lg text-green-600 "
                    >
                      {t("buttons.order_details")}
                    </button>
                  </>
                ) : (
                  <>
                    <PiSpinner className="text-red-500" />
                    <button
                      onClick={() => {
                        openOrderModal(order._id);
                      }}
                      className="font-medium text-lg text-red-600 "
                    >
                      {t("buttons.review_order")}
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {currentOrders.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-4">
                {t("table.no_orders")}{" "}
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
          className={`px-4 py-2 bg-gray-500 text-white rounded ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-600"
          }`}
        >
          {t("buttons.previous")}
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 font-semibold">
            {t("buttons.page_info", { currentPage, totalPages })}
          </span>
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-gray-500 text-white rounded ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-600"
          }`}
        >
          {t("buttons.next")}
        </button>
      </div>
      <OrderModal
        isOpen={isModalOpen}
        onClose={closeOrderModal}
        title={t("buttons.review_order")}
        orderId={orderToShow}
        onOrderUpdate={handleOrderUpdate}
      />
    </div>
  );
}
