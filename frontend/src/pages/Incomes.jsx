import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addIncomeAsync,
  getIncomesAsync,
  deleteIncomeAsync,
} from "../features/transactions/transactionSlice";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import "daisyui";
import { AiFillDelete } from "react-icons/ai";
import { saveAs } from "file-saver";

function IncomePage() {
  const [newIncome, setNewIncome] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const { title, amount, category, description, date } = newIncome;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const { incomes, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.transaction // Update the slice name to "transaction"
  );

  useEffect(() => {
    dispatch(getIncomesAsync());

    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
      dispatch(getIncomesAsync()); // Move this line up
      setNewIncome({
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
    setNewIncome({
      ...newIncome,
      [name]: value,
    });
  };

  const handleAddIncome = async () => {
    try {
      // Convert the amount to a number before sending the request
      const formattedAmount = parseFloat(newIncome.amount);
      const incomeData = { ...newIncome, amount: formattedAmount };

      console.log("Adding income...");
      await dispatch(addIncomeAsync(incomeData));
      console.log("Income added successfully");
      dispatch(getIncomesAsync());
      setNewIncome({
        title: "",
        amount: "",
        category: "",
        description: "",
        date: "",
      });
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  const handleDeleteIncome = (id) => {
    dispatch(deleteIncomeAsync(id));
  };

  const totalIncome = incomes.reduce(
    (total, income) => total + income.amount,
    0
  );

  const handleDownloadCSV = () => {
    const csvContent = [
      "ID,Title,Amount,Category,Description,Date",
      ...incomes.map((income) =>
        [
          income._id,
          income.title,
          income.amount,
          income.category,
          income.description,
          new Date(income.date).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "incomes.csv");
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
                <h1 className="text-6xl font-bold">Incomes</h1>
                <div className="inline-block bg-teal-100 rounded-lg shadow w-1/4 p-4">
                  <h3 className="text-sm font-medium text-gray-800">
                    Total Income
                  </h3>
                  <p className="text-3xl font-bold text-black">
                    $ {totalIncome}
                  </p>
                </div>
              </div>

              <hr className="my-10" />
              <div className="grid gap-x-8">
                <div>
                  {" "}
                  {/* first row */}
                  <h2 className="text-2xl font-bold mb-4">Add New Income</h2>
                  <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-title"
                        >
                          Income Title
                        </label>
                        <input
                          className="appearance-none block w-full bg-green-50 text-gray-700 border border-green-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-title"
                          name="title"
                          type="text"
                          placeholder="Income Title"
                          value={title}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-amount"
                        >
                          Income Amount
                        </label>
                        <input
                          className="appearance-none block w-full bg-green-50 text-gray-700 border border-green-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-amount"
                          type="number"
                          name="amount"
                          placeholder="Income Amount"
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
                            <option value="freelancing">Freelancing</option>
                            <option value="investments">Investments</option>
                            <option value="stocks">Stocks</option>
                            <option value="bitcoin">Bitcoin</option>
                            <option value="bank-transfer">Bank Transfer</option>
                            <option value="youtube">Youtube</option>
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
                          onClick={handleAddIncome}
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
                <h2 className="text-2xl font-bold mb-4">Incomes Table</h2>
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
                    {incomes.map((income) => (
                      <tr
                        key={income._id}
                        className="bg-gray-100 text-center border-b text-sm text-gray-600"
                      >
                        <td className="p-2 border-r">{income._id}</td>
                        <td className="p-2 border-r">{income.title}</td>
                        <td className="p-2 border-r">{income.amount}</td>
                        <td className="p-2 border-r">{income.category}</td>
                        <td className="p-2 border-r">{income.description}</td>
                        <td className="p-2 border-r">
                          {new Date(income.date).toLocaleDateString()}
                        </td>
                        <td className="p-2">
                          <button
                            className="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin"
                            onClick={() => handleDeleteIncome(income._id)}
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

export default IncomePage;
