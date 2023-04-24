import FormProduct from '~/pages/listProduct/FormProduct';
import { numeralCustom } from './helpers';

const dsDanhMuc = {
  dmvt: {
    title: 'hàng hóa',
    columns: [
      {
        name: 'Mã',
        selector: (row) => row.ma_vt,
        width: '100px',
        sortable: true,
      },
      {
        name: 'Tên',
        selector: (row) => row.ten_vt,
        minWidth: '200px',
        sortable: true,
      },
      {
        name: 'Barcode',
        selector: (row) => row.barcode,
        width: '100px',
        center: true,
        sortable: true,
      },
      {
        name: 'Giá vốn',
        selector: (row) => row.gia_von,
        width: '100px',
        center: true,
        sortable: true,
        format: (row) => numeralCustom(row.gia_von).format(),
      },
      {
        name: 'Giá bán lẻ',
        selector: (row) => row.gia_ban_le,
        center: true,
        sortable: true,
        width: '120px',
        format: (row) => numeralCustom(row.gia_ban_le).format(),
      },
      {
        name: 'Đơn vị tính',
        selector: (row) => row.ten_dvt,
        width: '120px',
        center: true,
        sortable: true,
      },
      {
        name: 'Xuất xứ',
        selector: (row) => row.xuat_xu,
        center: true,
        sortable: true,
      },
    ],
    Form: FormProduct,
  },
  dmnvt: {
    title: 'nhóm hàng hóa',
    columns: [
      {
        name: 'Mã',
        selector: (row) => row.ma_nvt,
        sortable: true,
      },
      {
        name: 'Tên',
        selector: (row) => row.ten_nvt,
        sortable: true,
      },
      {
        name: 'Người tạo',
        selector: (row) => row.createdBy,
        sortable: true,
      },
    ],
    Form: FormProduct,
  },
  dmdvt: {
    title: 'đơn vị tính',
    columns: [
      {
        name: 'Mã',
        selector: (row) => row.ma_dvt,
        sortable: true,
      },
      {
        name: 'Tên',
        selector: (row) => row.ten_dvt,
        sortable: true,
      },
      {
        name: 'Người tạo',
        selector: (row) => row.createdBy,
        sortable: true,
      },
    ],
    Form: FormProduct,
  },
};

export { dsDanhMuc };
