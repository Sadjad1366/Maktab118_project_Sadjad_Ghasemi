import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock: number; // Add a 'stock' property to track product availability
}

interface BasketState {
  items: CartItem[];
}

const loadState = (): BasketState => {
  if (typeof window !== "undefined") {
    const savedState = localStorage.getItem("basket");
    return savedState ? JSON.parse(savedState) : { items: [] };
  }
  return { items: [] };
};

const saveState = (state: BasketState) => {
  localStorage.setItem("basket", JSON.stringify(state));
};

const initialState: BasketState = loadState();

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, quantity, stock } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // Check stock limit
        if (existingItem.quantity <= stock) {
          existingItem.quantity += quantity;
        } else {
          existingItem.quantity = stock; // Set to max stock if exceeded
        }
      } else {
        // Ensure the quantity doesn't exceed stock for new items
        state.items.push({ ...action.payload, quantity: Math.min(quantity, stock) });
      }
      saveState(state);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity < item.stock) {
        item.quantity += 1;
        saveState(state);
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
        saveState(state);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveState(state);
    },
    clearCart: (state) => {
      state.items = [];
      saveState(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = basketSlice.actions;
export default basketSlice.reducer;
