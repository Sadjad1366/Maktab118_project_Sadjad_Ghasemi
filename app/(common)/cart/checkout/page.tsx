"use client";
import { IUserPayment } from "@/types/user.type";
import { className } from "@/utils/classNames";
import { paymentSchema } from "@/utils/validations/zodAuthValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import {
  //  editUserById,
  getUserById,
} from "@/apis/user.service";
import { useQuery } from "@tanstack/react-query";

export default function Checkout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserPayment>({
    resolver: zodResolver(paymentSchema),
  });
  const router = useRouter();
  const id = Cookies.get("userId");

  // // const { data } = useQuery({
  // //   queryKey: ["user", id],
  // //   queryFn: () => () => getUserById(id as string),
  // // });
  // React.useEffect(() => {
  //   console.log(getUserById("6769576d18abeb0d4238e217"));
  //   // console.log(id);
  // }, []);

  const {
    data,
    isLoading: isQueryLoading,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      if (!id) throw new Error("User ID not found in cookies");
      return getUserById(id);
    },
    enabled: !!id, // Prevent query execution if id is undefined or null
    retry: false, // Optional: Disable retries for demonstration purposes
  });

  React.useEffect(() => {
    if (data) {
      console.log(data.data.user); // Log user data when available
    } else {
      console.log("Data is undefined"); // Log undefined if data is not fetched
    }
  }, [data]);

  const submitHandler = () => {
    console.log(data);

    // {
    //   firstname,
    //   lastname,
    //   phoneNumber,
    //   address,
    //   deliveryDate
    // }: IUserPayment) => {
    //   setIsLoading(true);
    //   try {
    //    const response = await editUserById(
    //       firstname,
    //       lastname,
    //       phoneNumber,
    //       address,
    //       deliveryDate
    //     );
    //     toast.success("ثبت نام با موفقیت انجام شد!");
    //   } catch (error: any) {
    //     toast.error(error?.response?.data?.message || "خطا در ثبت نام!");
    //     console.error("Signup Error:", error);
    //   } finally {
    //     setIsLoading(false);
    //   }
  };

  return (
    <div className="bg-checkout-pattern flex justify-center py-6 w-full h-screen rounded-lg">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-slate-200 px-8 py-2 rounded-xl shadow-md w-full max-w-md"
      >
        <div className="flex justify-center">
          <img src="/images/logo/ninja.png" alt="Ninja Logo" className="h-16" />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <div>
              <label
                className="block text-gray-700 font-medium px-2"
                htmlFor="firstname"
              >
                نام
              </label>
              <input
                type="text"
                value={data?.data.user.firstname}
                // placeholder="نام خود را وارد نمایید"
                {...register("firstname")}
                className={className(
                  "w-full px-4 py-2 border rounded-md shadow-lg",
                  "focus:outline-none focus:ring-2 focus:ring-blue-300"
                )}
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm px-2">
                  {errors.firstname.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium px-2"
                htmlFor="lastname"
              >
                نام خانوادگی
              </label>
              <input
                type="text"
                value={data?.data.user.lastname}
                // placeholder="نام خانوادگی خود را وارد نمایید"
                {...register("lastname")}
                className={className(
                  "w-full px-4 py-2 border rounded-md shadow-lg",
                  "focus:outline-none focus:ring-2 focus:ring-blue-300"
                )}
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm px-2">
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium px-2"
              htmlFor="phoneNumber"
            >
              موبایل
            </label>
            <input
              value={data?.data.user.phoneNumber}
              type="text"
              // placeholder="شماره تماس خود را وارد نمایید"
              {...register("phoneNumber")}
              className={className(
                "w-full px-4 py-2 border rounded-md shadow-lg",
                "focus:outline-none focus:ring-2 focus:ring-blue-300"
              )}
            />
            {errors.phoneNumber && (
              <p className="max-w-[180px] text-red-500 text-sm px-2">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium px-2"
              htmlFor="address"
            >
              آدرس
            </label>
            <textarea
              value={data?.data.user.address}
              rows={3}
              {...register("address")}
              className={className(
                "w-full px-4 py-2 border rounded-md shadow-lg",
                "focus:outline-none focus:ring-2 focus:ring-blue-300"
              )}
            />
            {errors.address && (
              <p className="text-red-500 text-sm px-2">
                {errors.address.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium px-2"
              htmlFor="phoneNumber"
            >
              تاریخ تحویل
            </label>
            <input
              type="date"
              // placeholder="شماره تماس خود را وارد نمایید"
              {...register("deliveryDate")}
              className={className(
                "w-full px-4 py-2 border rounded-md shadow-lg",
                "focus:outline-none focus:ring-2 focus:ring-blue-300"
              )}
            />
            {errors.deliveryDate && (
              <p className="max-w-[180px] text-red-500 text-sm px-2">
                {errors.deliveryDate.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className={className(
                "w-full m-2 bg-blue-500 hover:bg-blue-700",
                "text-white font-bold py-2 rounded focus:outline-none",
                "focus:shadow-outline active:translate-y-1 active:scale-95 "
              )}
            >
              پرداخت
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
