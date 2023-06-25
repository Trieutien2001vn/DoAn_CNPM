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
    name: 'Tổng doanh thu',
    center: true,
    selector: (row) => row.tong_thanh_tien,
    format: (row) => numeralCustom(row.tong_thanh_tien).format(),
  },
  {
    name: 'Tổng chi phí',
    center: true,
    selector: (row) => row.tong_chi_phi,
    format: (row) => numeralCustom(row.tong_chi_phi).format(),
  },
  {
    name: 'Lợi nhuận',
    center: true,
    selector: (row) => row.loi_nhuan,
    format: (row) => numeralCustom(row.loi_nhuan).format(),
  },
];

function LoiNhuanDisplay({ data, isChart }) {
  const theme = useTheme();

  const labels = useMemo(() => {
    return (data.data || []).map(
      (item) =>
        `${item.ngay ? item.ngay + '/' : ''}${
          item.thang ? item.thang + '/' : ''
        }${item.nam ? item.nam : ''}`
    );
  }, [data]);
  const dataChart = useMemo(() => {
    return (data.data || []).map((item) => item.loi_nhuan);
  }, [data]);
  const tongLoiNhuan = useMemo(() => {
    return (data?.data || []).reduce((acc, item) => {
      return acc + item.loi_nhuan;
    }, 0);
  }, [data.data]);

  return (
    <>
      <Stack direction="row" alignItems="center">
        <Typography
          sx={{ fontSize: '20px', fontWeight: 500, marginBottom: '10px' }}
        >
          Báo cáo lợi nhuận
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
              Tổng lợi nhuận: {numeralCustom(tongLoiNhuan).format()}
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
                label: 'Lợi nhuận',
                backgroundColor: theme.palette.secondary.main,
                data: dataChart,
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

export default LoiNhuanDisplay;
