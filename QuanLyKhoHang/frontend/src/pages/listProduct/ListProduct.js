import React from 'react';
import ListBase from '~/components/listBase/ListBase';
import { numeralCustom } from '~/utils/helpers';
import FormProduct from './FormProduct';

const columns = [
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
];

function ListProduct() {
  return (
    <ListBase
      title="hàng hóa"
      maDanhMuc="dmvt"
      columns={columns}
      Form={FormProduct}
    />
  );
}

export default ListProduct;
