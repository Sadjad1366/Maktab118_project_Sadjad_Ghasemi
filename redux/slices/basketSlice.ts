import {createSlice , PayloadAction} from '@reduxjs/toolkit'

interface CartItem {
      id:string;
      name:string;
      price:number;
      quantity:number;
      image:string;
}

interface BasketState {
      items: CartItem[];
}

const initialState :BasketState = {
      items: [],
}

const basketSlice = createSlice({
      name: 'basket',
      initialState,
      reducers:{
            addToCart: (state,action:PayloadAction<CartItem>) => {
                  const existingItem = state.items.find(item => item.id === action.payload.id);
                  if(existingItem){
                        existingItem.quantity += action.payload.quantity;
                  } else {
                        state.items.push(action.payload)
                  }
            },
            removeFromCart:(state,action:PayloadAction<string>) => {
                  state.items = state.items.filter(item => item.id === action.payload)
            },
            clearCart: (state) => {
                  state.items = [];
            }
      }
})

export const {addToCart, removeFromCart, clearCart} = basketSlice.actions;
export default basketSlice.reducer;
