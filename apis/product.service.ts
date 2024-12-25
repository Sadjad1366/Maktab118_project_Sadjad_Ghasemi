"use client"
import { client } from "./client";
import { urls } from "./urls";
import Cookies from 'js-cookie';

//============================= GET PRODUCTS ============================
type getAllProductReqType = (
  page?: number,
  limit?: number,
  sort?: string,
  name?: string,
  brand?:string,
) => Promise<IGlobalRes<{products: IProduct[]
}>>;

export const getAllProductsReq: getAllProductReqType = async (page=1, limit = 6,sort, name, brand
  ) => {
  try {
    const response = await client.get(urls.product.getAll, {
      params: {
        page: page,
        limit: limit,
        sort:sort,
        name:name,
        brand:brand
      },
    });
    console.log('products in api: ',response.data);
    return response.data;
  } catch (error:any) {
    throw new Error(error.response?.data?.message || "Failed to get products");

  }
};

// export const getAllProductsReq = async (
//   page: number,
//   limit: number,
//   sort: string | undefined,
//   name: string,
//   brand: string
// ) => {
//   const url = `http://localhost:8000/api/products?limit=${limit}&page=${page}&sort=${sort || ""}&name=${name}&brand=${brand}`;
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error("Failed to fetch products");
//   }
//   return await response.json(); // Ensure correct JSON parsing
// };

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

//=========================== CREATE PRODUCT
export const createNewProduct = async (formData: FormData): Promise<IProduct> => {
  try {
    // Add the image file using the correct field name
    const response = await client.post(urls.product.create, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${Cookies.get('accessToken')}`, // Include token
      },
    });

    console.log(response.data.data.product);
    return response.data.data.product;

  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error("کالایی اضافه نگردید.");
  }
};
