import { CartItem, setGuestCart } from "./slices/basketSlice";

export const getGuestCart = () => {
  const guestCart = localStorage.getItem("guestCart");
  return guestCart ? JSON.parse(guestCart) : [];
};

export const saveGuestCart = (cart: CartItem[]) => {
  localStorage.setItem("guestCart", JSON.stringify(cart));
};


export const clearGuestCart = () => {
  localStorage.removeItem("guestCart");
};
