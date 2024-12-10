export const urls = {
  auth:{
   adminLog: "/auth/login"
  },
  product:{
    getAll:"/products",
    getById: (id: string) => `/products/${id}`,
    delById : (id: string) => `/products/${id}`,
    updateById: (id:string) => `/products/${id}`
  } ,
  order: "/orders",
  user: "/users",
  category: "/categories",
  subcategory:"/subcategories"
};
