import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import Header from "../components/Header";

import {
  getExpensesAsync,
  getIncomesAsync,
} from "../features/transactions/transactionSlice"; // Import your action creators

import { List, ListItem, Typography } from "@material-tailwind/react";
import Chart from "../components/Chart";
import Charts from "../components/Charts";
import Charts1 from "../components/Charts1";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getExpensesAsync()); // Fetch expenses data
    dispatch(getIncomesAsync()); // Fetch incomes data
  }, [dispatch]);

  const expenses = useSelector((state) => state.transaction.expenses);
  const incomes = useSelector((state) => state.transaction.incomes);

  // Calculate total expenses and total incomes
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const totalIncomes = incomes.reduce(
    (total, income) => total + income.amount,
    0
  );

  // Combine expenses and incomes into one array
  const allTransactions = [...expenses, ...incomes];

  // Sort transactions by date in descending order
  allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Select the last 3 transactions
  const last3Transactions = allTransactions.slice(0, 3);

  const totalBalance = totalIncomes - totalExpenses;

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <Header />
      <main className="ml-60 pt-16 max-h-screen overflow-auto">
        <div className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 mb-5">
              <img
                className="mx-auto w-32 mb-6"
                src="images/logo.png"
                alt="logo"
              />
              <div className="grid place-items-center h-full">
                <h1 className="text-3xl font-bold mb-4">
                  Welcome to SpendSmart
                </h1>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-stretch"></div>
              </div>
              <hr className="my-10" />
              <div className="grid grid-cols-2 gap-x-20">
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <div className="p-4 rounded-xl bg-teal-50">
                        <h2 className="text-2xl font-bold mb-4">
                          Expenses vs. Income
                        </h2>
                        <br />
                        <Chart
                          totalExpenses={totalExpenses}
                          totalIncomes={totalIncomes}
                        />
                      </div>
                      <br />
                      <div className="p-4 rounded-xl bg-purple-50">
                        <h2 className="text-2xl font-bold mb-4">
                          Expense Categories Breakdown
                        </h2>
                        <br />
                        <Charts />
                      </div>
                      <br />
                      <div className="p-4 rounded-xl bg-teal-50">
                        <h2 className="text-2xl font-bold mb-4">
                          Income Categories Breakdown
                        </h2>
                        <br />
                        <Charts1
                          totalExpenses={totalExpenses}
                          totalIncomes={totalIncomes}
                        />
                      </div>
                      <br />
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Transaction History
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <div className="w-96 bg-yellow-100 rounded-xl p-4">
                        <List>
                          {last3Transactions.map((transaction) => (
                            <ListItem
                              key={transaction._id}
                              className="hover:bg-green-100"
                            >
                              <div>
                                <Typography
                                  variant="h5"
                                  color="blue-gray"
                                  className="uppercase"
                                >
                                  {transaction.title}
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="gray"
                                  className="font-bold"
                                >
                                  Type: {transaction.type},
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="gray"
                                  className="font-normal"
                                >
                                  Amount: {transaction.amount}, Date:{" "}
                                  {formatDate(transaction.date)}
                                </Typography>
                              </div>
                            </ListItem>
                          ))}
                        </List>
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-xl ${
                        totalBalance >= 0 ? "bg-green-100" : "bg-red-100"
                      } flex flex-col items-center justify-center`}
                    >
                      <div className="font-bold text-xl text-gray-800 leading-none">
                        Total Balance
                      </div>
                      <div className="mt-5">
                        <div
                          className={`inline-flex items-center justify-center py-2 px-3 rounded-xl ${
                            totalBalance >= 0
                              ? "bg-white text-gray-800 hover:text-green-500"
                              : "bg-white text-gray-800 hover:text-red-500"
                          } text-sm font-semibold transition`}
                        >
                          ${totalBalance.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
