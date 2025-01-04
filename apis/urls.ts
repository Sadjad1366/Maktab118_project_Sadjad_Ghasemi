export const urls = {
  auth: {
    signup: "/auth/signup",
    login: "/auth/login",

  },
  product: {
    create: "/products",
    getAll: "/products",
    getById: (id: string) => `/products/${id}`,
    delById: (id: string) => `/products/${id}`,
    updateById: (id: string) => `/products/${id}`,
  },
  order: "/orders",
  orderById: (id: string) => `/orders/${id}`,
  user: "/users",
  editUser: (id: string) => `/users/${id}`,
  category: {
    getCategories: "/categories",
    getProductsByCategory: "/products",
  },
  subcategory: {
    getSubCategories: "/subcategories",
  },
};
