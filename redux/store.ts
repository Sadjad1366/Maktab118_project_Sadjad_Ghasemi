import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "@/redux/slices/basketSlice";
import logger from "redux-logger";


export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
