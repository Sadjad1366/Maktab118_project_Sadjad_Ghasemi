import { client } from "./client";
import { urls } from "./urls";
type getAllProductReqType = (
  page: number,
  limit?: number
) => Promise<IGlobalRes<{ products: IProduct[] }>>;


export const getAllProductsReq: getAllProductReqType = async (page, limit = 6) => {
  try {
    const response = await client.get(urls.product, {
      params: {
        page: page,
        limit: limit,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
