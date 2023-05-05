import FormProduct from '~/components/form/product/FormProduct';
import { numeralCustom } from './helpers';
import FormNVT from '~/components/form/FormNVT';
import FormDVT from '~/components/form/FormDVT';
import FormKho from '~/components/form/FormKho';
import FilterProduct from '~/components/filter/product/FilterProduct';
import FilterProductGroup from '~/components/filter/productGroup/FilterProductGroup';
import FilterDVT from '~/components/filter/donViTinh/FilterDVT';
import FilterKho from '~/components/filter/kho/FilterKho';
import FormSupplier from '~/components/form/supplier/FormSupplier';
import FilterSupplier from '~/components/filter/supplier/FilterSupplier';
import FormChungTu from '~/components/form/chungtu/FormChungTu';
import FilterChungTu from '~/components/filter/chungTu/FilterChungTu';

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
        width: '200px',
        wrap: true,
      },

      {
        name: 'Địa chỉ',
        selector: (row) => row.dia_chi,
        sortable: true,
        width: '250px',
        wrap: true,
      },
      {
        name: 'Điện thoại',
        selector: (row) => row.dien_thoai,
        sortable: true,
        minWidth: '170px',
        center: true,
      },
      {
        name: 'Email',
        selector: (row) => row.email,
        sortable: true,
        minWidth: '200px',
        center: true,
      },
    ],
  },
  dmncc: {
    title: 'nhà cung cấp',
    uniqueKey: 'ma_ncc',
    Form: FormSupplier,
    Filter: FilterSupplier,
    columns: [
      {
        name: 'Mã',
        selector: (row) => row.ma_ncc,
        sortable: true,
        minWidth: '100px',
      },
      {
        name: 'Tên',
        selector: (row) => row.ten_ncc,
        sortable: true,
        width: '200px',
        wrap: true,
      },
      {
        name: 'Địa chỉ',
        selector: (row) => row.dia_chi,
        sortable: true,
        center: true,
        width: '200px',
        wrap: true,
      },
      {
        name: 'Điện thoại',
        selector: (row) => row.dien_thoai,
        sortable: true,
        center: true,
        minWidth: '120px',
      },
      {
        name: 'Email',
        selector: (row) => row.email,
        sortable: true,
        center: true,
        minWidth: '120px',
      },
      {
        name: 'Người tạo',
        selector: (row) => row.createdBy,
        sortable: true,
        center: true,
        minWidth: '200px',
      },
    ],
  },
  dmct: {
    title: 'chứng từ',
    uniqueKey: 'ma_ct',
    Form: FormChungTu,
    Filter: FilterChungTu,
    columns: [
      {
        name: 'Mã',
        selector: (row) => row.ma_ct,
        sortable: true,
        width: '100px',
      },
      {
        name: 'Tên',
        selector: (row) => row.ten_ct,
        sortable: true,
        width: '200px',
      },
      {
        name: 'Diễn giải',
        selector: (row) => row.dien_giai,
        sortable: true,
        minWidth: '100px',
        wrap: true,
      },
    ],
  },
};

export { dsDanhMuc };
