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
    throw new Error(error.response?.data?.message || "Failed to get products");

  }
};

type GetAllCategoriesType = () => Promise<ICategory[]>;
export const getAllCategories: GetAllCategoriesType = async () => {
  try {
    const response = await client.get(urls.category);
    return response.data.data.categories; // Adjust based on your API response structure
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch categories");
  }
};
