"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUserLoginReq } from "@/types/user.type";
import { userloginReq } from "@/apis/auth.service";
import { className } from "@/utils/classNames";
import { AuthSchema } from "@/utils/validations/zodAuthValidation";
import { Link } from "@/i18n/routing";
import toast from "react-hot-toast";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import Image from "next/image";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUserLoginReq>({
    resolver: zodResolver(AuthSchema),
    mode: "all",
  });

  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations("Login");
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const submitHandler = async ({ username, password }: IUserLoginReq) => {
    try {
      await userloginReq({ username, password });

      toast.success(`${t("login_success")}`);
      router.push("/");
    } catch (error: unknown) {
      // ✅ FIXED
      const errMessage =
        error instanceof Error ? error.message : t("login_error");
      toast.error(`${t("login_error")} - ${errMessage}`);
    }
  };

  return (
    <div className="bg-cover bg-center h-screen bg-signup-pattern relative flex items-center justify-center px-5">
      {/* Form container */}

      <form
        className="bg-slate-200 px-8 py-6 rounded-xl shadow-md w-full max-w-md opacity-95"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex justify-center">
          <Image
            src="/images/logo/ninja.png"
            alt="Ninja Logo"
            width={64}
            height={64}
          />
        </div>

        {/* Username input */}
        <div className="mb-5">
          <label className="block mb-2 text-lg font-semibold text-gray-900">
            {t("username")}
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
              placeholder={t("username_placeholder")}
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
            {t("password")}
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
              placeholder={t("password_placeholder")}
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
            {t("signup")}
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
            {isSubmitting ? `${t("logging_in")}` : `${t("login")}`}
          </button>
        </div>
        <div className="text-end text-blue-700 font-medium hover:underline">
          <Link href="/">{t("back_to_home")}</Link>
        </div>
      </form>
    </div>
  );
}
