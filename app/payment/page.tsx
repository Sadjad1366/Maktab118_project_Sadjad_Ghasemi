"use client";

import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { createOrderReq } from "@/apis/order.service";
import React from "react";
import { clearCart } from "@/redux/slices/basketSlice";
import { clearCartApi } from "@/redux/thunks/basketThunks";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { IOrderCreateReq } from "@/types/order.type";

export default function PaymentPage() {
  const dispatch = useAppDispatch(); // انتقال useDispatch به سطح کامپوننت
  const { items } = useSelector((state: RootState) => state.basket);

  const router = useRouter();
  const userId = Cookies.get("userId");
const deliveryDate = Cookies.get("deliveryDate")

console.log("deliver",deliveryDate);

  const paymentHandler = async () => {
    const products = items.map((item) => ({
      product: item.id,
      count: item.quantity,
    }));

    if (products.length === 0) {
      throw new Error("سبد خرید خالی است");
    }

    const orderRequest: IOrderCreateReq = {
      user: userId || "",
      products,
      deliveryStatus: false,
      deliveryDate:deliveryDate || "",
    };

    try {
      // ارسال سفارش
      const response = await createOrderReq(orderRequest);

      const userId = Cookies.get("userId"); // دریافت userId از کوکی‌ها
console.log("user:",userId)
            await dispatch(clearCartApi(userId || ""));

      // خالی کردن سبد خرید در Redux
      dispatch(clearCart());

      // هدایت به صفحه موفقیت
      router.push("/payment/success");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };



  const rejectHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/payment/fail");
  };

  return (
    <div className="relative min-h-screen bg-paymnet-pattern flex items-center justify-center">
      <div className="absolute bg-slate-900 opacity-80 shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-100 text-center mb-6">
          پرداخت آنلاین
        </h2>
        {/* form */}
        <div className="space-y-5">
          {/* شماره کارت */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              شماره کارت
            </label>
            <input
              type="text"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              maxLength={19}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* نام صاحب کارت */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نام صاحب کارت
            </label>
            <input
              type="text"
              placeholder="نام و نام خانوادگی"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* تاریخ انقضا */}
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ماه انقضا
              </label>
              <input
                type="text"
                placeholder="MM"
                maxLength={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                سال انقضا
              </label>
              <input
                type="text"
                placeholder="YY"
                maxLength={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* CVV2 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV2
            </label>
            <input
              type="text"
              placeholder="XXX"
              maxLength={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* دکمه پرداخت */}
          <div className="flex justify-between gap-x-4">
            <button
              onClick={paymentHandler}
              className="w-[60%] text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              پرداخت
            </button>
            <button
              className="w-[40%] text-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
              onClick={rejectHandler}
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
