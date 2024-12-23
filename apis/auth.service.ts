import {
  IUserLoginReq,
  IUserLoginRes,
  IUserSignupReq,
  IUserSignupRes,
} from "@/types/user.type";
import { client } from "./client";
import { urls } from "./urls";
import Cookies from "js-cookie";
import { AxiosError } from "axios";

//======================================= adminLogin =====================================
export const adminLoginReq = async ({
  username,
  password,
}: IUserLoginReq): Promise<IUserLoginRes> => {
  try {
    const response = await client.post(urls.auth.login, {
      username,
      password,
    });

    const { accessToken, refreshToken } = response.data.token;
    const { role } = response.data.data.user;
    // console.log(role)

    // Set access and refresh tokens in cookies
    Cookies.set("accessToken", accessToken, {
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "Strict",
      expires: 1 / 24, // Expires in 1 hour
    });

    Cookies.set("refreshToken", refreshToken, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: 1 / 12, // Expires in 2 hour
    });
    // Set role in cookies
    Cookies.set("role", role, {
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "Strict",
      // expires: 1 / 24, // Expires in 1 hour
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

//======================================= userSignup =====================================
type userSignupReqType = ({
  firstname,
  lastname,
  username,
  password,
  phoneNumber,
  address,
}: IUserSignupReq) => Promise<IUserSignupRes>;
export const userSignupReq: userSignupReqType = async ({
  firstname,
  lastname,
  username,
  password,
  phoneNumber,
  address,
}: IUserSignupReq) => {
  try {
    const response = await client.post(urls.auth.signup, {
      firstname,
      lastname,
      username,
      password,
      phoneNumber,
      address,
    });
    const { accessToken, refreshToken } = response.data.token;
    const { role } = response.data.data.user;

    // Set access and refresh tokens in cookies
    Cookies.set("accessToken", accessToken, {
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "Strict",
      expires: 1 / 24, // Expires in 1 hour
    });

    Cookies.set("refreshToken", refreshToken, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: 1 / 12, // Expires in 2 hour
    });
    // Set role in cookies
    Cookies.set("role", role, {
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "Strict",
      // expires: 1 / 24, // Expires in 1 hour
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//======================================= userlogin =====================================
export const userlogin = async ({
  username,
  password,
}: IUserLoginReq): Promise<IUserLoginRes> => {
  try {
    const response = await client.post(urls.auth.login, {
      username,
      password,
    });

    const { accessToken, refreshToken } = response.data.token;
    const { role,id } = response.data.data.user;

    // Set access and refresh tokens in cookies
    Cookies.set("accessToken", accessToken, {
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "Strict",
      expires: 1 / 24, // Expires in 1 hour
    });

    Cookies.set("refreshToken", refreshToken, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: 1 / 12, // Expires in 2 hour
    });
    // Set role in cookies
    Cookies.set("role", role, {
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "Strict",
      // expires: 1 / 24, // Expires in 1 hour
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
