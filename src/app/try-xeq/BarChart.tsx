'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type BarChartProps = {
  scores: {
    name: string;
    score: number;
  }[];
};

const BarChart: React.FC<BarChartProps> = ({ scores }) => {
  const data = {
    labels: scores.map((s) => s.name),
    datasets: [
      {
        label: 'XEQ Score',
        data: scores.map((s) => s.score),
        backgroundColor: [
          '#e6f7ff',
          '#f9f0ff',
          '#fff7e6',
          '#f6ffed',
        ],
        borderColor: [
          '#1890ff',
          '#9254de',
          '#fa8c16',
          '#52c41a',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: 'easeOutBounce',
    },
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `Score: ${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        max: 5,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: 'Score (out of 5)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'XEQ Factors',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
