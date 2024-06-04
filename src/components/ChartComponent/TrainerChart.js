import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Количество пользователей",
        data: Object.values(data),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white", // Задаем белый цвет текста
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            var label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed) {
              label += context.parsed.toLocaleString();
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div style={{ height: "400px", width: "400px" }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
