"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUserPayment } from "@/types/user.type";
import { paymentSchema } from "@/utils/validations/zodAuthValidation";
import { getUserById } from "@/apis/user.service";
import { useRouter } from "next/navigation";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function Checkout() {
  const id = Cookies.get("userId");
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      if (!id) throw new Error("User ID not found in cookies");
      return getUserById(id);
    },
    enabled: !!id,
  });

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
  React.useEffect(() => {
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

  const submitHandler = (formData: IUserPayment) => {
    console.log("Form Submitted:", formData);
    Cookies.set("deliveryDate", formData.deliveryDate);
    router.push("/payment");
  };

  return (
    <div className="bg-checkout-pattern flex justify-center py-6 w-full rounded-lg">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-gray-800 px-8 py-2 rounded-xl shadow-md w-full max-w-md opacity-90"
      >
        <div className="space-y-3">
          <div>
            <label
              htmlFor="firstname"
              className="block text-slate-100 font-medium px-2"
            >
              نام
            </label>
            <input
              id="firstname"
              {...register("firstname")}
              className="w-full px-4 py-2 border rounded-md shadow-lg"
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm px-2">
                {errors.firstname.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-slate-100 font-medium px-2"
            >
              نام خانوادگی
            </label>
            <input
              id="lastname"
              {...register("lastname")}
              className="w-full px-4 py-2 border rounded-md shadow-lg"
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm px-2">
                {errors.lastname.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-slate-100 font-medium px-2"
            >
              موبایل
            </label>
            <input
              id="phoneNumber"
              {...register("phoneNumber")}
              className="w-full px-4 py-2 border rounded-md shadow-lg"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm px-2">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-slate-100 font-medium px-2"
            >
              آدرس
            </label>
            <textarea
              id="address"
              {...register("address")}
              rows={3}
              className="w-full px-4 py-2 border rounded-md shadow-lg"
            />
            {errors.address && (
              <p className="text-red-500 text-sm px-2">
                {errors.address.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="deliveryDate"
              className="block text-slate-100 font-medium px-2"
            >
              تاریخ تحویل
            </label>
            <Controller
              control={control}
              name="deliveryDate"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  inputClass="p-2 rounded-lg shadow-lg"
                  value={value ? new DateObject(value) : ""}
                  onChange={(date) => {
                    const isoDate = date ? date.toDate().toISOString() : "";
                    onChange(isoDate);
                  }}
                  calendar={persian}
                  locale={persian_fa}
                  format="YYYY/MM/DD"
                  calendarPosition="bottom-right"
                />
              )}
            />
            {errors.deliveryDate && (
              <p className="text-red-500 text-sm px-2">
                {errors.deliveryDate.message}
              </p>
            )}
          </div>
          <div className="py-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded active:translate-y-2 transition duration-300"
            >
              ادامه
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
