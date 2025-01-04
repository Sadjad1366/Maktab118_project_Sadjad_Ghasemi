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



//============================= GET CATEGORIES ============================
type GetAllCategoriesType = () => Promise<ICategory[]>;
export const getAllCategories: GetAllCategoriesType = async () => {
  try {
    const response = await client.get(urls.category.getCategories);
    return response.data.data.categories; // Adjust based on your API response structure
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "خطا در دریافت دسته بندی ها");
  }
};

//============================= GET SUBCATEGORIES ============================
type GetAllSubCategoriesType = () => Promise<ISubCategory[]>;
export const getAllSubCategories: GetAllSubCategoriesType = async () => {
  try {
    const response = await client.get(urls.subcategory.getSubCategories);
    return response.data.data.subcategories; // Adjust based on your API response structure
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "خطا در دریافت زیر دسته بندی ها");
  }
};
