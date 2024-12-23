"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUserLoginReq } from "@/types/user.type";
import { adminLoginReq } from "@/apis/auth.service";
import { className } from "@/utils/classNames";
import { useRouter } from "next/navigation";
import { AuthSchema } from "@/utils/validations/zodAuthValidation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUserLoginReq>({
    resolver: zodResolver(AuthSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const submitHandler = async ({ username, password }: IUserLoginReq) => {
    try {
      await adminLoginReq({ username, password });

      toast.success("ورود موفقیت‌آمیز بود! 🎉");

      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-cover bg-center h-screen bg-signup-pattern relative flex items-center justify-center px-5">
      {/* Form container */}
      {/* <div className="relative max-w-md w-full bg-slate-300 rounded-lg shadow-lg py-4 px-6"> */}

      <form
        className="bg-slate-200 px-8 py-6 rounded-xl shadow-md w-full max-w-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex justify-center">
          <img src="/images/logo/ninja.png" alt="Ninja Logo" className="h-16" />
        </div>

        {/* Username input */}
        <div className="mb-5">
          <label className="block mb-2 text-lg font-semibold text-gray-900">
            نام کاربری
          </label>
          <div className="relative">
            <input
              type="text"
              {...register("username")}
              className={className(
                "bg-gray-50 border shadow-md text-gray-900 text-sm rounded-lg pr-10",
                "focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
                errors.username ? "border-red-500" : "border-gray-300"
              )}
              placeholder="نام کاربری"
            />
            <FaUser className="absolute right-3 top-2/4 transform -translate-y-2/4 text-gray-400" />
          </div>
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password input */}
        <div className="mb-5">
          <label className="block mb-2 text-lg font-semibold text-gray-900">
            رمز عبور
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={className(
                "bg-gray-50 border shadow-md text-gray-900 text-sm rounded-lg pl-10 pr-10",
                "focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
                errors.password ? "border-red-500" : "border-gray-300"
              )}
              placeholder="رمز عبور"
            />
            <FaEye
              onClick={togglePasswordVisibility}
              className={`absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-400 cursor-pointer ${
                showPassword ? "hidden" : "block"
              }`}
            />
            <FaEyeSlash
              onClick={togglePasswordVisibility}
              className={`absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-400 cursor-pointer ${
                showPassword ? "block" : "hidden"
              }`}
            />
            <FaLock
              className={`absolute right-3 top-2/4 transform -translate-y-2/4 text-gray-400 cursor-pointer`}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="text-center py-2">
          <Link className="text-blue-500 underline" href="/auth/signup">
            ثبت نام
          </Link>
        </div>
        {/* Submit button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={className(
              "text-white bg-gray-600 hover:bg-gray-700 focus:ring-4",
              "focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2",
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            {isSubmitting ? "در حال ورود..." : "ورود"}
          </button>
        </div>
        <div className="text-end text-blue-700 font-medium hover:underline">
          <Link href="/">بازگشت به سایت</Link>
        </div>
      </form>
    </div>
    // </div>
  );
}
