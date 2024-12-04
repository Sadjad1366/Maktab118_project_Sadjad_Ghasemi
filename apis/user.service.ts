import { IUser, IUserByIdRes } from "@/types/user.type";
import { client } from "./client";
import { urls } from "./urls";

const token = sessionStorage.getItem("accessToken");
// type getAllUsersReqType = () => Promise<IGlobalRes<{ users: IUser[] }>>;
type GetAllUsersType = () => Promise<IUser[]>;

export const getAllUsers: GetAllUsersType = async () => {
  try {
    const response = await client.get(urls.user,{
      headers : {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data.users;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};

type getUserByIdType = (id: string) => Promise<IUserByIdRes>;
export const getUserById: getUserByIdType = async (id) => {
  const response = await client.get(urls.user, {
    params: {
      "id": `${id}`,
    },
    headers:{
      Authorization: `Bearer ${token}`
    }
  });
  console.log(response.data);

  return response.data;
};
