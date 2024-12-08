export const urls = {
<<<<<<< HEAD
  auth:{adminLog: "/auth/login",
    tokenGen:"/auth/token"
  },
  product: "/products",
=======
  auth:{
admin: "/auth/login"
  }
  ,
  product:{
    getAll:"/products",
    getById: (id: string) => `/products/${id}`
  } ,
>>>>>>> feature/product-card
  order: "/orders",
  user: "/users",
  category: "/categories",
};
