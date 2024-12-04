"use client";

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type PopulationInfo = {
  year: number;
  value: number;
};

type PopulationChartProps = {
  populationData: PopulationInfo[];
};

const PopulationChart = ({ populationData }: PopulationChartProps) => {
  const years = populationData.map((data) => data.year);
  const populationValues = populationData.map((data) => data.value);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Population',
        data: populationValues,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
		<div className="w-full h-[400px]"> {/* Ensure the chart fills its container */}
      <Line
        data={chartData}
        options={{ responsive: true, maintainAspectRatio: true }}
      />
    </div>
	)
};

export default PopulationChart;
