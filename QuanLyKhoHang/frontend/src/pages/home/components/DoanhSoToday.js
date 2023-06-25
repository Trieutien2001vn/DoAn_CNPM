import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import BarChart from '~/components/chart/BarChart';

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

function DoanhSoToday() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography sx={{ fontSize: '13px', fontWeight: 550, mb: '10px' }}>
        DOANH SỐ
      </Typography>
      <Box>
        <BarChart
          datasets={[
            {
              label: 'Doanh số',
              data: labels.map(() => Math.random() * 200000000),
            },
          ]}
          labels={labels}
        />
      </Box>
    </Paper>
  );
}

export default DoanhSoToday;
