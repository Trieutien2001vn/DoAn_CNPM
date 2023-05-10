import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import TableDisplay from '~/components/table/TableDisplay';
import useApisContext from '~/hooks/hookContext/useApisContext';
import useSnackbarContext from '~/hooks/hookContext/useSnackbarContext';
import { useEffect } from 'react';
import { formatDateDisplay, numeralCustom } from '~/utils/helpers';

const pnkColumns = [
  {
    name: 'Mã phiếu',
    selector: (row) => row.ma_phieu,
    sortable: true,
    width: '120px',
    wrap: true,
  },
  {
    name: 'Mã chứng từ',
    selector: (row) => row.ma_ct,
    sortable: true,
    minWidth: '120px',
    wrap: true,
  },
  {
    name: 'Kho',
    selector: (row) => row.ten_kho,
    sortable: true,
    minWidth: '120px',
    wrap: true,
  },
  {
    name: 'Số lượng',
    selector: (row) => row.so_luong_nhap,
    sortable: true,
    minWidth: '100px',
    center: true,
  },
  {
    name: 'Giá vốn',
    selector: (row) => row.gia_von,
    format: (row) => numeralCustom(row.gia_von).format(),
    sortable: true,
    minWidth: '100px',
    center: true,
  },
  {
    name: 'Ngày nhập hàng',
    selector: (row) => row.ngay_nhap_hang,
    format: (row) => formatDateDisplay(row.ngay_nhap_hang),
    sortable: true,
    minWidth: '150px',
    right: true,
  },
];
const pxkColumns = [
  {
    name: 'Mã phiếu',
    selector: (row) => row.ma_phieu,
    sortable: true,
    width: '120px',
    wrap: true,
  },
  {
    name: 'Mã chứng từ',
    selector: (row) => row.ma_ct,
    sortable: true,
    minWidth: '120px',
    wrap: true,
  },
  {
    name: 'Kho',
    selector: (row) => row.ten_kho,
    sortable: true,
    minWidth: '120px',
    wrap: true,
  },
  {
    name: 'Số lượng',
    selector: (row) => row.so_luong_xuat,
    sortable: true,
    minWidth: '100px',
    center: true,
  },
  {
    name: 'Giá xuất',
    selector: (row) => row.gia_xuat,
    format: (row) => numeralCustom(row.gia_xuat).format(),
    sortable: true,
    minWidth: '100px',
    center: true,
  },
  {
    name: 'Ngày xuất hàng',
    selector: (row) => row.ngay_xuat_hang,
    format: (row) => formatDateDisplay(row.ngay_xuat_hang),
    sortable: true,
    minWidth: '150px',
    right: true,
  },
];
const tkctColumns = [
  {
    name: 'Mã kho',
    selector: (row) => row.ma_kho,
    sortable: true,
    wrap: true,
  },
  {
    name: 'Tên kho',
    selector: (row) => row.ten_kho,
    sortable: true,
    wrap: true,
    center: true,
  },
  {
    name: 'Số lượng tồn',
    selector: (row) => row.ton_kho,
    sortable: true,
    wrap: true,
    right: true,
  },
];
const tkctloColumns = [
  {
    name: 'Mã lô',
    selector: (row) => row.ma_lo,
    sortable: true,
    wrap: true,
  },
  {
    name: 'Tên lô',
    selector: (row) => row.ten_lo,
    sortable: true,
    wrap: true,
    center: true,
  },
  {
    name: 'Số lượng tồn',
    selector: (row) => row.ton_kho,
    sortable: true,
    wrap: true,
    right: true,
  },
];

