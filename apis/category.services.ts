import { client } from "./client";
import { urls } from "./urls";

export const getAllProductsByCategory = async (
  page: number,
  limit?: number,
  category?: string
): Promise<IGlobalRes<{ products: IProduct[] }>> => {
  try {
    const response = await client.get(urls.category.getProductsByCategory, {
      params: {
        page: page,
        limit: limit,
        category: category,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("دریافت محصولات صورت نگرفت");
  }
};
