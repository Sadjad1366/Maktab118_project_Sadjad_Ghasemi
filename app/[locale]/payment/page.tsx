"use client";

import React from "react";
import Cookies from "js-cookie";
import {useRouter} from '@/i18n/routing';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useTranslations } from "next-intl";
import { className } from "@/utils/classNames";
import { IOrderCreateReq } from "@/types/order.type";
import { createOrderReq } from "@/apis/order.service";
import { clearCart } from "@/redux/slices/basketSlice";
import { clearCartApi } from "@/redux/thunks/basketThunks";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";

export default function PaymentPage() {
  const dispatch = useAppDispatch();
  const { items } = useSelector((state: RootState) => state.basket);

  const router = useRouter();
  const userId = Cookies.get("userId");
const deliveryDate = Cookies.get("deliveryDate")
const t = useTranslations("Payment");

console.log("deliver",deliveryDate);

  const paymentHandler = async () => {
    const products = items.map((item) => ({
      product: item.id,
      count: item.quantity,
    }));

    if (products.length === 0) {
      throw new Error(t("empty_cart_error"));    }

    const orderRequest: IOrderCreateReq = {
      user: userId || "",
      products,
      deliveryStatus: false,
      deliveryDate:deliveryDate || "",
    };

    try {
      await createOrderReq(orderRequest);
      const userId = Cookies.get("userId");
console.log("user:",userId)
            await dispatch(clearCartApi(userId || ""));

      dispatch(clearCart());

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
    <div className="relative w-full min-h-screen bg-paymnet-pattern bg-no-repeat bg-cover flex items-center justify-center">
      <div className="absolute bg-slate-900 opacity-80 shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-100 text-center mb-6">
        {t("page_title")}
        </h2>
        {/* form */}
        <div className="space-y-5">
          {/* شماره کارت */}
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-2">
            {t("card_number")}
            </label>
            <input
              type="text"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              maxLength={19}
              className={className("w-full px-4 py-2 border border-gray-300",
                "rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500")}
            />
          </div>
          {/* نام صاحب کارت */}
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-2">
            {t("card_holder_name")}
            </label>
            <input
              type="text"
              placeholder={t("card_holder_name_placeholder")}
              className={className("w-full px-4 py-2 border border-gray-300",
                "rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500")}
            />
          </div>
          {/* تاریخ انقضا */}
          <div className="flex gap-4 justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
              {t("expiration_month")}
              </label>
              <input
                type="text"
                placeholder="MM"
                maxLength={2}
                className={className("w-full px-4 py-2 border border-gray-300",
                  "rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
              {t("expiration_year")}
              </label>
              <input
                type="text"
                placeholder="YY"
                maxLength={2}
                className={className("w-full px-4 py-2 border border-gray-300",
                  "rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500")}
              />
            </div>
          </div>
          {/* CVV2 */}
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-2">
            {t("cvv")}
            </label>
            <input
              type="text"
              placeholder="XXX"
              maxLength={4}
              className={className("w-full px-4 py-2 border border-gray-300 rounded-md",
                "shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500")}
            />
          </div>

          {/* دکمه پرداخت */}
          <div className="flex justify-between gap-x-4">
            <button
              onClick={paymentHandler}
              className={className("w-[60%] text-center bg-blue-500 hover:bg-blue-600",
                "text-white font-semibold py-2 px-4 rounded-md","active:translate-y-2 transition duration-300")}
            >
          {t("pay")}
            </button>
            <button
              className={className("w-[40%] text-center bg-red-500 hover:bg-red-600",
                "text-white font-semibold py-2 px-4 rounded-md","active:translate-y-2 transition duration-300")}
              onClick={rejectHandler}
            >
            {t("cancel")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
