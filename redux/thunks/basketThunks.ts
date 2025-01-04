import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem } from "@/redux/slices/basketSlice";


// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export const fetchCart = createAsyncThunk(
  "basket/fetchCart",
  async (userId: string, { rejectWithValue }) => {
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const response = await axios.get(`${BASE_URL}/api/cart?userId=${userId}`);
      console.log("Fetched cart:", response.data); // بررسی داده‌ها
      return response.data.products || [];
    } catch (error: any) {
      console.error("fetchCart error:", error.message);
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
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
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
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
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
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
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
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      console.log("Sending request to clear cart for user:", userId); // بررسی مقدار userId
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
