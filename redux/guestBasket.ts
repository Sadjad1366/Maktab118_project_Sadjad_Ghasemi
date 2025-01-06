import { CartItem, setGuestCart } from "./slices/basketSlice";

// helpers/localStorage.js
export const saveGuestCart = (cart: CartItem) => {
  localStorage.setItem("guestCart", JSON.stringify(cart));
};

export const getGuestCart = () => {
  const cart = localStorage.getItem("guestCart");
  return cart ? JSON.parse(cart) : [];
};

export const clearGuestCart = () => {
  localStorage.removeItem("guestCart");
};
