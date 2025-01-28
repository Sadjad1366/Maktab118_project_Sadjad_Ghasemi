"use client";

import { editOrderById, getOrderById } from "@/apis/order.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { toJalaali } from "jalaali-js";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { IOrderDisplay } from "@/types/order.type";

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
  if (!isOpen) return null;

  const { data, isLoading, error } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
  });

  const formattedDate = (date: string | undefined): string => {
    if (!date) return "تاریخ نامعتبر";
    const gregorianDate = new Date(date);
    if (isNaN(gregorianDate.getTime())) return "تاریخ نامعتبر";

    const jalaaliDate = toJalaali(
      gregorianDate.getFullYear(),
      gregorianDate.getMonth() + 1,
      gregorianDate.getDate()
    );
    return `${jalaaliDate.jy}/${jalaaliDate.jm}/${jalaaliDate.jd}`;
  };

  const mutation = useMutation({
    mutationFn: (deliveryStatus: boolean) =>
      editOrderById(orderId, deliveryStatus),
    onSuccess: () => {
      toast.success("سفارش با موفقیت ارسال شد✨");
      onOrderUpdate();
      onClose();
      // redirect("/admin/dashboard/orders");
    },
  });

  const handelEditOrder = () => {
    const newDeliveryStatus = !data?.data?.order?.deliveryStatus;
    mutation.mutate(newDeliveryStatus);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">در حال بارگذاری...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-lg">خطا در دریافت اطلاعات سفارش</p>
      </div>
    );
  }

  const order = data?.data?.order;

  if (!order) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">داده‌ای برای سفارش موجود نیست</p>
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
              <p className="text-gray-600 text-sm">نام مشتری:</p>
              <p className="text-gray-800 font-medium">
                {order.user.firstname} {order.user.lastname}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">آدرس:</p>
              <p className="text-gray-800 font-medium">{order.user.address}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">تلفن:</p>
              <p className="text-gray-800 font-medium">{order.user.phoneNumber}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">زمان سفارش:</p>
              <p className="text-gray-800 font-medium">
                {formattedDate(order.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">زمان تحویل:</p>
              <p className="text-gray-800 font-medium">
                {formattedDate(order.deliveryDate)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            جزئیات سفارش
          </h3>
          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-teal-500 text-white">
                <th className="py-3 px-4 text-right text-sm">کالا</th>
                <th className="py-3 px-4 text-center text-sm">قیمت</th>
                <th className="py-3 px-4 text-center text-sm">تعداد</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((item: IOrderDisplay, index:any) => (
                <tr
                  key={item._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="py-3 px-4 text-gray-800">{item.product.name}</td>
                  <td className="py-3 px-4 text-center text-gray-800">
                    {item.product.price.toLocaleString()} تومان
                  </td>
                  <td className="py-3 px-4 text-center text-gray-800">
                    {item.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
          >
            بستن
          </button>
          {order.deliveryStatus === false ? (
            <button
              onClick={handelEditOrder}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              در انتظار ارسال
            </button>
          ) : (
            <p className="text-green-500 font-semibold">سفارش ارسال شده است.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
