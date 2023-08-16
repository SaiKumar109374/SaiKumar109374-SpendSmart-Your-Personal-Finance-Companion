import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

function Chart() {
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

  const [state, setState] = useState({
    series: [totalExpenses, totalIncomes],
    options: {
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      labels: ["Expenses", "Income"], // Set specific names here
      colors: ["#FF5733", "#66BB6A"],
    },
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      series: [totalExpenses, totalIncomes],
    }));
  }, [totalExpenses, totalIncomes]);

  return (
    <div className="App">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="donut"
      />
    </div>
  );
}

export default Chart;
