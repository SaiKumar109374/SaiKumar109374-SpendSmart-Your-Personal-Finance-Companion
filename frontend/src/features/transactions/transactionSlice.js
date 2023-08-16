import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addExpense,
  deleteExpense,
  getExpenses,
  addIncome,
  deleteIncome,
  getIncomes,
} from "./transactionService"; // Import your expense service module here

const initialState = {
  expenses: [],
  incomes: [],
  isLoading: false,
  isError: false,
  message: "",
};

const ADD_EXPENSE_PENDING = "expenses/addExpense/pending";
const ADD_EXPENSE_FULFILLED = "expenses/addExpense/fulfilled";
const ADD_EXPENSE_REJECTED = "expenses/addExpense/rejected";
const ADD_INCOME_PENDING = "incomes/addIncome/pending";
const ADD_INCOME_FULFILLED = "incomes/addIncome/fulfilled";
const ADD_INCOME_REJECTED = "incomes/addIncome/rejected";
const GET_INCOMES_PENDING = "incomes/getIncomes/pending";
const GET_INCOMES_FULFILLED = "incomes/getIncomes/fulfilled";
const GET_INCOMES_REJECTED = "incomes/getIncomes/rejected";
const DELETE_INCOME_PENDING = "incomes/deleteIncome/pending";
const DELETE_INCOME_FULFILLED = "incomes/deleteIncome/fulfilled";
const DELETE_INCOME_REJECTED = "incomes/deleteIncome/rejected";

// Add an expense
export const addExpenseAsync = createAsyncThunk(
  "expenses/addExpense",
  async (expense, thunkAPI) => {
    try {
      return await addExpense(expense); // Use the imported addExpense
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add an income
export const addIncomeAsync = createAsyncThunk(
  "incomes/addIncome",
  async (income, thunkAPI) => {
    try {
      return await addIncome(income); // Use the imported addIncome function
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get expenses
export const getExpensesAsync = createAsyncThunk(
  "expenses/getExpenses",
  async (_, thunkAPI) => {
    try {
      return await getExpenses(); // Use the imported getExpenses
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get incomes
export const getIncomesAsync = createAsyncThunk(
  "incomes/getIncomes",
  async (_, thunkAPI) => {
    try {
      return await getIncomes(); // Use the imported getIncomes function
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete an expense
export const deleteExpenseAsync = createAsyncThunk(
  "expenses/deleteExpense",
  async (id, thunkAPI) => {
    try {
      await deleteExpense(id); // Use the imported deleteExpense
      return id;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete an income
export const deleteIncomeAsync = createAsyncThunk(
  "incomes/deleteIncome",
  async (id, thunkAPI) => {
    try {
      await deleteIncome(id); // Use the imported deleteIncome function
      return id;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ADD_EXPENSE_PENDING, (state) => {
        state.isLoading = true;
      })
      .addCase(ADD_EXPENSE_FULFILLED, (state, action) => {
        state.isLoading = false;
        state.expenses.push(action.payload);
      })
      .addCase(ADD_EXPENSE_REJECTED, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getExpensesAsync.pending, (state) => {
        // Use getExpensesAsync.pending
        state.isLoading = true;
      })
      .addCase(getExpensesAsync.fulfilled, (state, action) => {
        // Use getExpensesAsync.fulfilled
        state.isLoading = false;
        state.expenses = action.payload;
      })
      .addCase(getExpensesAsync.rejected, (state, action) => {
        // Use getExpensesAsync.rejected
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteExpenseAsync.pending, (state) => {
        // Use deleteExpenseAsync.pending
        state.isLoading = true;
      })
      .addCase(deleteExpenseAsync.fulfilled, (state, action) => {
        // Use deleteExpenseAsync.fulfilled
        state.isLoading = false;
        state.expenses = state.expenses.filter(
          (expense) => expense._id !== action.payload
        );
      })
      .addCase(deleteExpenseAsync.rejected, (state, action) => {
        // Use deleteExpenseAsync.rejected
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(ADD_INCOME_PENDING, (state) => {
        state.isLoading = true;
      })
      .addCase(ADD_INCOME_FULFILLED, (state, action) => {
        state.isLoading = false;
        state.incomes.push(action.payload);
      })
      .addCase(ADD_INCOME_REJECTED, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(GET_INCOMES_PENDING, (state) => {
        state.isLoading = true;
      })
      .addCase(GET_INCOMES_FULFILLED, (state, action) => {
        state.isLoading = false;
        state.incomes = action.payload;
      })
      .addCase(GET_INCOMES_REJECTED, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(DELETE_INCOME_PENDING, (state) => {
        state.isLoading = true;
      })
      .addCase(DELETE_INCOME_FULFILLED, (state, action) => {
        state.isLoading = false;
        state.incomes = state.incomes.filter(
          (income) => income._id !== action.payload
        );
      })
      .addCase(DELETE_INCOME_REJECTED, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = transactionSlice.actions;
export default transactionSlice.reducer;
