import { IAdminReq, IAdminRes } from "@/types/user.type";
import { client } from "./client";
import { urls } from "./urls";
import { AxiosError } from "axios";

export const adminLoginReq = async ({ username, password }: IAdminReq):Promise<IAdminRes> => {
  try {
      const response = await client.post(urls.admin,{
            username: username,
            password: password,
     })
     return response.data

  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Failed to login as admin");
  }
};
