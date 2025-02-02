import { IUser, IUserByIdRes, IUserPayment } from "@/types/user.type";
import { client } from "./client";
import { urls } from "./urls";
import Cookies from "js-cookie";

type GetAllUsersType = () => Promise<IUser[]>;

export const getAllUsers: GetAllUsersType = async () => {
  try {
    const token = Cookies.get("accessToken");
    if (!token) {
      throw new Error("Authentication token not found");
    }
    const response = await client.get(urls.user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.users;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};
export const getUserById = async (id: string): Promise<IUserByIdRes> => {
  try {
    const response = await client.get(urls.editUser(id));
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
};
