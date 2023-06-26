import { Box, Grid, Stack, Switch, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import FilterTimeFromTo from '../filter/FilterTimeFromTo';
import moment from 'moment';
import useApisContext from '~/hooks/hookContext/useApisContext';
import useSnackbarContext from '~/hooks/hookContext/useSnackbarContext';
import FilterSelectApi from '../filter/FilterSelectApi';
import FilterRadios from '../filter/FilterRadios';

const concerns = [
  { value: '0', label: 'Tất cả' },
  { value: '1', label: 'Chi nhánh' },
  { value: '2', label: 'Khách hàng' },
  { value: '3', label: 'Kênh bán' },
  { value: '4', label: 'Phương thức thanh toán' },
  { value: '5', label: 'Nhân viên' },
];
const filterBase = {
  kho: null,
  khachhang: null,
  kenhban: null,
  pttt: null,
};

function ReportBase({ reportCode, report }) {
  const { asyncReport } = useApisContext();
  const alertSnackbar = useSnackbarContext();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    timeFrom: moment().format('YYYY-MM-DD'),
    timeTo: moment().format('YYYY-MM-DD'),
    ...filterBase,
  });
  const [isChart, setIsChart] = useState(false);
  const [concern, setConcern] = useState(concerns[0].value);

  const getReport = async (filterData) => {
    try {
      const resp = await asyncReport({
        endpoint: reportCode,
        data: filterData,
      });
      setData(resp);
    } catch (error) {
      alertSnackbar('error', error?.message || 'Server error');
    }
  };

  const renderConcern = () => {
    switch (concern) {
      case '1':
        return (
          <FilterSelectApi
            title="Kho/chi nhánh"
            apiCode="dmkho"
            value={
              filter.kho
                ? { ma_kho: filter.kho.ma_kho, ten_kho: filter.kho.ten_kho }
                : null
            }
            searchFileds={['ma_kho', 'ten_kho']}
            getOptionLabel={(option) => option.ten_kho}
            onSelect={(value) => setFilter({ ...filter, kho: value })}
          />
        );
      case '2':
        return (
          <FilterSelectApi
            title="Khách hàng"
            apiCode="dmkh"
            value={
              filter.khachhang
                ? {
                    ma_kh: filter.khachhang.ma_kh,
                    ten_kh: filter.khachhang.ten_kh,
                  }
                : null
            }
            searchFileds={['ma_kh', 'ten_kh']}
            getOptionLabel={(option) => option.ten_kh}
            onSelect={(value) => setFilter({ ...filter, khachhang: value })}
          />
        );
      case '3':
        return (
          <FilterSelectApi
            title="Kênh bán"
            apiCode="dmkb"
            value={
              filter.kenhban
                ? {
                    ma_kenh: filter.kenhban.ma_kenh,
                    ten_kenh: filter.kenhban.ten_kenh,
                  }
                : null
            }
            searchFileds={['ma_kenh', 'ten_kenh']}
            getOptionLabel={(option) => option.ten_kenh}
            onSelect={(value) => setFilter({ ...filter, kenhban: value })}
          />
        );
      case '4':
        return (
          <FilterSelectApi
            title="Phương thức thanh toán"
            apiCode="dmpttt"
            value={
              filter.pttt
                ? {
                    ma_pttt: filter.pttt.ma_pttt,
                    ten_pttt: filter.pttt.ten_pttt,
                  }
                : null
            }
            searchFileds={['ma_pttt', 'ten_pttt']}
            getOptionLabel={(option) => option.ten_pttt}
            onSelect={(value) => setFilter({ ...filter, pttt: value })}
          />
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    if (reportCode) {
      const condition = {};
      if (filter.timeFrom) {
        condition.tu_ngay = filter.timeFrom;
      }
      if (filter.timeTo) {
        condition.den_ngay = filter.timeTo;
      }
      if (filter.kho) {
        condition.ma_kho = filter.kho.ma_kho;
      }
      if (filter.khachhang) {
        condition.ma_kh = filter.khachhang.ma_kh;
      }
      if (filter.kenhban) {
        condition.ma_kenh = filter.kenhban.ma_kenh;
      }
      if (filter.pttt) {
        condition.ma_pttt = filter.pttt.ma_pttt;
      }
      getReport(condition);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, reportCode]);
  useEffect(() => {
    setFilter({
      ...filterBase,
      timeFrom: filter.timeFrom,
      timeTo: filter.timeTo,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [concern]);

  return (
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
            <Stack
              direction="row"
              alignItems="center"
              sx={{ marginBottom: '10px', borderBottom: '1px dashed #ededed' }}
            >
              <Switch
                checked={isChart}
                onChange={(e) => {
                  setIsChart(e.target.checked);
                }}
              />
              <Typography sx={{ fontSize: '13px' }}>
                {isChart ? 'Dạng biểu đồ' : 'Dạng bảng'}
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <FilterRadios
                title="Mối quan tâm"
                values={concerns}
                defaultValue={concern}
                onChange={(value) => {
                  setConcern(value);
                }}
              />
              {renderConcern()}
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
          {report && report.DataDisplay && (
            <report.DataDisplay data={data} isChart={isChart} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReportBase;
