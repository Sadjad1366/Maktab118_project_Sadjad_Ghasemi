import {
  IOrderCreateReq,
  IOrderCreateRes,
  IOrderGetAllRes,
} from "@/types/order.type";
import { client } from "./client";
import { urls } from "./urls";

//================================= get all orders ==================

type getAllOrdersReqType = (
  page?: number,
  limit?: number,
  deliveryStatus?: boolean
) => Promise<IGlobalRes<{ orders: IOrderGetAllRes[] }>>;
export const getAllOrdersReq: getAllOrdersReqType = async (
  page = 1,
  limit = 6,
  deliveryStatus
) => {
  try {
    const response = await client.get(urls.order, {
      params: {
        page: page,
        limit: limit,
        deliveryStatus:deliveryStatus === null ? undefined : deliveryStatus,
      },
    });
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
  deliveryDate,
}: IOrderCreateReq) => Promise<IOrderCreateRes>;

export const createOrderReq: createOrderReqType = async ({
  user,
  products,
  deliveryStatus = false,
  deliveryDate,
}: IOrderCreateReq) => {
  try {
    const response = await client.post(urls.order, {
      user,
      products,
      deliveryStatus,
      deliveryDate,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error from server:", error.response?.data);
    throw new Error(error.response?.data?.message || "ایجاد سفارش ناموفق");
  }
};

// ================================= get order by id ==============================
export const getOrderById = async (id: string) => {
  try {
    const response = await client.get(urls.orderById(id));
    return response.data;
  } catch (error: any) {
    throw new Error("خطا در دریافت سفارش");
  }
};

//================================== edit order By Id ============================
export const editOrderById = async (id: string, deliveryStatus = true) => {
  try {
    const response = await client.patch(urls.orderById(id), {
      deliveryStatus,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
