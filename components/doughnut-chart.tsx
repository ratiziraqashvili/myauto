import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      data: [50, 50, 50, 50, 50],
      backgroundColor: ["#00FF00", "#ebfaef", "#ebfaef", "#ebfaef", "#ebfaef"],
    },
  ],
};

const options = {
  responsive: true,
  cutout: "80%", // This creates the circular hole in the center
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Doughnut Chart",
    },
  },
};

const DoughnutChart = () => (
  <div className="relative size-10">
    {/* @ts-ignore */}
    <Doughnut data={data} options={options} />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="text-sm font-[500]">1/5</div>
      </div>
    </div>
  </div>
);

export default DoughnutChart;
