import { useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { FaUserCircle } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { BsGraphUp } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
// import ChoroplethMap from "./ChoroplethMap"; // Placeholder for map component
// import FunnelChart from "./FunnelChart"; // Placeholder for funnel chart component

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

export default function FinanceDashboard() {
  const [data, setData] = useState({
    totalAmount: "$25.5M",
    heatmap: [
      { region: "Western Australia", amount: "$3.2M", color: "#28A745" },
      { region: "South Australia", amount: "$3.9M", color: "#FFC107" },
    ],
  });

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Requests",
        data: [30, 45, 32, 50, 37, 60],
        borderColor: "#FF5733",
        backgroundColor: "rgba(255, 87, 51, 0.5)",
      },
    ],
  };

  const donutData = {
    labels: ["Engaged", "Not Engaged"],
    datasets: [
      {
        data: [67, 33],
        backgroundColor: ["#4CAF50", "#FFC107"],
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-20 bg-white shadow-md flex flex-col items-center py-4 space-y-6">
        <FaUserCircle className="text-4xl text-gray-600" />
        <BsGraphUp className="text-3xl text-gray-500" />
        <FiSettings className="text-3xl text-gray-500 mt-auto mb-4" />
      </aside>
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Finance Analytics Dashboard</h1>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">Get in Touch</button>
        </header>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Amount</h2>
            <p className="text-4xl font-bold text-green-600">{data.totalAmount}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Heatmap</h2>
            {/* <ChoroplethMap /> */}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <h2 className="text-lg font-semibold flex justify-between">
              Request Trend <HiOutlineDotsVertical className="text-gray-500" />
            </h2>
            <Line data={chartData} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Engagement Rate</h2>
            <Doughnut data={donutData} />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Funnel Chart</h2>
            {/* <FunnelChart /> */}
          </div>
        </div>
      </main>
    </div>
  );
}
