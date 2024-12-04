import { IUserRes } from "@/types/user.type";
import { client } from "./client";
import { urls } from "./urls";

type getAllUsersReqType = () => Promise<IGlobalRes<{ users: IUserRes[] }>>;

export const getAllUsersReq = async () => {
  try {
    const response = await client.get(urls.user);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Failed to get products");
  }
};
