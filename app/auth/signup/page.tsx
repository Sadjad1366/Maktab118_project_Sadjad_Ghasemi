"use client";
import { userSignupReq } from "@/apis/auth.service";
import { IUserSignupReq } from "@/types/user.type";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/utils/validations/zodAuthValidation";
import Link from "next/link";
import { className } from "@/utils/classNames";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserSignupReq>({
    resolver: zodResolver(SignupSchema),
    mode:"all",
  });
  const [isLoading, setIsLoading] = useState(false);
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
      toast.success("ثبت نام با موفقیت انجام شد!");
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "خطا در ثبت نام!");
      console.error("Signup Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-signup-pattern flex justify-center items-center w-full h-screen">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-slate-200 px-8 py-2 rounded-xl shadow-md w-full max-w-md"
      >
        <div className="flex justify-center">
          <img src="/images/logo/ninja.png" alt="Ninja Logo" className="h-16" />
        </div>
        {/* <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          به گالری ساعت نینجا خوش آمدید
        </h2> */}
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
              htmlFor="username"
            >
              نام کاربری
            </label>
            <input
              type="text"
              // placeholder="نام کاربری خود را وارد نمایید"
              {...register("username")}
              className={className(
                "w-full px-4 py-2 border rounded-md shadow-lg",
                "focus:outline-none focus:ring-2 focus:ring-blue-300"
              )}
            />
            {errors.username && (
              <p className="text-red-500 text-sm px-2">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <div>
              <label
                className="block text-gray-700 font-medium px-2"
                htmlFor="password"
              >
                رمز عبور
              </label>
              <input
                type="password"
                // placeholder="رمز عبور خود را وارد نمایید"
                {...register("password")}
                className={className(
                  "w-full px-4 py-2 border rounded-md shadow-lg",
                  "focus:outline-none focus:ring-2 focus:ring-blue-300"
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium px-2"
                htmlFor="confirmPassword"
              >
               تکرار رمز عبور
              </label>
              <input
                type="password"
                // placeholder="رمز عبور خود را وارد نمایید"
                {...register("confirmPassword")}
                className={className(
                  "w-full px-4 py-2 border rounded-md shadow-lg",
                  "focus:outline-none focus:ring-2 focus:ring-blue-300"
                )}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
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
            <input
              type="text"
              // placeholder="آدرس خود را وارد نمایید"
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
            <Link
              className="flex justify-center text-blue-500 hover:underline"
              href="/auth/login"
            >
              ورود به حساب کاربری
            </Link>
            <button
              type="submit"
              className={className(
                "w-full m-2 bg-blue-500 hover:bg-blue-700",
                "text-white font-bold py-2 rounded focus:outline-none",
                "focus:shadow-outline active:translate-y-1 active:scale-95 "
              )}
              disabled={isLoading}
            >
              {isLoading ? "در حال ثبت نام..." : "ثبت نام"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
