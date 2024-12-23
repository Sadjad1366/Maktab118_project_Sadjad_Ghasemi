import { IUser, IUserByIdRes, IUserPayment } from "@/types/user.type";
import { client } from "./client";
import { urls } from "./urls";
import Cookies from "js-cookie";

type GetAllUsersType = () => Promise<IUser[]>;

export const getAllUsers: GetAllUsersType = async () => {
  try {
    const token = Cookies.get("accessToken");
    // console.log("Access Token:", token);

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
// type GetUserByIdType = (id: string) => Promise<IUserByIdRes>;
export const getUserById = async (id: string):Promise<IUserByIdRes> => {
  try {
    const response = await client.get(urls.editUser(id));
console.log(response.data)
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
};

//========================== editUser ById =======================
// type EditUserByIdType = (
//   firstname: string,
//   lastname: string,
//   phoneNumber: string,
//   address: string,
//   deliveryDate: string
// ) => Promise<IUserPayment>;
// const id: string | undefined = Cookies.get("_id");
// export const editUserById: EditUserByIdType = async (
//   firstname,
//   lastname,
//   phoneNumber,
//   address,
//   deliveryDate
// ) => {
//   try {
//     const response = await client.patch(urls.editUser(id), {
//       firstname,
//       lastname,
//       phoneNumber,
//       address,
//       deliveryDate,
//     });
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || "Failed to fetch user");
//   }
// };
