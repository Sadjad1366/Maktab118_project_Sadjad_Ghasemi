import { client } from "./client";
import { urls } from "./urls";

type getAllOrdersReqType = () => Promise<IGlobalRes<{ orders: IOrder[] }>>;
export const getAllOrdersReq: getAllOrdersReqType = async () => {
  const response = await client.get(urls.order);
  return response.data;
};
