'use client';

import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

type RadarChartProps = {
  scores: { name: string; score: number }[];
};

const RadarChart: React.FC<RadarChartProps> = ({ scores }) => {
  const data = {
    labels: scores.map((s) => s.name),
    datasets: [
      {
        label: 'XEQ Scores',
        data: scores.map((s) => s.score),
        backgroundColor: 'rgba(24, 144, 255, 0.2)',
        borderColor: '#1890ff',
        pointBackgroundColor: '#1890ff',
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    responsive: true,
    scales: {
      r: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
        },
        pointLabels: {
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default RadarChart;
