"use client";
import { adminLoginReq } from "@/apis/auth.service";
import { IAdmin } from "@/types/user.type";
import { className } from "@/utils/classNames";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const AdminLoginPage = () => {
  const { register, handleSubmit } = useForm<IAdmin>();

  const submitHandler: SubmitHandler<IAdmin> = async ({
    username,
    password,
  }: IAdmin) => {
    const response = await adminLoginReq({ username, password });
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
              // {...register('username')}
              {...register("username")}
              className={className(
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg",
                "focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              )}
              placeholder="نام کاربری"
              required
            />
          </div>

          {/* Password input */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              رمز عبور
            </label>
            <input
              type="password"
              {...register("password")}
              // {...register("password")}
              className={className(
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg",
                "focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              )}
              placeholder="رمز عبور"
              required
            />
          </div>

          {/* Remember me checkbox */}
          <div className="flex items-center mb-5">
            <input
              id="remember"
              type="checkbox"
              className={className(
                "w-4 h-4 border border-gray-300 rounded focus:ring-2",
                "focus:ring-blue-500"
              )}
            />
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              مرا به خاطر داشته باش
            </label>
          </div>

          {/* Submit button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className={className(
                "text-white bg-blue-600 hover:bg-blue-700 focus:ring-4",
                "focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2"
              )}
            >
              ورود
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdminLoginPage;
