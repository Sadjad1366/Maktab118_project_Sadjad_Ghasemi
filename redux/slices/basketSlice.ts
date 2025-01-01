import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCart,
  addToCartApi,
  updateCartApi,
  removeFromCartApi,
} from "../thunks/basketThunks";

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  stock: number;
}

export interface BasketState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: BasketState = {
  items: [], // آرایه خالی به عنوان مقدار پیش‌فرض
  loading: false,
  error: null,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {

    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      console.log("Redux State Updated with Items:", action.payload);
      state.items = Array.isArray(action.payload) ? action.payload : [];
      state.loading = false; // به‌روزرسانی وضعیت
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false; // به‌روزرسانی وضعیت
      state.error = action.payload as string || "خطا در دریافت سبد خرید";
    });


    builder.addCase(addToCartApi.fulfilled, (state, action) => {
      const newItem = action.meta.arg.item as CartItem;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
    });
    builder.addCase(addToCartApi.rejected, (state, action) => {
      state.error = action.payload as string || "خطا در افزودن به سبد خرید";
    });


    builder.addCase(updateCartApi.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      const existingItem = state.items.find((item) => item.id === productId);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    });
    builder.addCase(updateCartApi.rejected, (state, action) => {
      state.error = action.payload as string || "خطا در بروزرسانی محصول";
    });

  
    builder.addCase(removeFromCartApi.fulfilled, (state, action) => {
      const { productId } = action.meta.arg;
      state.items = state.items.filter((item) => item.id !== productId);
    });
    builder.addCase(removeFromCartApi.rejected, (state, action) => {
      state.error = action.payload as string || "خطا در حذف محصول از سبد خرید";
    });
  },
});


export const { clearCart } = basketSlice.actions;
export default basketSlice.reducer;
