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
    const { role, _id } = response.data.data.user;

    Cookies.set("accessToken", accessToken, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: 1 / 24,
    });

    Cookies.set("refreshToken", refreshToken, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: 1 / 12,
    });
    Cookies.set("role", role, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
        Cookies.set("userId", _id, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
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
  // confirmPassword,
  phoneNumber,
  address,
}: IUserSignupReq) => Promise<IUserSignupRes>;
export const userSignupReq: userSignupReqType = async ({
  firstname,
  lastname,
  username,
  password,
  // confirmPassword,
  phoneNumber,
  address,
}: IUserSignupReq) => {
  try {
    const response = await client.post(urls.auth.signup, {
      firstname,
      lastname,
      username,
      password,
      // confirmPassword,
      phoneNumber,
      address,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//======================================= userlogin =====================================
export const userloginReq = async ({
  username,
  password,
}: IUserLoginReq): Promise<IUserLoginRes> => {
  try {
    const response = await client.post(urls.auth.login, {
      username,
      password,
    });

    const { accessToken, refreshToken } = response.data.token;
    const { role, _id } = response.data.data.user;

    Cookies.set("accessToken", accessToken, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: 1 / 24,
    });

    Cookies.set("refreshToken", refreshToken, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: 1 / 12,
    });
    Cookies.set("role", role, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",

    });
        Cookies.set("userId", _id, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
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
