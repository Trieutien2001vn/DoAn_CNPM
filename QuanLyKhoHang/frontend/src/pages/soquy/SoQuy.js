
import React, { useState} from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import TableDisplay from '~/components/table/TableDisplay';
import useApisContext from '~/hooks/hookContext/useApisContext';
import { formatDateDisplay, numeralCustom } from '~/utils/helpers';
import AdminLayout from '~/components/layouts/AdminLayout';
import { useEffect } from 'react';
import FilterTimeFromTo from '~/components/filter/FilterTimeFromTo';
import moment from 'moment';
import useSnackbarContext from '~/hooks/hookContext/useSnackbarContext';

const sqColumns = [
  {
    name: 'Mã chứng từ',
    selector: (row) => row.ma_ct,
    sortable: true,
    grow: 1,
    wrap: true,
  },
  {
    name: 'Loại chứng từ',
    selector: (row) => row.ten_loai_ct,
    sortable: true,
    grow: 1,
    wrap: true,
  },
  {
    name: 'Ngày chứng từ',
    selector: (row) => row.ngay_ct,
    format: (row) => formatDateDisplay(row.ngay_ct),
    sortable: true,
    grow: 1,
    left: true,
  },
  {
    name: 'Giá trị',
    selector: (row) => row.gia_tri,
    format: (row) => numeralCustom(row.gia_tri).format(),
    sortable: true,
    grow: 1,
    center: true,
  },
  {
    name: 'Diễn giải',
    selector: (row) => row.dien_giai,
    sortable: true,
    grow: 2,
    left: true,
    wrap: true,
  },
];
export default function SoQuy() {
  const alertSnackbar = useSnackbarContext();
  const [filter, setFilter] = useState({
    timeFrom: moment().format('YYYY-MM-DD'),
    timeTo: moment().format('YYYY-MM-DD'),
  });
  const { callApi } = useApisContext();
  const [data, setData] = useState([]);
  // get sổ quỹ
  const getSoQuy = async (condition) => {
    try {
      const resp = await callApi({
        method: 'post',
        endpoint: '/soquy',
        data: condition,
      });
      setData(resp);
    } catch (error) {
      alertSnackbar('error', error?.message || 'Server error');
    }
  };

  useEffect(() => {
    const condition = {};
    if (filter.timeFrom) {
      condition.tu_ngay = filter.timeFrom;
    }
    if (filter.timeTo) {
      condition.den_ngay = filter.timeTo;
    }
    getSoQuy(condition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <AdminLayout>
      <Box sx={{ padding: '10px 0' }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <FilterTimeFromTo
              title="Ngày chứng từ"
              defaultTimeFrom={filter.timeFrom}
              defaultTimeTo={filter.timeTo}
              onSearch={(time) => setFilter({ ...filter, ...time })}
            />
          </Grid>
          <Grid item xs={10}>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              sx={{ mb: '10px' }}
            >
              <Typography sx={{ fontSize: '20px', fontWeight: 500 }}>
                Báo Cáo Sổ Quỹ{' '}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  justifyContent: 'end',
                }}
              >
                <Box
                  sx={{
                    width: '20px',
                    height: '10px',
                    backgroundColor: 'secondary.main',
                  }}
                ></Box>
                <Typography sx={{ fontSize: '13px' }}> Tồn đầu kỳ: </Typography>
                <Typography sx={{ mr: '50px', fontSize: '13px' }}>
                  {numeralCustom(data?.ton_dau_ky).format()}
                </Typography>
                <Box
                  sx={{
                    width: '20px',
                    height: '10px',
                    backgroundColor: 'primary.main',
                  }}
                ></Box>
                <Typography sx={{ fontSize: '13px' }}>Tồn cuối kỳ: </Typography>
                <Typography sx={{ fontSize: '13px' }}>
                  {numeralCustom(data?.ton_cuoi_ky).format()}
                </Typography>
              </Box>
            </Stack>

            <TableDisplay
              title="sổ quỹ"
              data={data?.records}
              columns={sqColumns}
              fixedHeaderScrollHeight="calc(100vh - 50px - 42px - 20px - 40px)"
            />
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
}

