import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface BasketState {
  items: CartItem[];
}

// Function to load state from localStorage
const loadState = (): BasketState => {
  if (typeof window !== "undefined") {
    const savedState = localStorage.getItem("basket");
    return savedState ? JSON.parse(savedState) : { items: [] };
  }
  return { items: [] }; // Default state if localStorage is unavailable
};

// Function to save state to localStorage
const saveState = (state: BasketState) => {
  localStorage.setItem("basket", JSON.stringify(state));
};

const initialState: BasketState = loadState();

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveState(state); // Save updated state to localStorage
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveState(state);
    },
    clearCart: (state) => {
      state.items = [];
      saveState(state);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      saveState(state);
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
      }
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
