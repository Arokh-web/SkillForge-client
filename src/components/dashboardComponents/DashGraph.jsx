import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTaskContextSingle } from "../../contexts/contexts";
import React, { useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashGraph = () => {
  const { tasks } = useTaskContextSingle();
  const [chartData, setChartData] = React.useState(null);

  useEffect(() => {
    // If there are no tasks, do nothing
    if (!tasks || tasks.length === 0) {
      return;
    }

    // Count the number of tasks for each status
    const statusCounts = {
      active: 0,
      planned: 0,
      done: 0,
    };

    tasks.forEach((task) => {
      if (task.status === "active") {
        statusCounts.active += 1;
      } else if (task.status === "planned") {
        statusCounts.planned += 1;
      } else if (task.status === "done") {
        statusCounts.done += 1;
      }
    });

    // And put it into the data array for the pie
    const data = {
      labels: ["Active", "Done", "Planned"],
      datasets: [
        {
          label: "Task Status",
          data: [statusCounts.active, statusCounts.planned, statusCounts.done],
          backgroundColor: ["#f9c74f", "#577590", "#43aa8b"],
          borderWidth: 1,
        },
      ],
    };
    setChartData(data);
  }, [tasks]);

  // options for the bar chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Task Status Overview",
      },
    },

    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  };

  return (
    <div>
      <div className="dash-graph">
        {chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <p>Please select a project...</p>
        )}
      </div>
    </div>
  );
};

export default DashGraph;
