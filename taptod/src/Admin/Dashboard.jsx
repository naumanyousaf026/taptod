import { useState } from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
import { FaUserCircle, FaBell, FaMoon, FaSun } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { BsGraphUp } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const ChoroplethMap = () => {
  const data = [{ id: "AUS", value: 25.5 }];
  const colorScale = scaleQuantile()
    .domain(data.map((d) => d.value))
    .range(["#ffedea", "#ffcec5", "#ffad9f", "#ff8a75", "#ff5533"]);

  return (
    <div className="w-full h-48">
      <ComposableMap projection="geoMercator" projectionConfig={{ center: [134, -28], scale: 400 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.properties.name === "Australia")
              .map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(data[0].value)}
                  stroke="#FFF"
                  strokeWidth={0.5}
                />
              ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

const FunnelChart = () => {
  const data = {
    labels: ["Visits", "Leads", "Sales", "Customers"],
    datasets: [
      {
        data: [1000, 600, 300, 100],
        backgroundColor: ["#FF5733", "#FFC107", "#4CAF50", "#2196F3"],
        borderWidth: 0,
        borderRadius: 20,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: { x: { display: false }, y: { display: false } },
    maintainAspectRatio: false,
  };

  return <div className="w-full h-48"><Bar data={data} options={options} /></div>;
};

const FinanceDashboard = ({ darkMode, toggleDarkMode }) => {
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
    datasets: [{ data: [67, 33], backgroundColor: ["#4CAF50", "#FFC107"] }],
  };

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Sidebar */}
      {/* Sidebar is managed by the parent App component */}

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">Get in Touch</button>
        </header>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Amount</h2>
            <p className="text-4xl font-bold text-green-600">$25.5M</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Heatmap</h2>
            <ChoroplethMap />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <h2 className="text-lg font-semibold flex justify-between">
              Request Trend <HiOutlineDotsVertical className="text-gray-500" />
            </h2>
            <Line data={chartData} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">Engagement Rate</h2>
            <div className="w-40 h-40">
              <Doughnut data={donutData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Funnel Chart</h2>
            <FunnelChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinanceDashboard;
