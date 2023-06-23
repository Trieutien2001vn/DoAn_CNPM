import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box, Paper, Typography } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Tháng',
      data: labels.map(() => Math.random() * 50),
      backgroundColor: '#6F49FD',
      borderColor: '#6F49FD',
      borderWidth: 1,
      pointRadius: 5,
      borderCapStyle: 'round',
    },
  ],
};

function CustomersToday() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography sx={{ fontSize: '13px', fontWeight: 550, mb: '10px' }}>
        SỐ LƯỢNG KHÁCH
      </Typography>
      <Box>
        <Line
          options={{
            ...options,
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

export default CustomersToday;
