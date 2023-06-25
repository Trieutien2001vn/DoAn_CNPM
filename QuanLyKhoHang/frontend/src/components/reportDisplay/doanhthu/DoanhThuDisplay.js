import { Box, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import BarChart from '~/components/chart/BarChart';
import TableDisplay from '~/components/table/TableDisplay';
import { numeralCustom } from '~/utils/helpers';
import { useTheme } from '@mui/material/styles';

const columns = [
  {
    name: 'Thời gian',
    selector: (row) =>
      `${row.ngay ? row.ngay + '/' : ''}${row.thang ? row.thang + '/' : ''}${
        row.nam ? row.nam : ''
      }`,
    left: true,
  },
  {
    name: 'Doanh thu',
    center: true,
    selector: (row) => row.doanh_thu,
    format: (row) => numeralCustom(row.doanh_thu).format(),
  },
  {
    name: 'Doanh thu thuần',
    right: true,
    selector: (row) => row.doanh_thu_thuan,
    format: (row) => numeralCustom(row.doanh_thu_thuan).format(),
  },
];

function DoanhThuDisplay({ data, isChart }) {
  const theme = useTheme();

  const labels = useMemo(() => {
    return (data.data || []).map(
      (item) =>
        `${item.ngay ? item.ngay + '/' : ''}${
          item.thang ? item.thang + '/' : ''
        }${item.nam ? item.nam : ''}`
    );
  }, [data]);
  const dataChart1 = useMemo(() => {
    return (data.data || []).map((item) => item.doanh_thu);
  }, [data]);
  const dataChart2 = useMemo(() => {
    return (data.data || []).map((item) => item.doanh_thu_thuan);
  }, [data]);
  const tongDoanhThu = useMemo(() => {
    return (data?.data || []).reduce((acc, item) => {
      return acc + item.doanh_thu;
    }, 0);
  }, [data.data]);

  const tongDoanhThuThuan = useMemo(() => {
    return (data?.data || []).reduce((acc, item) => {
      return acc + item.doanh_thu_thuan;
    }, 0);
  }, [data]);

  return (
    <>
      <Stack direction="row" alignItems="center">
        <Typography
          sx={{ fontSize: '20px', fontWeight: 500, marginBottom: '10px' }}
        >
          Báo cáo doanh thu
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={2}
          sx={{ flex: 1 }}
        >
          <Stack direction="row" alignItems="center" gap="5px">
            <Box
              sx={{
                width: 20,
                height: 10,
                backgroundColor: 'secondary.main',
              }}
            ></Box>
            <Typography sx={{ fontSize: '13px' }}>
              Tổng doanh thu: {numeralCustom(tongDoanhThu).format()}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap="5px">
            <Box
              sx={{
                width: 20,
                height: 10,
                backgroundColor: 'primary.main',
              }}
            ></Box>
            <Typography sx={{ fontSize: '13px' }}>
              Tổng doanh thu thuần:
              {numeralCustom(tongDoanhThuThuan).format()}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Box
        className="hidden-scroll"
        sx={{
          height: 'calc(100vh - 50px - 42px - 20px - 40px)',
          overflow: 'auto',
        }}
      >
        {isChart ? (
          <BarChart
            labels={labels}
            datasets={[
              {
                label: 'Doanh thu',
                backgroundColor: theme.palette.secondary.main,
                data: dataChart1,
              },
              {
                label: 'Doanh thu thuần',
                backgroundColor: theme.palette.primary.main,
                data: dataChart2,
              },
            ]}
          />
        ) : (
          <TableDisplay columns={columns} data={data.data} />
        )}
      </Box>
    </>
  );
}

export default DoanhThuDisplay;
