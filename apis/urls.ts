export const urls = {
  auth: {
    adminLog: "/auth/login",
    signup: "/auth/signup",
  },
  product: {
    create: "/products",
    getAll: "/products",
    getById: (id: string) => `/products/${id}`,
    delById: (id: string) => `/products/${id}`,
    updateById: (id: string) => `/products/${id}`,
  },
  order: "/orders",
  user: "/users",
  category: {
    getCategories: "/categories",
    getProductsByCategory: "/products",
  },
  subcategory: {
    getSubCategories: "/subcategories",
  },
};
