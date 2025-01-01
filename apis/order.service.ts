import { client } from "./client";
import { urls } from "./urls";

type getAllOrdersReqType = () => Promise<
  IGlobalRes<{ orders: IOrderGetAllRes[] }>
>;
export const getAllOrdersReq: getAllOrdersReqType = async () => {
  try {
    const response = await client.get(urls.order);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to get orders");
  }
};
// //======================================= create order ==============================

type createOrderReqType = ({
  user,
  products,
  deliveryStatus,
}: IOrderCreateReq) => Promise<IOrderCreateRes>;

export const createOrderReq: createOrderReqType = async ({
  user,
  products,
  deliveryStatus = false,
}: IOrderCreateReq) => {
  try {
    const response = await client.post(urls.order, {
      user,
      products,
      deliveryStatus,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error from server:", error.response?.data);
    throw new Error(error.response?.data?.message || "ایجاد سفارش ناموفق");
  }
};
