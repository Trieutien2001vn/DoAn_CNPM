import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import FilterTimeFromTo from '~/components/filter/FilterTimeFromTo';
import AdminLayout from '~/components/layouts/AdminLayout';
import moment from 'moment';
import TableDisplay from '~/components/table/TableDisplay';
import useSnackbarContext from '~/hooks/hookContext/useSnackbarContext';
import useApisContext from '~/hooks/hookContext/useApisContext';
import { useEffect } from 'react';
import FilterSelectApi from '~/components/filter/FilterSelectApi';

const columns = [
  {
    name: 'Mã hàng hóa',
    selector: (row) => row.ma_vt,
    minWidth: '130px',
  },
  {
    name: 'Tên hàng hóa',
    selector: (row) => row.ten_vt,
    minWidth: '130px',
    wrap: true,
  },
  {
    name: 'Tồn đầu kỳ',
    selector: (row) => row.ton_dau_ky,
    minWidth: '130px',
    center: true,
  },
  {
    name: 'Nhập kho',
    selector: (row) => row.nhap_kho,
    minWidth: '130px',
    center: true,
  },
  {
    name: 'Xuất kho',
    selector: (row) => row.xuat_kho,
    width: '130px',
    center: true,
  },
  {
    name: 'Tồn cuối kỳ',
    selector: (row) => row.ton_cuoi_ky,
    minWidth: '130px',
    right: true,
  },
];

const filterBase = {
  timeFrom: moment().startOf('month').format('YYYY-MM-DD'),
  timeTo: moment().format('YYYY-MM-DD'),
  vatTu: null,
  kho: null,
  page: 1,
  limit: 20,
};

function ReportXNTPage() {
  const alertSnackbar = useSnackbarContext();
  const { callApi } = useApisContext();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    ...filterBase,
  });

  const getXNT = async (condition) => {
    try {
      setLoading(true);
      const resp = await callApi({ endpoint: '/tonkho/xnt', data: condition });
      if (resp) {
        setData(resp);
      }
    } catch (error) {
      alertSnackbar('error', error?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const condition = { page: filter.page, limit: filter.limit };
    if (filter.timeFrom) {
      condition.tu_ngay = filter.timeFrom;
    }
    if (filter.timeTo) {
      condition.den_ngay = filter.timeTo;
    }
    if (filter.vatTu) {
      condition.ma_vt = filter.vatTu.ma_vt;
    }
    if (filter.kho) {
      condition.ma_kho = filter.kho.ma_kho;
    }
    getXNT(condition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <AdminLayout>
      <Box sx={{ padding: '10px 0' }}>
        <Grid container spacing="10px" alignItems="flex-start">
          <Grid item xs={12} md={2.5}>
            <Box
              className="custome-scrolly"
              sx={{
                width: '100%',
                height: 'calc(100vh - 50px - 42px - 20px)',
                overflow: 'auto',
                padding: '1px',
              }}
            >
              <Stack spacing={1}>
                <FilterSelectApi
                  title="Hàng hóa"
                  apiCode="dmvt"
                  value={
                    filter.vatTu
                      ? {
                          ma_vt: filter.vatTu.ma_vt,
                          ten_vt: filter.vatTu.ten_vt,
                        }
                      : null
                  }
                  searchFileds={['ma_vt', 'ten_vt']}
                  getOptionLabel={(option) => option.ten_vt}
                  onSelect={(value) => setFilter({ ...filter, vatTu: value })}
                />
                <FilterSelectApi
                  title="Kho/ chi nhánh"
                  apiCode="dmkho"
                  value={
                    filter.kho
                      ? {
                          ma_kho: filter.kho.ma_kho,
                          ten_kho: filter.kho.ten_kho,
                        }
                      : null
                  }
                  searchFileds={['ma_kho', 'ten_kho']}
                  getOptionLabel={(option) => option.ten_kho}
                  onSelect={(value) => setFilter({ ...filter, kho: value })}
                />
                <FilterTimeFromTo
                  defaultTimeFrom={filter.timeFrom}
                  defaultTimeTo={filter.timeTo}
                  title="Thời gian"
                  onSearch={(time) => {
                    setFilter({ ...filter, ...time });
                  }}
                />
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={9.5}>
            <Stack direction="row" alignItems="center">
              <Typography
                sx={{ fontSize: '20px', fontWeight: 500, marginBottom: '10px' }}
              >
                Tổng hợp xuất, nhập tồn
              </Typography>
            </Stack>
            <Box
              className="hidden-scroll"
              sx={{
                height: 'calc(100vh - 50px - 42px - 20px - 40px)',
                overflow: 'auto',
              }}
            >
              <TableDisplay
                columns={columns}
                data={data?.data || []}
                paginationTotalRows={data?.count}
                pagination
                onChangePage={(page) => setFilter({ ...filter, page })}
                onChangeRowsPerPage={(newRowsPerPage) =>
                  setFilter({ ...filter, limit: newRowsPerPage })
                }
                fixedHeaderScrollHeight="calc(100vh - 50px - 42px - 20px - 40px)"
                progressPending={loading}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
}

export default ReportXNTPage;
