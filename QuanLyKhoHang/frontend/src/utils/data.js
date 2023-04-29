import FormProduct from '~/components/form/product/FormProduct';
import { numeralCustom } from './helpers';
import FormNVT from '~/components/form/FormNVT';
import FormDVT from '~/components/form/FormDVT';
import FormKho from '~/components/form/FormKho';
import FilterProduct from '~/components/filter/product/FilterProduct';
import FilterProductGroup from '~/components/filter/productGroup/FilterProductGroup';
import FilterDVT from '~/components/filter/donViTinh/FilterDVT';
import FilterKho from '~/components/filter/kho/FilterKho';

const dsDanhMuc = {
  dmvt: {
    title: 'hàng hóa',
    uniqueKey: 'ma_vt',
    Form: FormProduct,
    Filter: FilterProduct,
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
        width: '150px',
        center: true,
        sortable: true,
      },
      {
        name: 'Nhóm hàng hóa',
        selector: (row) => row.ten_nvt,
        width: '150px',
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
    ],
  },
  dmnvt: {
    title: 'nhóm hàng hóa',
    uniqueKey: 'ma_nvt',
    Filter: FilterProductGroup,
    Form: FormNVT,
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
  },
  dmdvt: {
    title: 'đơn vị tính',
    uniqueKey: 'ma_dvt',
    Filter: FilterDVT,
    Form: FormDVT,
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
  },
  dmkho: {
    title: 'kho',
    uniqueKey: 'ma_kho',
    Form: FormKho,
    Filter: FilterKho,
    columns: [
      {
        name: 'Mã',
        selector: (row) => row.ma_kho,
        sortable: true,
        width: '100px',
      },
      {
        name: 'Tên',
        selector: (row) => row.ten_kho,
        sortable: true,
        minWidth: '200px',
      },

      {
        name: 'Địa chỉ',
        selector: (row) => row.dia_chi,
        sortable: true,
        minWidth: '250px',
      },
      {
        name: 'Điện thoại',
        selector: (row) => row.dien_thoai,
        sortable: true,
        width: '170px',
      },
      {
        name: 'Email',
        selector: (row) => row.email,
        sortable: true,
        width: '200px',
      },
    ],
  },
};

export { dsDanhMuc };
