import { IAdminReq, IAdminRes } from "@/types/user.type";
import { client } from "./client";
import { urls } from "./urls";
import Cookies from "js-cookie";
import { AxiosError } from "axios";

export const adminLoginReq = async ({ username, password }: IAdminReq): Promise<IAdminRes> => {
  try {
    const response = await client.post(urls.admin, {
      username,
      password,
    });

    const { accessToken, refreshToken } = response.data.token;
// console.log(response.data.token);

  // Set access and refresh tokens in cookies
  Cookies.set("accessToken", accessToken, {
    secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
    sameSite: "Strict", // Prevent CSRF
    expires: 1 / 24, // Expires in 1 hour
  });

  Cookies.set("refreshToken", refreshToken, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    expires: 7, // Expires in 7 days
  });

    return response.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.status === 401) {
        throw new Error("نام کاربری یا رمز عبور اشتباه است");
      }
    }
    throw new Error("خطا از طرف سرور میباشد.چند دقیقه دیگر دوباره تلاش کنید");
  }
};
