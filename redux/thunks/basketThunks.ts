import axios from "axios";
import { RootState } from "../store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartItem } from "@/redux/slices/basketSlice";
import { clearGuestCart, getGuestCart } from "../guestBasket";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export const fetchCart = createAsyncThunk<CartItem[], string, { rejectValue: string }>(
  "basket/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const response = await axios.get(`${BASE_URL}/api/cart?userId=${userId}`);
      console.log("FetchCart Response:", response.data.products);
      return response.data.products || []; // مقدار پیش‌فرض آرایه خالی
    } catch (error: any) {
      return rejectWithValue(error.message || "Error fetching cart");
    }
  }
);





// افزودن محصول به سبد خرید
export const addToCartApi = createAsyncThunk(
  "basket/addToCartApi",
  async (payload: { userId: string; item: CartItem }, { rejectWithValue }) => {
    try {
      const { userId, item } = payload;
      const BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const response = await axios.post(`${BASE_URL}/api/cart`, {
        userId,
        product: item,
      });
      return response.data;
    } catch (error: any) {
      console.error("addToCartApi error:", error.message);
      return rejectWithValue(error.message || "Error adding to cart");
    }
  }
);

// بروزرسانی تعداد محصول
export const updateCartApi = createAsyncThunk(
  "basket/updateCartApi",
  async (
    payload: { userId?: string; productId: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const { userId, productId, quantity } = payload;
      const BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const response = await axios.put(`${BASE_URL}/api/cart`, {
        userId,
        productId,
        quantity,
      });
      return response.data;
    } catch (error: any) {
      console.error("updateCartApi error:", error.message);
      return rejectWithValue(error.message || "Error updating cart");
    }
  }
);

// حذف محصول از سبد خرید
export const removeFromCartApi = createAsyncThunk(
  "basket/removeFromCartApi",
  async (
    payload: { userId: string; productId: string },
    { rejectWithValue }
  ) => {
    try {
      const { userId, productId } = payload;
      const BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const response = await axios.delete(`${BASE_URL}/api/cart`, {
        data: { userId, productId },
      });
      return response.data;
    } catch (error: any) {
      console.error("removeFromCartApi error:", error.message);
      return rejectWithValue(error.message || "Error removing from cart");
    }
  }
);

export const clearCartApi = createAsyncThunk(
  "basket/clearCartApi",
  async (userId: string, { rejectWithValue }) => {
    try {
      const BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const response = await axios.delete(`${BASE_URL}/api/cart/clear`, {
        data: { userId }, // ارسال userId به سرور
      });
      return response.data;
    } catch (error: any) {
      console.error("clearCartApi error:", error.message);
      return rejectWithValue(error.message || "Error clearing cart");
    }
  }
);


export const mergeGuestCartWithUserCart = createAsyncThunk<
  CartItem[], // مقدار بازگشتی
  { userId: string }, // آرگومان ورودی
  { rejectValue: string } // مقدار reject شده
>(
  "basket/mergeGuestCartWithUserCart",
  async (
    payload: { userId: string },
    { getState, dispatch, rejectWithValue }
  ) => {
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

      // دریافت سبد خرید مهمان
      const guestCart = getGuestCart();

      // دسترسی به سبد خرید کاربر از Redux State
      const state = getState() as RootState;
      const userCart = state.basket.items;

      // ارسال محصولات کاربر و مهمان به API
      const response = await axios.post(`${BASE_URL}/api/cart/merge`, {
        userId: payload.userId,
        guestProducts: guestCart,
        userProducts: userCart,
      });

      // پاک کردن سبد خرید مهمان پس از ادغام موفق
      clearGuestCart();

      // بازخوانی سبد خرید جدید از سرور
      dispatch(fetchCart(payload.userId));

      return response.data.cart;
    } catch (error: any) {
      console.error("Error merging guest cart with user cart:", error.message);
      return rejectWithValue(error.message || "Error merging carts");
    }
  }
);
