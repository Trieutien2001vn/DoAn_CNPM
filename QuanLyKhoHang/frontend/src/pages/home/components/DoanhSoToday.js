import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Tháng',
      data: labels.map(() => Math.random() * 200000000),
      backgroundColor: '#6F49FD',
    },
  ],
};

function DoanhSoToday() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography sx={{ fontSize: '13px', fontWeight: 550, mb: '10px' }}>
        DOANH SỐ
      </Typography>
      <Box>
        <Bar
          options={{
            ...options,
            elements: { bar: { borderRadius: 8 } },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
            },
          }}
          data={data}
        />
      </Box>
    </Paper>
  );
}

export default DoanhSoToday;
