import { client } from "./client";
import { urls } from "./urls";

type getAllOrdersReqType = () => Promise<IGlobalRes<{ orders: IOrder[] }>>;
export const getAllOrdersReq: getAllOrdersReqType = async () => {
  try {
    const response = await client.get(urls.order);
    return response.data;

  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to get orders");
  }
};
