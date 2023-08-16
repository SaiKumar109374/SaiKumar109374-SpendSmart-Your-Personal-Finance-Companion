import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addExpenseAsync,
  getExpensesAsync,
  deleteExpenseAsync,
} from "../features/transactions/transactionSlice";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import "daisyui";
import { AiFillDelete } from "react-icons/ai";
import { debounce } from "lodash";
import { saveAs } from "file-saver";

function ExpensePage() {
  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const { title, amount, category, description, date } = newExpense;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const { expenses, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.transaction // Update the slice name to "transaction"
  );

  useEffect(() => {
    dispatch(getExpensesAsync());

    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
      dispatch(getExpensesAsync()); // Move this line up
      setNewExpense({
        title: "",
        amount: "",
        category: "",
        description: "",
        date: "",
      });
    }
  }, [isError, isSuccess, message, dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewExpense({
      ...newExpense,
      [name]: value,
    });
  };

  const handleAddExpense = async () => {
    try {
      // Convert the amount to a number before sending the request
      const formattedAmount = parseFloat(newExpense.amount);
      const expenseData = { ...newExpense, amount: formattedAmount };

      console.log("Adding expense...");
      await dispatch(addExpenseAsync(expenseData));
      console.log("Expense added successfully");
      dispatch(getExpensesAsync());
      setNewExpense({
        title: "",
        amount: "",
        category: "",
        description: "",
        date: "",
      });
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleDeleteExpense = (id) => {
    dispatch(deleteExpenseAsync(id));
  };

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const initialBudget = localStorage.getItem("budget") || 0;
  const [budget, setBudget] = useState(parseFloat(initialBudget));
  const [isEditingBudget, setIsEditingBudget] = useState(false);

  const handleBudgetEditClick = () => {
    setIsEditingBudget(true);
  };

  const handleBudgetInputChange = (event) => {
    const newBudget = parseFloat(event.target.value);
    setBudget(newBudget);
    // Update budget in localStorage
    localStorage.setItem("budget", newBudget);
  };

  const handleBudgetSave = () => {
    setIsEditingBudget(false);
    // Update budget in localStorage
    localStorage.setItem("budget", budget);
  };

  const debouncedShowBudgetExceeded = debounce(() => {
    toast.warning("Budget exceeded!");
  }, 1000); // Adjust the debounce delay as needed

  useEffect(() => {
    // Compare with the budget and show warning if exceeded
    if (totalExpense > budget) {
      debouncedShowBudgetExceeded();
    }
  }, [totalExpense, budget]);

  const handleDownloadCSV = () => {
    const csvContent = [
      "ID,Title,Amount,Category,Description,Date",
      ...expenses.map((expense) =>
        [
          expense._id,
          expense.title,
          expense.amount,
          expense.category,
          expense.description,
          new Date(expense.date).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "expenses.csv");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Header />
      <main className="ml-60 pt-16 max-h-screen overflow-auto">
        <div className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 mb-5">
              <div className="flex justify-between">
                <h1 className="text-6xl font-bold">Expenses</h1>
                <div className="inline-block bg-teal-100 rounded-lg shadow w-1/4 p-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Total Expense
                  </h3>
                  <p className="text-3xl font-bold text-black">
                    $ {totalExpense}
                  </p>
                </div>
                <div className="inline-block bg-teal-100 rounded-lg shadow w-1/4 p-4">
                  <h3 className="text-lg font-medium text-gray-800">Budget</h3>
                  {isEditingBudget ? (
                    <div className="flex">
                      <input
                        className="mt-1 p-2 border rounded-md w-full"
                        type="number"
                        value={budget}
                        onChange={handleBudgetInputChange}
                        placeholder="Enter your budget"
                      />
                      <button
                        className="ml-2 bg-[#63b0b8] hover:bg-[#469a9e] text-white font-bold py-2 px-4 rounded-full"
                        onClick={handleBudgetSave}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer text-3xl font-bold text-black"
                      onClick={handleBudgetEditClick}
                    >
                      $ {budget}
                    </div>
                  )}
                </div>
              </div>

              <hr className="my-10" />
              <div className="grid gap-x-8">
                <div>
                  {" "}
                  {/* first row */}
                  <h2 className="text-2xl font-bold mb-4">Add New Expense</h2>
                  <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-title"
                        >
                          Expense Title
                        </label>
                        <input
                          className="appearance-none block w-full bg-green-50 text-gray-700 border border-green-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-title"
                          name="title"
                          type="text"
                          placeholder="Expense Title"
                          value={title}
                          onChange={handleInputChange}
                        />
                        <p className="text-gray-600 text-xs italic">
                          Make it as long and as crazy as you'd like
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-amount"
                        >
                          Expense Amount
                        </label>
                        <input
                          className="appearance-none block w-full bg-green-50 text-gray-700 border border-green-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-amount"
                          type="number"
                          name="amount"
                          placeholder="Expense Amount"
                          value={amount}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-date"
                        >
                          Enter A Date
                        </label>
                        <input
                          className="appearance-none block w-full bg-green-50 text-gray-700 border border-green-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="date"
                          dateFormat="dd/MM/yyyy"
                          type="date"
                          placeholder="Enter A Date"
                          name="date"
                          value={date}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-category"
                        >
                          Select A Category
                        </label>
                        <div className="relative">
                          <select
                            className="appearance-none block w-full bg-green-50 text-gray-700 border border-green-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-category"
                            name="category"
                            value={category}
                            onChange={handleInputChange}
                          >
                            <option value="" disabled>
                              Select Option
                            </option>
                            <option value="salary">Salary</option>
                            <option value="freelancing">Education</option>
                            <option value="investments">Groceries</option>
                            <option value="stocks">Health</option>
                            <option value="bitcoin">Subscriptions</option>
                            <option value="bank-transfer">Takeaways</option>
                            <option value="youtube">Clothing</option>
                            <option value="youtube">Travelling</option>
                            <option value="other">Other</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-description"
                        >
                          Description
                        </label>
                        <input
                          className="appearance-none block w-full bg-green-50 text-gray-700 border border-green-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-description"
                          type="text"
                          placeholder="Add A Reference"
                          name="description"
                          value={description}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <button
                          class="bg-[#63b0b8] hover:bg-[#469a9e] text-white font-bold py-2 px-4 rounded-full"
                          onClick={handleAddExpense}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/*Starts Here*/}

              <div className="table w-full p-2">
                <h2 className="text-2xl font-bold mb-4">Expenses Table</h2>
                <table className="w-full border">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="p-2 border-r text-sm font-thin text-gray-500">
                        ID
                        {/* Add sorting icon */}
                      </th>
                      <th className="p-2 border-r text-sm font-thin text-gray-500">
                        Title
                        {/* Add sorting icon */}
                      </th>
                      <th className="p-2 border-r text-sm font-thin text-gray-500">
                        Amount
                        {/* Add sorting icon */}
                      </th>
                      <th className="p-2 border-r text-sm font-thin text-gray-500">
                        Category
                        {/* Add sorting icon */}
                      </th>
                      <th className="p-2 border-r text-sm font-thin text-gray-500">
                        Description
                        {/* Add sorting icon */}
                      </th>
                      <th className="p-2 border-r text-sm font-thin text-gray-500">
                        Date
                        {/* Add sorting icon */}
                      </th>
                      <th className="p-2 border-r text-sm font-thin text-gray-500">
                        <AiFillDelete />
                        {/* Add sorting icon */}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr
                        key={expense._id}
                        className="bg-gray-100 text-center border-b text-sm text-gray-600"
                      >
                        <td className="p-2 border-r">{expense._id}</td>
                        <td className="p-2 border-r">{expense.title}</td>
                        <td className="p-2 border-r">{expense.amount}</td>
                        <td className="p-2 border-r">{expense.category}</td>
                        <td className="p-2 border-r">{expense.description}</td>
                        <td className="p-2 border-r">
                          {new Date(expense.date).toLocaleDateString()}
                        </td>
                        <td className="p-2">
                          <button
                            className="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin"
                            onClick={() => handleDeleteExpense(expense._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <button
                    class="bg-[#63b0b8] hover:bg-[#469a9e] text-white font-bold py-2 px-4 rounded-full"
                    onClick={handleDownloadCSV}
                  >
                    Download Table (CSV)
                  </button>
                </div>
              </div>
            </div>
            {/*ends here*/}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ExpensePage;
