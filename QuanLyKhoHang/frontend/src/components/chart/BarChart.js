import React, { memo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useMemo } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

function BarChart({
  labels = [],
  datasets = [{ label: '', backgroundColor: '', data: [] }],
}) {
  const dataDisplay = useMemo(() => {
    const datasetBase = {
      backgroundColor: '#6F49FD',
      data: [],
      label: '',
    };
    return {
      labels,
      datasets: datasets.map((dataset) => ({ ...datasetBase, ...dataset })),
    };
  }, [datasets, labels]);
  return (
    <Bar
      options={{
        ...options,
        elements: { bar: { borderRadius: 4 } },
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
        },
      }}
      data={dataDisplay}
    />
  );
}

export default memo(BarChart);
