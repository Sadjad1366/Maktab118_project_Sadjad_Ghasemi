"use client"
import { client } from "./client";
import { urls } from "./urls";

//============================= GET PRODUCTS ============================
type getAllProductReqType = (
  page: number,
  limit?: number,
) => Promise<IGlobalRes<{products: IProduct[]
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
    throw new Error(error.response?.data?.message || "خطا در دریافت دسته بندی ها");
  }
};

//============================= GET SUBCATEGORIES ============================
type GetAllSubCategoriesType = () => Promise<ISubCategory[]>;
export const getAllSubCategories: GetAllSubCategoriesType = async () => {
  try {
    const response = await client.get(urls.subcategory);
    return response.data.data.subcategories; // Adjust based on your API response structure
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "خطا در دریافت زیر دسته بندی ها");
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
//=========================== DELETE BY ID =========================
export const deleteProductById = async(id:string):Promise<void> =>{
  try {
    const response = await client.delete(urls.product.delById(id))
  } catch (error) {
    throw new Error("حذف با خطا روبرو شد");
  }
}
//=========================== UPDATE BY ID
// export const updateProductById = async (
//   id: string,
//   data: Partial<IProduct>
// ): Promise<IProductById> => {
//   try {
//     const response = await client.patch(urls.product.updateById(id), data);
//     console.log(response.data.data.product);

//     return response.data.data.product;
//   } catch (error) {
//     throw new Error("بروز رسانی با خطا روبرو شد");
//   }
// };
export const updateProductById = async(id:string, formData:FormData):Promise<IProduct> =>{
try{
  const response = await client.patch(urls.product.updateById(id), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },});
  console.log(response.data.data.product);
  return response.data;

} catch(error:any){
  console.error("API Error:", error.response?.data || error.message);
    throw new Error("بروز رسانی با خطا روبرو شد");

}
}