function KhoTab({ maVt, theoDoiLo }) {
  const { callApi } = useApisContext();
  const alertSnackbar = useSnackbarContext();
  const [tkcts, setTkcts] = useState(null);
  const [tkctLos, setTkctLos] = useState(null);
  const [pnkOptions, setPnkOptions] = useState({
    rowsPerpage: 20,
    count: 0,
    page: 1,
    loading: false,
    data: [],
  });
  const [pxkOptions, setPxkOptions] = useState({
    rowsPerpage: 20,
    count: 0,
    page: 1,
    loading: false,
    data: [],
  });

  // get pnks
  const getPnks = async () => {
    try {
      setPnkOptions({ ...pnkOptions, loading: true });
      const resp = await callApi({
        method: 'post',
        endpoint: '/nhapkho/chitiet',
        data: {
          page: pnkOptions.page,
          limit: pnkOptions.rowsPerpage,
          ma_vt: maVt,
        },
      });
      if (resp) {
        setPnkOptions({
          ...pnkOptions,
          data: resp.data,
          count: resp.count,
          loading: false,
        });
      }
    } catch (error) {
      setPnkOptions({ ...pnkOptions, loading: false });
      alertSnackbar('error', error?.response?.data?.message);
    }
  };
  // get pxks
  const getPxks = async () => {
    try {
      setPxkOptions({ ...pxkOptions, loading: true });
      const resp = await callApi({
        method: 'post',
        endpoint: '/xuatkho/chitiet',
        data: {
          page: pxkOptions.page,
          limit: pxkOptions.rowsPerpage,
          ma_vt: maVt,
        },
      });
      if (resp) {
        setPxkOptions({
          ...pxkOptions,
          data: resp.data,
          count: resp.count,
          loading: false,
        });
      }
    } catch (error) {
      setPxkOptions({ ...pxkOptions, loading: false });
      alertSnackbar('error', error?.response?.data?.message);
    }
  };
  // get tkcts
  const getTkcts = async () => {
    try {
      const resp = await callApi({
        method: 'post',
        endpoint: '/tonkho/tonchitiet',
        data: {
          ma_vt: maVt,
        },
      });
      if (resp) {
        setTkcts(resp);
      } else {
        setTkcts([]);
      }
    } catch (error) {
      alertSnackbar('error', error?.response?.data?.message);
    }
  };
  // get tkctLos
  const getTkctLos = async () => {
    try {
      const resp = await callApi({
        method: 'post',
        endpoint: '/tonkho/tonchitietlo',
        data: {
          ma_vt: maVt,
        },
      });
      if (resp) {
        setTkctLos(resp);
      } else {
        setTkctLos([]);
      }
    } catch (error) {
      alertSnackbar('error', error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getTkcts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maVt]);
  useEffect(() => {
    if (theoDoiLo) {
      getTkctLos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maVt]);
  useEffect(() => {
    getPnks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maVt, pnkOptions.page, pnkOptions.rowsPerpage]);
  useEffect(() => {
    getPxks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maVt, pxkOptions.page, pxkOptions.rowsPerpage]);

  return (
    <Stack sx={{ width: '100%' }} spacing="20px">
      <Stack spacing="10px">
        <Typography
          sx={{ fontSize: '13px', fontWeight: 550, color: 'secondary.main' }}
        >
          Tồn kho chi tiết
        </Typography>
        <TableDisplay
          data={tkcts || []}
          columns={tkctColumns}
          progressPending={!tkcts}
        />
      </Stack>
      {theoDoiLo && (
        <Stack spacing="10px">
          <Typography
            sx={{ fontSize: '13px', fontWeight: 550, color: 'secondary.main' }}
          >
            Tồn kho chi tiết theo lô
          </Typography>
          <TableDisplay
            data={tkctLos || []}
            columns={tkctloColumns}
            progressPending={!tkctLos}
          />
        </Stack>
      )}
      <Stack spacing="10px">
        <Typography
          sx={{ fontSize: '13px', fontWeight: 550, color: 'secondary.main' }}
        >
          Nhập kho
        </Typography>
        <TableDisplay
          title="nhập kho"
          data={pnkOptions.data}
          columns={pnkColumns}
          progressPending={pnkOptions.loading}
          pagination
          onChangePage={(page) => setPnkOptions({ ...pnkOptions, page })}
          onChangeRowsPerPage={(value) =>
            setPnkOptions({ ...pnkColumns, rowsPerpage: value })
          }
        />
      </Stack>
      <Stack spacing="10px">
        <Typography
          sx={{ fontSize: '13px', fontWeight: 550, color: 'secondary.main' }}
        >
          Xuất kho
        </Typography>
        <TableDisplay
          title="xuất kho"
          data={pxkOptions.data}
          columns={pxkColumns}
          progressPending={pxkOptions.loading}
          pagination
          onChangePage={(page) => setPxkOptions({ ...pxkOptions, page })}
          onChangeRowsPerPage={(value) =>
            setPxkOptions({ ...pnkColumns, rowsPerpage: value })
          }
        />
      </Stack>
    </Stack>
  );
}

export default KhoTab;
