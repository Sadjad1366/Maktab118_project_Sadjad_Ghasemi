"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IAdmin } from "@/types/user.type";
import { adminLoginReq } from "@/apis/auth.service";
import { className } from "@/utils/classNames";
import { useRouter } from "next/navigation";
import { AuthSchema } from "@/utils/validations/zodValidation";
import Link from "next/link";

const AdminLoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IAdmin>({
    resolver: zodResolver(AuthSchema),
  });

  const router = useRouter();

  const submitHandler = async ({ username, password }: IAdmin) => {
    try {
      const response = await adminLoginReq({ username, password });

      const { accessToken, refreshToken } = response.token;
      console.log(response.token);

      // Store tokens in sessionStorage (only accessible in the same tab session)
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);

      // Redirect after successful login
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally, handle global form errors here
    }
  };

  return (
    <div className="bg-cover bg-center h-screen bg-hero-pattern relative flex items-center justify-center">
      {/* Semi-transparent background overlay */}
      <div className="absolute inset-0 bg-black opacity-25"></div>

      {/* Form container */}
      <div className="relative max-w-md w-full bg-white rounded-lg shadow-lg py-10 px-6">
        <form onSubmit={handleSubmit(submitHandler)}>
          {/* Welcome message */}
          <p className="text-center text-lg font-semibold text-gray-700 mb-6">
            به پنل مدیریت خوش آمدید
          </p>

          {/* Username input */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              نام کاربری
            </label>
            <input
              type="text"
              {...register("username")}
              className={className(
                "bg-gray-50 border text-gray-900 text-sm rounded-lg",
                "focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
                errors.username ? "border-red-500" : "border-gray-300"
              )}
              placeholder="نام کاربری"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password input */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              رمز عبور
            </label>
            <input
              type="password"
              {...register("password")}
              className={className(
                "bg-gray-50 border text-gray-900 text-sm rounded-lg",
                "focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
                errors.password ? "border-red-500" : "border-gray-300"
              )}
              placeholder="رمز عبور"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
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
        </form>
        <div className="text-end text-blue-700 font-medium hover:underline">
        <Link href="/">بازگشت به سایت</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
