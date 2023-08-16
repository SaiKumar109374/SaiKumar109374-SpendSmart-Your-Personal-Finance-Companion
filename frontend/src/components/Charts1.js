import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

function Charts1() {
  const incomes = useSelector((state) => state.transaction.incomes);

  // Calculate total incomes by category
  const incomesByCategory = incomes.reduce((categories, income) => {
    if (categories[income.category]) {
      categories[income.category] += income.amount;
    } else {
      categories[income.category] = income.amount;
    }
    return categories;
  }, {});

  const categoryLabels = Object.keys(incomesByCategory);
  const categoryAmounts = Object.values(incomesByCategory);

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
      labels: categoryLabels, // Set category names as labels
    },
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      series: categoryAmounts,
    }));
  }, [categoryAmounts]);

  return (
    <div className="IncomeCategoriesBreakdownChart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="donut"
      />
    </div>
  );
}

export default Charts1;
