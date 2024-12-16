import { configureStore } from "@reduxjs/toolkit";
import basketReducer from '@/redux/slices/basketSlice';

export const store = configureStore({
      reducer:{
            basket: basketReducer,
      },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
