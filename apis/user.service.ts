import { IUser, IUserByIdRes } from "@/types/user.type";
import { client } from "./client";
import { urls } from "./urls";
import Cookies from "js-cookie";

type GetAllUsersType = () => Promise<IUser[]>;

export const getAllUsers: GetAllUsersType = async () => {
  try {
    const token = Cookies.get("accessToken");
    console.log("Access Token:", token); 

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
type GetUserByIdType = (id: string) => Promise<IUserByIdRes>;
export const getUserById: GetUserByIdType = async (id) => {
  try {
    const token = Cookies.get("accessToken"); // Retrieve the token dynamically
    if (!token) {
      throw new Error("احراز هویت مورد تایید نیست");
    }

    const response = await client.get(urls.user, {
      params: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
};
