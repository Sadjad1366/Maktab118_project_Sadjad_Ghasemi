"use client";

import { editOrderById, getOrderById } from "@/apis/order.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { toJalaali } from "jalaali-js";
import toast from "react-hot-toast";
import { IOrderDisplay } from "@/types/order.type";
import { useTranslations } from "next-intl";

interface IOrderModal {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  orderId: string;
  onOrderUpdate: () => void;
}

const OrderModal: React.FC<IOrderModal> = ({
  isOpen,
  onClose,
  title,
  orderId,
  onOrderUpdate,
}) => {
  // ✅ Fix: Hooks must always be called unconditionally
  const t = useTranslations("OrderModal");

  const mutation = useMutation({
    mutationFn: (deliveryStatus: boolean) => editOrderById(orderId, deliveryStatus),
    onSuccess: () => {
      toast.success(t("messages.sent_successfully"));
      onOrderUpdate();
      onClose();
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: isOpen, // ✅ Prevents running query when modal is closed
  });

  // ✅ Early return only once, after hooks
  if (!isOpen) return null;

  const formattedDate = (date?: string): string => {
    if (!date) return t("messages.invalid_date");
    const gregorianDate = new Date(date);
    if (isNaN(gregorianDate.getTime())) return t("messages.invalid_date");

    const jalaaliDate = toJalaali(
      gregorianDate.getFullYear(),
      gregorianDate.getMonth() + 1,
      gregorianDate.getDate()
    );
    return `${jalaaliDate.jy}/${jalaaliDate.jm}/${jalaaliDate.jd}`;
  };

  const handleEditOrder = () => {
    const newDeliveryStatus = !data?.data?.order?.deliveryStatus;
    mutation.mutate(newDeliveryStatus);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">{t("messages.loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-lg">{t("messages.error")}</p>
      </div>
    );
  }

  const order = data?.data?.order;

  if (!order) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">{t("messages.no_data")}</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl text-center font-semibold text-gray-800 mb-6">
          {title}
        </h2>
        <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm">{t("customer_name")}:</p>
              <p className="text-gray-800 font-medium">
                {order.user.firstname} {order.user.lastname}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">{t("address")}:</p>
              <p className="text-gray-800 font-medium">{order.user.address}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">{t("phone")}:</p>
              <p className="text-gray-800 font-medium">
                {order.user.phoneNumber}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">{t("order_time")}:</p>
              <p className="text-gray-800 font-medium">
                {formattedDate(order.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">{t("delivery_time")}:</p>
              <p className="text-gray-800 font-medium">
                {formattedDate(order.deliveryDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">{t("title")}</h3>
          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-teal-500 text-white">
                <th className="py-3 text-center text-sm">{t("table.product")}</th>
                <th className="py-3 px-4 text-center text-sm">{t("table.price")}</th>
                <th className="py-3 px-4 text-center text-sm">{t("table.quantity")}</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((item: IOrderDisplay, index: number) => (
                <tr
                  key={item._id}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                >
                  <td className="py-3 text-center text-gray-800">{item.product.name}</td>
                  <td className="py-3 text-center text-gray-800">
                    {item.product.price.toLocaleString()} {t("currency")}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-800">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded">
            {t("buttons.close")}
          </button>
          {order.deliveryStatus === false ? (
            <button onClick={handleEditOrder} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded">
              {t("buttons.pending")}
            </button>
          ) : (
            <p className="text-green-500 font-semibold">{t("messages.order_sent")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
