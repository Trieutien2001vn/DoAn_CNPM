import { Grid } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import SelectApiInput from '~/components/input/SelectApiInput';
import TextInput from '~/components/input/TextInput';
import { dsDanhMuc } from '~/utils/data';
import { numeralCustom } from '~/utils/helpers';

function InfoTab({ register, control, isEdit, errors }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextInput
          disabled={isEdit}
          label="Mã phiếu"
          placeholder="Mã tạo tự động"
          name="ma_phieu"
          register={register}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="kho"
          render={({ field: { onChange, value } }) => (
            <SelectApiInput
              disabled={isEdit}
              label="Kho"
              required
              apiCode="dmkho"
              placeholder="Kho xuất"
              searchFileds={['ma_kho', 'ten_kho']}
              getOptionLabel={(option) => option.ten_kho}
              selectedValue={value}
              value={value || { ma_kho: '', ten_kho: '' }}
              onSelect={onChange}
              FormAdd={dsDanhMuc['dmkho'].Form}
              errorMessage={errors?.kho?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextInput
          required
          type="date"
          label="Ngày lập phiếu"
          placeholder="Ngày tạo ra phiếu"
          name="ngay_lap_phieu"
          register={register}
          errorMessage={errors?.ngay_lap_phieu?.message}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextInput
          required
          type="date"
          label="Ngày chứng từ"
          placeholder="Ngày chứng từ"
          name="ngay_ct"
          register={register}
          errorMessage={errors?.ngay_ct?.message}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="nhan_vien"
          render={({ field: { onChange, value } }) => (
            <SelectApiInput
              disabled
              label="Nhân viên"
              apiCode="dmnv"
              placeholder="Nhân viên bán hàng"
              searchFileds={['ma_nv', 'ten_nv']}
              getOptionLabel={(option) => option.ten_nv}
              selectedValue={value}
              value={value || { ma_nv: '', ten_nv: '' }}
              onSelect={onChange}
              FormAdd={dsDanhMuc['dmnv']?.Form}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="khach_hang"
          render={({ field: { onChange, value } }) => (
            <SelectApiInput
              label="Khách hàng"
              apiCode="dmkh"
              placeholder="Khách mua hàng"
              searchFileds={['ma_kh', 'ten_kh']}
              getOptionLabel={(option) => option.ten_kh}
              selectedValue={value}
              value={value || { ma_kh: '', ten_kh: '' }}
              onSelect={onChange}
              FormAdd={dsDanhMuc['dmkh']?.Form}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="kenh_ban"
          render={({ field: { onChange, value } }) => (
            <SelectApiInput
              label="Kênh bán"
              apiCode="dmkb"
              placeholder="Kênh bán hàng"
              searchFileds={['ma_kenh', 'ten_kenh']}
              getOptionLabel={(option) => option.ten_kenh}
              selectedValue={value}
              value={value || { ma_kenh: '', ten_kenh: '' }}
              onSelect={onChange}
              FormAdd={dsDanhMuc['dmkb']?.Form}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="pttt"
          render={({ field: { onChange, value } }) => (
            <SelectApiInput
              label="Phương thức thanh toán"
              apiCode="dmpttt"
              placeholder="Phương thức thanh toán"
              searchFileds={['ma_pttt', 'ten_pttt']}
              getOptionLabel={(option) => option.ten_pttt}
              selectedValue={value}
              value={value || { ma_pttt: '', ten_pttt: '' }}
              onSelect={onChange}
              FormAdd={dsDanhMuc['dmpttt']?.Form}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="tien_hang"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={numeralCustom(value).format()}
              onChange={(e) => {
                const val = numeralCustom(e.target.value).value();
                onChange(val);
              }}
              label="Tiền hàng"
              placeholder="Tiền hàng bán"
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="tien_ck_sp"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={numeralCustom(value).format()}
              onChange={(e) => {
                const val = numeralCustom(e.target.value).value();
                onChange(val);
              }}
              label="Tiền chiết khẩu sản phẩm"
              placeholder="Tiền chiết khẩu sản phẩm"
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="ty_le_ck_hd"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={numeralCustom(value).format()}
              onChange={(e) => {
                const val = numeralCustom(e.target.value).value();
                onChange(val);
              }}
              label="Tỷ lệ chiết khẩu hóa đơn (%)"
              placeholder="Tỷ lệ chiết khẩu hóa đơn"
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="tien_ck_hd"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={numeralCustom(value).format()}
              onChange={(e) => {
                const val = numeralCustom(e.target.value).value();
                onChange(val);
              }}
              label="Tiền chiết khấu hóa đơn"
              placeholder="Tiền chiết khấu hóa đơn"
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="tong_tien_ck"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={numeralCustom(value).format()}
              onChange={(e) => {
                const val = numeralCustom(e.target.value).value();
                onChange(val);
              }}
              label="Tổng tiền chiết khẩu"
              placeholder="Tổng tiền chiết khẩu"
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="tong_tien"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={numeralCustom(value).format()}
              onChange={(e) => {
                const val = numeralCustom(e.target.value).value();
                onChange(val);
              }}
              label="Tổng tiền"
              placeholder="Tổng tiền"
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="tien_thu"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={numeralCustom(value).format()}
              onChange={(e) => {
                const val = numeralCustom(e.target.value).value();
                onChange(val);
              }}
              label="Tiền thu"
              placeholder="Tiền thu"
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="tien_thoi"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={numeralCustom(value).format()}
              onChange={(e) => {
                const val = numeralCustom(e.target.value).value();
                onChange(val);
              }}
              label="Tiền thối"
              placeholder="Tiền thối"
            />
          )}
        />
      </Grid>
    </Grid>
  );
}

export default InfoTab;