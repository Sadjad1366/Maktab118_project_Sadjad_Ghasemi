"use client";
import { userSignupReq } from "@/apis/auth.service";
import { IUserSignupReq } from "@/types/user.type";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/utils/validations/zodAuthValidation";
import {Link} from '@/i18n/routing';
import { className } from "@/utils/classNames";
import { useRouter } from "@/i18n/routing";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoIosHome } from "react-icons/io";
import { useTranslations } from "next-intl";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserSignupReq>({
    resolver: zodResolver(SignupSchema),
    mode: "all",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const t = useTranslations("Signup");

  const router = useRouter();

  const submitHandler = async ({
    firstname,
    lastname,
    username,
    password,
    confirmPassword,
    phoneNumber,
    address,
  }: IUserSignupReq) => {
    setIsLoading(true);
    try {
      await userSignupReq({
        firstname,
        lastname,
        username,
        password,
        confirmPassword,
        phoneNumber,
        address,
      });
      toast.success(`${t("signup_success")}`);
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "خطا در ثبت نام!");
      console.error("Signup Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-signup-pattern bg-no-repeat bg-cover flex justify-center items-center w-full h-screen">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-slate-200 px-8 py-5 rounded-xl shadow-md w-full max-w-lg opacity-95"
      >
        <div className="flex justify-center pb-3">
          <img src="/images/logo/ninja.png" alt="Ninja Logo" className="h-16" />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between gap-x-5">
            <div className="w-full">
              <label
                className="block text-gray-700 font-medium px-2"
                htmlFor="firstname"
              >
                {t("first_name")}
              </label>
              <input
                placeholder={t("first_name")}
                type="text"
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
            <div className="w-full">
              <label
                className="block text-gray-700 font-medium px-2"
                htmlFor="lastname"
              >
                {t("last_name")}
              </label>
              <input
                type="text"
                placeholder={t("last_name")}
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
          <div className="relative">
            <label
              className="block text-gray-700 font-medium px-2"
              htmlFor="username"
            >
              {t("username")}
            </label>
            <input
              type="text"
              {...register("username")}
              placeholder={t("username")}
              className={className(
                "w-full px-8 py-2 border rounded-md shadow-lg",
                "focus:outline-none focus:ring-2 focus:ring-blue-300"
              )}
            />
            <FaUser className="absolute right-3 top-11 transform -translate-y-2/4 text-gray-400" />
            {errors.username && (
              <p className="text-red-500 text-sm px-2">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="flex justify-between gap-x-5">
            <div className="w-full relative">
              <label
                className="block text-gray-700 font-medium px-2"
                htmlFor="password"
              >
                {t("password")}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("username")}
                {...register("password")}
                className={className(
                  "w-full px-8 py-2 border rounded-md shadow-lg",
                  "focus:outline-none focus:ring-2 focus:ring-blue-300"
                )}
              />
              <FaEye
                onClick={togglePasswordVisibility}
                className={`absolute left-3 top-11 transform -translate-y-2/4 text-gray-400 cursor-pointer ${
                  showPassword ? "hidden" : "block"
                }`}
              />
              <FaLock
                className={`absolute right-3 top-11 transform -translate-y-2/4 text-gray-400 cursor-pointer`}
              />
              <FaEyeSlash
                onClick={togglePasswordVisibility}
                className={`absolute left-3 top-11 transform -translate-y-2/4 text-gray-400 cursor-pointer ${
                  showPassword ? "block" : "hidden"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="w-full relative">
              <label
                className="block text-gray-700 font-medium px-2"
                htmlFor="confirmPassword"
              >
                {t("confirm_password")}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("confirm_password")}
                {...register("confirmPassword")}
                className={className(
                  "w-full px-8 py-2 border rounded-md shadow-lg",
                  "focus:outline-none focus:ring-2 focus:ring-blue-300"
                )}
              />
              <FaEye
                onClick={togglePasswordVisibility}
                className={`absolute left-3 top-11 transform -translate-y-2/4 text-gray-400 cursor-pointer ${
                  showPassword ? "hidden" : "block"
                }`}
              />
              <FaLock
                className={`absolute right-3 top-11 transform -translate-y-2/4 text-gray-400 cursor-pointer`}
              />
              <FaEyeSlash
                onClick={togglePasswordVisibility}
                className={`absolute left-3 top-11 transform -translate-y-2/4 text-gray-400 cursor-pointer ${
                  showPassword ? "block" : "hidden"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <div className="relative">
            <label
              className="block text-gray-700 font-medium px-2"
              htmlFor="phoneNumber"
            >
              {t("phone_number")}
            </label>
            <input
              type="text"
              placeholder={t("phone_number")}
              {...register("phoneNumber")}
              className={className(
                "w-full px-8 py-2 border rounded-md shadow-lg",
                "focus:outline-none focus:ring-2 focus:ring-blue-300"
              )}
            />
            <IoIosPhonePortrait
              size={28}
              className={`absolute right-2 top-11 transform -translate-y-2/4 text-gray-400 cursor-pointer`}
            />
            {errors.phoneNumber && (
              <p className="max-w-[180px] text-red-500 text-sm px-2">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div className="relative">
            <label
              className="block text-gray-700 font-medium px-2"
              htmlFor="address"
            >
              {t("address")}
            </label>
            <input
              type="text"
              placeholder={t("address")}
              {...register("address")}
              className={className(
                "w-full px-8 py-2 border rounded-md shadow-lg",
                "focus:outline-none focus:ring-2 focus:ring-blue-300"
              )}
            />
            <IoIosHome
              size={20}
              className={`absolute right-2 top-11 transform -translate-y-2/4 text-gray-400 cursor-pointer`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm px-2">
                {errors.address.message}
              </p>
            )}
          </div>
            <div className="text-center">
            <Link
              className="text-blue-500 hover:underline"
              href="/auth/login"
            >
              {t('login_link')}
            </Link>
            </div>
            <div>
            <button
              type="submit"
              className={className(
                "w-full bg-blue-500 hover:bg-blue-700",
                "text-white font-bold py-2 rounded focus:outline-none",
                "focus:shadow-outline active:translate-y-1 active:scale-95 "
              )}
              disabled={isLoading}
            >
              {isLoading ? `${t('signing_up')}` : `${t('signup')}`}
            </button>
          </div>
          <div className="text-end text-blue-700 font-medium hover:underline">
            <Link href="/">{t('back_to_home')}</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
