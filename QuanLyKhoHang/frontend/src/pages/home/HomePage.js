import React from 'react';
import AdminLayout from '~/components/layouts/AdminLayout';
import { Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChartComponent from './ChartComponent';

function HomePage() {
  return (
    <AdminLayout>
      <Grid
        container
        spacing="10px"
        sx={{ padding: '10px 0', alignItems: 'flex-start' }}
      >
        <Grid item xs={12} md={9}>
          <LeftColumn>
            <ChartComponent title="Kết quả bán hàng" />
            <ChartComponent title="Doanh số" />
            <ChartComponent title="Số lượng khách" />
            <ChartComponent title="Top 10 hàng hóa bán chạy" />
          </LeftColumn>
        </Grid>
        <Grid item xs={0} md={3}>
          <RightColumn />
        </Grid>
      </Grid>
    </AdminLayout>
  );
}

export default HomePage;

const LeftColumn = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}));

const RightColumn = styled(Paper)(() => ({
  width: '100%',
  height: '300px',
}));
