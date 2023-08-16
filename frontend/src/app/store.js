import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import transactionReducer from "../features/transactions/transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer, // Add the transaction reducer here
    // ... other reducers if you have
  },
});
