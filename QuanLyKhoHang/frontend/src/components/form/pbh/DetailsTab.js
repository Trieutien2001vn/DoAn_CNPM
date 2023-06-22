import React, { useEffect, useMemo } from 'react';
import { Stack } from '@mui/material';
import TableDisplay from '~/components/table/TableDisplay';
import { numeralCustom } from '~/utils/helpers';
import ButtonBase from '~/components/button/ButtonBase';
import { BsPlusCircle } from 'react-icons/bs';
import { useState } from 'react';
import FormAddDetail from './FormAddDetail';
import useSnackbarContext from '~/hooks/hookContext/useSnackbarContext';
import { cloneDeep } from 'lodash';

const columns = [
  {
    name: 'Mã hàng',
    selector: (row) => row.ma_vt,
    width: '120px',
  },
  {
    name: 'Tên hàng',
    selector: (row) => row.ten_vt,
    width: '170px',
    wrap: true,
  },
  {
    name: 'Số lượng',
    selector: (row) => row.sl_xuat,
    width: '100px',
    center: true,
  },
  {
    name: 'Đơn vị tính',
    selector: (row) => row.ten_dvt,
    minWidth: '100px',
    center: true,
  },
  {
    name: 'Giá bán lẻ',
    selector: (row) => row.gia_ban_le,
    width: '150px',
    center: true,
    format: (row) => numeralCustom(row.gia_ban_le).format(),
  },
  {
    name: 'Tiền hàng',
    selector: (row) => row.tien_hang,
    width: '150px',
    center: true,
    format: (row) => numeralCustom(row.tien_hang).format(),
  },
  {
    name: 'Tiền chiết khấu',
    selector: (row) => row.tien_ck,
    minWidth: '150px',
    center: true,
    format: (row) => numeralCustom(row.tien_ck).format(),
  },
  {
    name: 'Chiết khấu phân bổ',
    selector: (row) => row.tien_ck_phan_bo,
    minWidth: '150px',
    center: true,
    format: (row) => numeralCustom(row.tien_ck_phan_bo).format(),
  },
  {
    name: 'Tổng chiết khấu',
    selector: (row) => row.tong_tien_ck,
    width: '150px',
    center: true,
    format: (row) => numeralCustom(row.tong_tien_ck).format(),
  },
  {
    name: 'Tổng tiền',
    selector: (row) => row.tong_tien,
    minWidth: '150px',
    center: true,
    format: (row) => numeralCustom(row.tong_tien).format(),
  },
];

function DetailsTab({ details, setDetails, isEditMaster, tienCkHoaDon = 0 }) {
  const [openForm, setOpenForm] = useState(false);
  const [defaultValues, setDefaultValues] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const alertSnackbar = useSnackbarContext();

  // add a detail
  const addDetail = (detail, isEdit = false) => {
    if (isEditMaster) {
      alertSnackbar('error', 'Không thể chỉnh sửa, phiếu bán lẻ đã lưu vào sổ');
      return;
    }
    const { vat_tu, don_vi_tinh, lo, ...fields } = detail;
    const data = {
      ...fields,
      ma_vt: vat_tu.ma_vt,
      ten_vt: vat_tu.ten_vt,
      ma_nvt: don_vi_tinh.ma_nvt,
      ten_mvt: don_vi_tinh.ten_nvt,
      ma_dvt: don_vi_tinh.ma_dvt,
      ten_dvt: don_vi_tinh.ten_dvt,
      gia_von: vat_tu.gia_von,
      ma_lo: lo?.ma_lo || '',
      ten_lo: lo?.ten_lo || ''  
    };
    if (isEdit) {
      const index = details.findIndex((item) => item.ma_vt === vat_tu.ma_vt);
      if (index >= 0) {
        const detailsClone = cloneDeep(details);
        detailsClone.splice(index, 1, data);
        setDetails(detailsClone);
      }
    } else {
      const existed = details.find((item) => item.ma_vt === vat_tu.ma_vt);
      if (existed) {
        alertSnackbar(
          'error',
          `Hàng hóa '${vat_tu.ten_vt}' đã có trong chi tiết`
        );
      } else {
        setDetails((prev) => [...prev, data]);
      }
    }
  };
  // delete detail
  const handleDeleteDetail = (row) => {
    let detailsCopy = cloneDeep(details);
    detailsCopy = detailsCopy.filter((item) => item.ma_vt !== row.ma_vt);
    setDetails(detailsCopy);
  };

  // click on row
  const handleRowClicked = (row) => {
    setDefaultValues(row);
    setOpenForm(true);
    setIsEdit(true);
  };
  // handle close form
  const handleCloseForm = () => {
    setIsEdit(false);
    setDefaultValues(null);
    setOpenForm(false);
  };
  // so luong detail
  const numberDetail = useMemo(() => {
    return (details || []).reduce((acc, item) => {
      return acc + item.sl_xuat
    }, 0)
  }, [details])
  useEffect(() => {
    const detailsClone = JSON.parse(JSON.stringify(details))
    const tienCkPhanBo = tienCkHoaDon / numberDetail
    detailsClone.forEach(detail => {
      detail.tien_ck_phan_bo = tienCkPhanBo
      detail.chi_phi = detail.sl_xuat * detail.gia_von
    })
    setDetails(detailsClone)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberDetail, tienCkHoaDon])

  return (
    <>
      {openForm && (
        <FormAddDetail
          open={openForm}
          handleClose={handleCloseForm}
          addDetail={addDetail}
          defaultValues={defaultValues}
          isEdit={isEdit}
          isEditMaster={isEditMaster}
        />
      )}
      <Stack sx={{ width: '100%' }} spacing="10px">
        {!isEditMaster && (
          <Stack
            direction="row"
            spacing="5px"
            alignItems="center"
            justifyContent="flex-end"
          >
            <ButtonBase
              variant="outlined"
              startIcon={<BsPlusCircle style={{ fontSize: '14px' }} />}
              onClick={() => setOpenForm(true)}
            >
              Thêm dòng
            </ButtonBase>
          </Stack>
        )}
        <TableDisplay
          data={details}
          columns={columns}
          onRowClicked={handleRowClicked}
          handleDelete={handleDeleteDetail}
          uniqueKey="ma_vt"
        />
      </Stack>
    </>
  );
}

export default DetailsTab;
