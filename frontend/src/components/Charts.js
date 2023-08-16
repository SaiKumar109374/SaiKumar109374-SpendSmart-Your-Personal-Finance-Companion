import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

function ExpensesCategoriesBreakdownChart() {
  const expenses = useSelector((state) => state.transaction.expenses);

  const expensesByCategory = expenses.reduce((categories, expense) => {
    if (categories[expense.category]) {
      categories[expense.category] += expense.amount;
    } else {
      categories[expense.category] = expense.amount;
    }
    return categories;
  }, {});

  const categoryLabels = Object.keys(expensesByCategory);
  const categoryAmounts = Object.values(expensesByCategory);

  const [state, setState] = useState({
    series: categoryAmounts,
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
      labels: categoryLabels,
    },
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      series: categoryAmounts,
    }));
  }, [categoryAmounts]);

  return (
    <div className="ExpenseCategoriesBreakdownChart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="donut"
      />
    </div>
  );
}

export default ExpensesCategoriesBreakdownChart;
