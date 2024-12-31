import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem } from "@/redux/slices/basketSlice";

// آدرس پایه API
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// دریافت سبد خرید کاربر
export const fetchCart = createAsyncThunk(
  "basket/fetchCart",
  async (userId: string, { rejectWithValue }) => {
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const response = await axios.get(`${BASE_URL}/api/cart?userId=${userId}`);
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
