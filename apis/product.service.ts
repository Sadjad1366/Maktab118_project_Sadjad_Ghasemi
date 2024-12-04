import { client } from "./client";
import { urls } from "./urls";

type getAllProductReqType = (
  page: number,
  limit?: number,
  sort?: string // Add an optional sort parameter
) => Promise<IGlobalRes<{ products: IProduct[] }>>;

export const getAllProductsReq: getAllProductReqType = async (page, limit = 6,
  //  sort
  ) => {
  try {
    const response = await client.get(urls.product, {
      params: {
        page: page,
        limit: limit,
        // sort: sort, // Pass the sort parameter
      },
    });
    return response.data;
  } catch (error:any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Failed to get products");

  }
};
