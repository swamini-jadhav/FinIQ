import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PredictionChart = ({ data, predictedPrice }) => {
  const flattenedData = data.map(item => {
    if (Array.isArray(item)) {
      return item[0];
    }
    return item;
  }).filter(val => val !== null && val !== undefined && !isNaN(val));

  if (flattenedData.length === 0) {
    return (
      <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="text-gray-500">No price data available for chart</p>
      </div>
    );
  }

  const labels = [...Array(flattenedData.length).keys()].map(i => `Day ${i + 1}`);
  labels.push('Predicted');

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Historical Prices',
        data: [...flattenedData, null],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 6
      },
      {
        label: 'Predicted Price',
        data: [...Array(flattenedData.length).fill(null), predictedPrice],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderDash: [5, 5],
        pointRadius: 6,
        pointHoverRadius: 8,
        pointStyle: 'star'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div style={{ height: '400px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PredictionChart;