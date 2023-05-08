import FormProduct from '~/components/form/product/FormProduct';
import { formatDateDisplay, numeralCustom } from './helpers';
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
import FormPNK from '~/components/form/pnk/FormPNK';
import FormLo from '~/components/form/lo/FormLo';
import FilterLo from '~/components/filter/lo/FilterLo';
import FilterPNK from '~/components/filter/pnk/FilterPNK';

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
        minWidth: '100px',
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
  dmlo: {
    title: 'lô',
    uniqueKey: 'ma_lo',
    Form: FormLo,
    Filter: FilterLo,
    columns: [
      {
        name: 'Mã',
        selector: (row) => row.ma_lo,
        sortable: true,
        width: '100px',
      },
      {
        name: 'Tên',
        selector: (row) => row.ten_lo,
        sortable: true,
        minWidth: '200px',
        wrap: true,
      },
      {
        name: 'Tên hàng',
        selector: (row) => row.ten_vt,
        sortable: true,
        minWidth: '150px',
      },
      {
        name: 'Ngày sản xuất',
        selector: (row) => row.ngay_san_xuat,
        format: (row) => formatDateDisplay(row.ngay_san_xuat),
        sortable: true,
        minWidth: '100px',
        center: true,
      },
      {
        name: 'Hạn sử dụng',
        selector: (row) => row.han_su_dung,
        format: (row) => formatDateDisplay(row.han_su_dung),
        sortable: true,
        minWidth: '100px',
        center: true,
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
  dmpnk: {
    title: 'phiếu nhập kho',
    uniqueKey: 'ma_phieu',
    Form: FormPNK,
    Filter: FilterPNK,
    columns: [
      {
        name: 'Mã phiếu',
        selector: (row) => row.ma_phieu,
        sortable: true,
        minWidth: '100px',
      },
      {
        name: 'Mã chứng từ',
        selector: (row) => row.ma_ct,
        sortable: true,
        minWidth: '100px',
      },
      {
        name: 'Kho',
        selector: (row) => row.ten_kho,
        sortable: true,
        center: true,
        minWidth: '100px',
      },
      {
        name: 'Ngày chứng từ',
        selector: (row) => row.ngay_ct,
        sortable: true,
        center: true,
        format: (row) => formatDateDisplay(row.ngay_ct),
        minWidth: '100px',
      },
      {
        name: 'Ngày nhập hàng',
        selector: (row) => row.ngay_nhap_hang,
        sortable: true,
        minWidth: '100px',
        center: true,
        format: (row) => formatDateDisplay(row.ngay_nhap_hang),
      },
      {
        name: 'Nhà cung cấp',
        selector: (row) => row.ten_ncc,
        sortable: true,
        minWidth: '100px',
        center: true,
        wrap: true,
      },
      {
        name: 'Tổng tiền nhập',
        selector: (row) => row.tong_tien_nhap,
        sortable: true,
        center: true,
        minWidth: '100px',
        format: (row) => numeralCustom(row.tong_tien_nhap).format(),
      },
    ],
  },
};

export { dsDanhMuc };
