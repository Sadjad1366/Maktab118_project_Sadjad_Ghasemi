import axios from "axios";
import { RootState } from "../store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartItem } from "@/redux/slices/basketSlice";
import { clearGuestCart, getGuestCart } from "../guestBasket";

export const fetchCart = createAsyncThunk<CartItem[], string, { rejectValue: string }>(
  "basket/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const response = await axios.get(`${BASE_URL}/api/cart?userId=${userId}`);
      return response.data.products || []; 
    } catch (error: any) {
      return rejectWithValue(error.message || "Error fetching cart");
    }
  }
);

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
        data: { userId },
      });
      return response.data;
    } catch (error: any) {
      console.error("clearCartApi error:", error.message);
      return rejectWithValue(error.message || "Error clearing cart");
    }
  }
);


export const mergeGuestCartWithUserCart = createAsyncThunk<
  CartItem[],
  { userId: string },
  { rejectValue: string }
>(
  "basket/mergeGuestCartWithUserCart",
  async (
    payload: { userId: string },
    { getState, dispatch, rejectWithValue }
  ) => {
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const guestCart = getGuestCart();
      const state = getState() as RootState;
      const userCart = state.basket.items;
      const response = await axios.post(`${BASE_URL}/api/cart/merge`, {
        userId: payload.userId,
        guestProducts: guestCart,
        userProducts: userCart,
      });
      clearGuestCart();
      dispatch(fetchCart(payload.userId));

      return response.data.cart;
    } catch (error: any) {
      console.error("Error merging guest cart with user cart:", error.message);
      return rejectWithValue(error.message || "Error merging carts");
    }
  }
);
