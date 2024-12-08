import { client } from "./client";
import { urls } from "./urls";

//============================= GET PRODUCTS ============================
type getAllProductReqType = (
  page: number,
  limit?: number,
) => Promise<IGlobalRes<{
  totalPages: number; products: IProduct[]
}>>;

export const getAllProductsReq: getAllProductReqType = async (page, limit = 6,
  ) => {
  try {
    const response = await client.get(urls.product.getAll, {
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
//============================= GET CATEGORIES ============================
type GetAllCategoriesType = () => Promise<ICategory[]>;
export const getAllCategories: GetAllCategoriesType = async () => {
  try {
    const response = await client.get(urls.category);
    return response.data.data.categories; // Adjust based on your API response structure
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch categories");
  }
};

//========================== GET PRODUCT BY ID ========================
type getProductByIdType = (id:string) => Promise<IProductById>
export const getProductById:getProductByIdType = async(id) => {
  try {
    const response = await client.get(urls.product.getById(id));
    console.log(response.data);

     return response.data
  } catch (error:any) {
    throw new Error("خطا از طرف سرور میباشد.چند دقیقه دیگر دوباره تلاش کنید");
  }

}
