"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUserPayment } from "@/types/user.type";
import { paymentSchema } from "@/utils/validations/zodAuthValidation";
import { getUserById } from "@/apis/user.service";
import { useRouter } from "@/i18n/routing";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useLocale, useTranslations } from "next-intl";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

export default function Checkout() {
  const id = Cookies.get("userId");
  const router = useRouter();
  const t = useTranslations("Checkout");
  const locale = useLocale();
  const isPersian = locale === "fa";

  // Fetch user data
  const { data } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      if (!id) throw new Error("User ID not found in cookies");
      return getUserById(id);
    },
    enabled: !!id,
  });

  // Initialize form
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUserPayment>({
    resolver: zodResolver(paymentSchema),
    mode: "all",
    defaultValues: {
      firstname: "",
      lastname: "",
      phoneNumber: "",
      address: "",
      deliveryDate: "",
    },
  });

  // Update form values when data is fetched
  useEffect(() => {
    if (data?.data?.user) {
      const user = data.data.user;
      reset({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        deliveryDate: "",
      });
    }
  }, [data, reset]);

  // Handle form submission
  const submitHandler = (formData: IUserPayment) => {
    console.log("Form Submitted:", formData);
    Cookies.set("deliveryDate", formData.deliveryDate);
    router.push("/payment");
  };

  return (
    <div className="bg-checkout-pattern bg-no-repeat bg-cover flex justify-center py-6 w-full rounded-lg">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-gray-800 px-8 py-2 rounded-xl shadow-md w-full max-w-md opacity-90"
      >
        <div className="space-y-3">
          {/* First Name */}
          <div>
            <label htmlFor="firstname" className="block text-slate-100 font-medium px-2">
              {t("first_name")}
            </label>
            <input id="firstname" {...register("firstname")} className="w-full px-4 py-2 border rounded-md shadow-lg" />
            {errors.firstname && <p className="text-red-500 text-sm px-2">{errors.firstname.message}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastname" className="block text-slate-100 font-medium px-2">
              {t("last_name")}
            </label>
            <input id="lastname" {...register("lastname")} className="w-full px-4 py-2 border rounded-md shadow-lg" />
            {errors.lastname && <p className="text-red-500 text-sm px-2">{errors.lastname.message}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-slate-100 font-medium px-2">
              {t("phone_number")}
            </label>
            <input id="phoneNumber" {...register("phoneNumber")} className="w-full px-4 py-2 border rounded-md shadow-lg" />
            {errors.phoneNumber && <p className="text-red-500 text-sm px-2">{errors.phoneNumber.message}</p>}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-slate-100 font-medium px-2">
              {t("address")}
            </label>
            <textarea id="address" {...register("address")} rows={3} className="w-full px-4 py-2 border rounded-md shadow-lg" />
            {errors.address && <p className="text-red-500 text-sm px-2">{errors.address.message}</p>}
          </div>

          {/* Delivery Date */}
          <div>
            <label htmlFor="deliveryDate" className="block text-slate-100 font-medium px-2">
              {t("delivery_date")}
            </label>
            <Controller
              control={control}
              name="deliveryDate"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  inputClass="p-2 rounded-lg shadow-lg"
                  value={value ? new DateObject({ date: value, calendar: isPersian ? persian : gregorian }) : ""}
                  onChange={(date) => {
                    const isoDate = date ? date.toDate().toISOString() : "";
                    onChange(isoDate);
                  }}
                  calendar={isPersian ? persian : gregorian}
                  locale={isPersian ? persian_fa : gregorian_en}
                  format={isPersian ? "YYYY/MM/DD" : "MM/DD/YYYY"}
                  calendarPosition="bottom-right"
                />
              )}
            />
            {errors.deliveryDate && <p className="text-red-500 text-sm px-2">{errors.deliveryDate.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="py-4">
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded active:translate-y-2 transition duration-300">
              {t("continue")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
