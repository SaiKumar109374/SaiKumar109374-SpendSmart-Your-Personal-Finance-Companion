import axios from "axios";

const API_URL = "/api/v1/";

const getToken = () => {
  const token = localStorage.getItem("authToken");
  console.log("Retrieved Token:", token);
  return token;
};

// Add expense
export const addExpense = async (expenseData) => {
  const token = getToken();
  console.log("Token:", token);
  const headers = { Authorization: `Bearer ${token}` };

  const response = await axios.post(API_URL + "add-expense", expenseData, {
    headers,
  });
  return response.data;
};

// Add income
export const addIncome = async (incomeData) => {
  const token = getToken();
  console.log("Token:", token);
  const headers = { Authorization: `Bearer ${token}` };

  const response = await axios.post(API_URL + "add-income", incomeData, {
    headers,
  });
  return response.data;
};

// Get expenses
export const getExpenses = async () => {
  const token = getToken();
  console.log("Token:", token); // Add this line to log the token
  const headers = { Authorization: `Bearer ${token}` };

  const response = await axios.get(API_URL + "get-expenses", {
    headers,
  });
  return response.data;
};

// Get incomes
export const getIncomes = async () => {
  const token = getToken();
  console.log("Token:", token); // Add this line to log the token
  const headers = { Authorization: `Bearer ${token}` };

  const response = await axios.get(API_URL + "get-incomes", {
    headers,
  });
  return response.data;
};

// Delete expense
export const deleteExpense = async (id) => {
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };

  const response = await axios.delete(API_URL + `delete-expense/${id}`, {
    headers,
  });
  return response.data;
};

// Delete income
export const deleteIncome = async (id) => {
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };

  const response = await axios.delete(API_URL + `delete-income/${id}`, {
    headers,
  });
  return response.data;
};

const transactionService = {
  addExpense,
  getExpenses,
  deleteExpense,
  addIncome,
  getIncomes,
  deleteIncome,
};

export default transactionService;
