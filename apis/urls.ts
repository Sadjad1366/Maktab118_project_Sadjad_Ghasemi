export const urls = {
  auth:{
   admin: "/auth/login"
  },
  product:{
    getAll:"/products",
    getById: (id: string) => `/products/${id}`
  } ,
  order: "/orders",
  user: "/users",
  category: "/categories",
};
