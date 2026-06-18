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
import { GroupedBarChartProps } from './types';
import { xeqFactorLabels } from '@/data/xeqScale';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const factorLabels = xeqFactorLabels;

const backgroundColors = ['#f9f0ff', '#fff7e6', '#f6ffed'];
const borderColors = ['#9254de', '#fa8c16', '#52c41a'];

const GroupedBarChart: React.FC<GroupedBarChartProps> = ({ scores }) => {
  const stakeholders = scores.map((s) => s.stakeholder);

  const datasets = factorLabels.map((factor, i) => ({
    label: factor,
    data: scores.map(
      (entry) => entry.values.find((v) => v.name === factor)?.score ?? 0
    ),
    backgroundColor: backgroundColors[i],
    borderColor: borderColors[i],
    borderWidth: 1,
  }));

  const data = {
    labels: stakeholders,
    datasets,
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: { display: true, position: 'bottom' },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: { stepSize: 1 },
        title: {
          display: true,
          text: 'Score (out of 5)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Stakeholders',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default GroupedBarChart;
